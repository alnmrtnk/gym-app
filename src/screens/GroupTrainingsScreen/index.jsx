import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import AgendaCalendar from '../../components/AgendaCalendar';
import axios from "axios";
import devConfig from "../../../config.development";
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
    trainersContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const GroupTrainingsScreen = ({ navigation }) => {
    const toast = useToast();
    const [groupTrainingsData, setGroupTrainingsData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const {userId} = React.useContext(AuthContext);

    React.useEffect(() => {
        fetchData();
    }, [loading]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${devConfig.API_URL}/group_trainings`);
            setGroupTrainingsData(response.data);
        } catch (error) {
            toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
        } 
    };

    const dataIsLoaded = async() => {
        if(groupTrainingsData.length === 0){
            return false;
        }
        else {
            await sleep(2000);
            return true;
        }
    };

    const register = async(training) => {
        if(training.participants.length === training.max_participants){
            toast.show("The training is full", { type: "danger", placement: "top" });
            return;
        }
        if(training.participants.includes(userId)){
            try{
                await axios.post(`${devConfig.API_URL}/group_trainings/unregister`, {
                    user_id: userId,
                    group_training_id: training._id
                });
                toast.show("You have successfully unregistered from the training", { type: "success", placement: "top" });
                await fetchData();
            }
            catch(error){
                toast.show("Something went wrong on the server. Refresh the page.", { type: "danger", placement: "top" });
            }
        }
        else {
            try{
                await axios.post(`${devConfig.API_URL}/group_trainings/register`, {
                    user_id: userId,
                    group_training_id: training._id
                });
                toast.show("You have successfully registered for the training", { type: "success", placement: "top" });
                await fetchData();
            }
            catch(error){
                toast.show("The training is full", { type: "danger", placement: "top" });
            }
        }
    }

    return (
        <View>
            <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
                <View style={styles.contentContainer}>
                    <PersonalGroupTrainingsSwitch index={1} navigation={navigation} />
                    {dataIsLoaded() === true ? <View><Text>Loading...</Text></View> : (
                        <AgendaCalendar groupTrainingsData={groupTrainingsData} register={register}/>
                    )}
                </View>
            </HeaderBottomMenuComponent>
        </View>
    );
};

export default GroupTrainingsScreen;
