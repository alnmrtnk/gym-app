import React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import axios from 'axios';
import devConfig from '../../../config.development';
import ProductsContainer from '../../ProductsContainer';
import PlusSVG from '../../../assets/plus.svg';
import FormsInput from '../../components/FormsInput';
import { useToast } from 'react-native-toast-notifications';
import AuthContext from '../../contexts/AuthContext';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        padding: "5%",
        minHeight: 667,
    },
    header: {
        fontSize: 28,
        color: Colors.PRIMARY_TEXT_COLOR,
        fontFamily: "nunito-bold",
        fontWeight: "bold",
    },
});

const AddingProductScreen = ({ navigation }) => {
    const toast = useToast();
    const [initialized, setInitialized] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [productId, setProductId] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const {userId} = React.useContext(AuthContext);

    React.useEffect(() => {
        if (!initialized) {
            setInitialized(true);

            getProducts();
        }
    }, [initialized]);

    const getProducts = async () => {
        try {
            const response = await axios.get(`${devConfig.API_URL}/products`);
            console.log(response.data);
            setProducts(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const addProduct = async (productId) => {
        if(amount <= 0 || productId === ""){
            toast.show("Please enter a valid amount and select a product", {type: "info", placement: "top"});
            return;
        }
        try {
            const response = await axios.post(`${devConfig.API_URL}/consumptions`, {
                product_id: productId,
                quantity: amount,
                user_id: userId
            });
            console.log(response.data);
            toast.show("Product added successfully", {type: "success", placement: "top"});
        }
        catch (error) {
            console.log(error);
            toast.show("An error occurred while adding product", {type: "danger", placement: "top"});
        }
    }

    return (
        <View>
            <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Products Adding</Text>
                    <View>
                        <View style={{display: "flex", flexDirection: "row",  justifyContent: "center", alignItems: "center"}}>
                            <FormsInput
                                keyboardType={"numeric"}
                                label={" Enter amount of product to add"}
                                onChangeText={(text) => setAmount(text)}
                            />
                            <Pressable style={{paddingRight: 10}} onPress={() => addProduct(productId)}>
                                <PlusSVG width={30} height={30}/>
                            </Pressable>
                        </View>
                        <ProductsContainer products={products} productId={productId} setProductId={setProductId} />
                    </View>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default AddingProductScreen;