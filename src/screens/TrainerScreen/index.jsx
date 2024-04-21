import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import data from '../../trainers';
import IndividualTrainerContainer from '../../components/IndividualTrainerContainer';
import axios from "axios";
import devConfig from "../../../config.development";
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
    trainersContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  })

const TrainerScreen = ({navigation, route}) => {
    console.log(route.params.id);
    const toast = useToast();
    const [trainer, setData] = React.useState({name: "", points: 0, imgURL: '', free_hours: []});
    const [initialized, setInitialized] = React.useState(false);

    React.useEffect(() => {
        if(!initialized) {
            setInitialized(true);

            getTrainer();
        }
    });

    const getTrainer = async() => {
        try{
            const response = await axios.get(`${devConfig.API_URL}/trainers/${route.params.id}`);
            setData(response.data);
        }
        catch(error){
            toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
        }
    }

    return (
        <View>
            <View>
                <HeaderBottomMenuComponent currentPage={1} navigation={navigation}>
                    <View style={styles.contentContainer}>
                        <PersonalGroupTrainingsSwitch index={0} navigation={navigation} />
                        <View>
                            <IndividualTrainerContainer trainer={trainer} />
                        </View>
                    </View>
                </HeaderBottomMenuComponent>
            </View>

        </View>
    );
};

export default TrainerScreen;