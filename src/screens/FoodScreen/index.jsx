import React from 'react';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import MacrosComponent from '../../components/MacrosComponent';
import Consumptions from '../../components/Consumptions';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import devConfig from '../../../config.development';
import { useToast } from 'react-native-toast-notifications';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        padding: "5%",
        minHeight: 667,
    },
});

const FoodScreen = ({ navigation }) => {
    const toast = useToast();
    const [consumptions, setConsumptions] = React.useState([]);
    const {userId} = React.useContext(AuthContext);
    const [initialized, setInitialized] = React.useState(false);
    const [totalMacros, setTotalMacros] = React.useState({calories: 0, protein: 0, fat: 0, carbs: 0});
    const [restrictions, setRestrictions] = React.useState({calories: 0, protein: 0, fats: 0, carbs: 0});

    const getConsumptions = async() => {
        try{
            const response = await axios.get(`${devConfig.API_URL}/consumptions/${userId}`);
            console.log(response.data);
            setConsumptions(response.data);
        }
        catch(error){
            console.log(error);
            toast.show("An error occurred while fetching consumptions", {type: "danger"});
        }
    }

    const getMacros = async() => {  
        try{
            const response = await axios.get(`${devConfig.API_URL}/macros/${userId}`);
            console.log(response.data);
            setTotalMacros(response.data.totalMacros);
            setRestrictions(response.data.restrictions);
        }
        catch(error){
            console.log(error);
            toast.show("An error occurred while fetching macros", {type: "danger"});
        }
    }

    React.useEffect(() => {
        if(!initialized){
            setInitialized(true);
            getConsumptions();
            getMacros();
        }
    });
    
    const openAddForm = () => {
        navigation.navigate("AddProduct");
    }

    const deleteConsumption = async(consumption) => {
        try{
            console.log(consumption._id);
            await axios.delete(`${devConfig.API_URL}/consumptions/${consumption._id}`);
            toast.show("Consumption deleted successfully", {type: "success", position: "top"});
            await getConsumptions();
        }
        catch(error){
            console.log(error);
            toast.show("An error occurred while deleting the consumption", {type: "danger", position: "top"});
        }
    }

    return (
        <View>
            <HeaderBottomMenuComponent currentPage={2} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <MacrosComponent 
                        totalCalories={parseFloat(totalMacros.calories)}
                        totalProtein={parseFloat(totalMacros.protein)}
                        totalFat={parseFloat(totalMacros.fat)}
                        totalCarbs={parseFloat(totalMacros.carbs)}
                        caloriesRestriction={parseFloat(restrictions.calories)}
                        proteinRestriction={parseFloat(restrictions.protein)}
                        fatRestriction={parseFloat(restrictions.fats)}
                        carbsRestriction={parseFloat(restrictions.carbs)}
                    />
                    <Consumptions openAddForm={openAddForm} deleteConsumption={deleteConsumption} consumptions={consumptions}/>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default FoodScreen;