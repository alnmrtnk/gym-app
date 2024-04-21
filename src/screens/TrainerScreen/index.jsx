import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import Colors from '../../../assets/Colors';
import PersonalGroupTrainingsSwitch from '../../components/PersonalGroupTrainingsSwitch';
import IndividualTrainerContainer from '../../components/IndividualTrainerContainer';
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
  })

const TrainerScreen = ({navigation, route}) => {
    const toast = useToast();
    const [trainer, setData] = React.useState({name: "", points: 0, imgURL: 'trainers/john-berry.png', free_hours: []});
    const [initialized, setInitialized] = React.useState(false);
    const { dateFrom, dateTo, userId } = useContext(AuthContext);

    const bookTraining = async (date, time) => {
		const trainerId = trainer._id;

		try {
			const params = {
				date : date,
				timeFrom: time.time_from,
				timeTo: time.time_to,
				userId: userId
			}

			if(time.client_id === userId) {
				await axios.post(`${devConfig.API_URL}/trainers/${trainerId}/cancel`, { 
					date : date,
					timeFrom: time.time_from,
					timeTo: time.time_to,
					userId: userId
				 });
                     
                toast.show("Training cancelled successfully", { type: "success", placement: "top" });
			}
			else {
				await axios.post(`${devConfig.API_URL}/trainers/${trainerId}/book`, { 
					date : date,
					timeFrom: time.time_from,
					timeTo: time.time_to,
					userId: userId
				 });

                 toast.show("Training booked successfully", { type: "success", placement: "top" });
			}

            await getTrainer();
		} catch (error) {
			toast.show("Something went wrong on the server", { type: "danger", placement: "top" });
		}
	}

    React.useEffect(() => {
        if(!initialized) {
            setInitialized(true);

            getTrainer();
        }
    });

    const getTrainer = async() => {
        try{
            const params ={
                dateFrom: dateFrom,
                dateTo: dateTo,
                userId: userId
            }

            const response = await axios.get(`${devConfig.API_URL}/trainers/${route.params.id}`, {params});
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
                            <IndividualTrainerContainer trainer={trainer} bookTraining={bookTraining}/>
                        </View>
                    </View>
                </HeaderBottomMenuComponent>
            </View>

        </View>
    );
};

export default TrainerScreen;