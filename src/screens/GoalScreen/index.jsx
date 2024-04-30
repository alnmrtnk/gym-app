import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import devConfig from '../../../config.development';
import { useToast } from 'react-native-toast-notifications';
import MuscleSVG from '../../../assets/muscle.svg';
import HeartSVG from '../../../assets/heart.svg';
import FireSVG from '../../../assets/fire.svg';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        padding: "5%",
        minHeight: 667,
    },
    header: {
        color: Colors.PRIMARY_TEXT_COLOR,
        fontSize: 30,
        fontFamily: "nunito-bold",
        marginTop: 10,
    },
    info: {
        color: Colors.PRIMARY_TEXT_COLOR,
        fontSize: 14,
        fontFamily: "nunito-regular",
        marginTop: 10,
    },
    goalActive: {
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        borderRadius: 15,
    },
    goalButton: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    goalButtonText: {
        color: Colors.PRIMARY_TEXT_COLOR,
        fontSize: 20,
        fontFamily: "nunito-bold",
        marginLeft: 10,
    },
    goalHide: {
        backgroundColor: "#fafafa",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        borderRadius: 15,
    },
    saveButton: {
        backgroundColor: Colors.ACCENT_COLOR,
        width: "30%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 15,
        padding: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: "nunito-bold",
    },
});

const GoalScreen = ({ navigation }) => {
    const toast = useToast();
    const { userId } = useContext(AuthContext);
    const [goal, setGoal] = React.useState(0);

    const getGoal = async () => {
        try {
            const response = await axios.get(`${devConfig.API_URL}/user/${userId}`);

            setGoal(response.data.goal);
            toast.show("Goal fetched successfully", { type: "success", placement: "top" });
        } catch (error) {
            toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
        }
    }
    
    const setGoalOnServer = async () => {
        try {
            const response = await axios.put(`${devConfig.API_URL}/user/${userId}`, { goal: goal });

            setGoal(goal);
        } catch (error) {
            toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
        }
    }

    React.useEffect(() => {
        getGoal();
    }, []);


    return (
        <View>
            <HeaderBottomMenuComponent currentPage={3} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Your Goal</Text>
                    <Text style={styles.info}>
                        Based on this information, the program will calculate the number of calories and the desired amount of training to achieve your goal.
                    </Text>
                    <View style={goal === 0 ? styles.goalActive : styles.goalHide} >
                        <TouchableOpacity style={styles.goalButton} onPress={() => setGoal(0)}>
                            <FireSVG width={60} height={60} />
                            <Text style={styles.goalButtonText}>Lose Weight</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={goal === 1 ? styles.goalActive : styles.goalHide} >
                        <TouchableOpacity style={styles.goalButton} onPress={() => setGoal(1)}>
                            <MuscleSVG width={60} height={60} />
                            <Text style={styles.goalButtonText}>Gain Muscle</Text>
                        </TouchableOpacity>
                        </View>
                    <View style={goal === 2 ? styles.goalActive : styles.goalHide} >
                        <TouchableOpacity style={styles.goalButton} onPress={() => setGoal(2)}>
                            <HeartSVG width={60} height={60} />
                            <Text style={styles.goalButtonText}>Improve health</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={setGoalOnServer}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default GoalScreen;