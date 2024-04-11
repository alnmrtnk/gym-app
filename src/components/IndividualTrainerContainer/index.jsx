import React from 'react'
import { Image, View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Star from '../../../assets/star.svg';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
		backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
		borderRadius: 20,
		padding: 20,
		marginTop: 20
	},
	infoContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 5
	},
	nameText: {
		fontSize: 20,
		fontFamily: "nunito-bold"
	},
	pointText: {
		fontSize: 16,
		fontFamily: "nunito-bold",
		color: Colors.DARK_GREY_COLOR
	},
	pointContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 10
	},
	freeHours: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 30, 
		margin: 10
	},
	date: {
		width: 100,
		fontFamily: "nunito-bold",
		textAlign: "center", 
		fontSize: 16
	},
	hours: {
		textAlign: "center",
		width: 115,
		fontFamily: "nunito-bold",
		fontSize: 16
	},
	schedule: {
		height: 200,
		width: "100%", 
		display: "flex",
		flexDirection: "column",
	}
})

const IndividualTrainerContainer = ({ trainer }) => {
	const sessionDuration = 1;

	const createTrainingsSession = (freeHours) => {
		const sessions = [];
		freeHours.forEach(freeHour => {
			let totalDuration = parseInt(freeHour.duration.match(/\d+/)[0], 10);
			let [hours, minutes] = freeHour.time.split(':').map(Number);
			let startTime = new Date();
			startTime.setHours(hours, minutes);

			while (totalDuration > 0) {
				const endTime = new Date(startTime.getTime());
				endTime.setHours(endTime.getHours() + sessionDuration);
				sessions.push({ startTime, endTime });
				totalDuration -= sessionDuration;
				startTime = endTime;
			}
		});

		return sessions;
	}

	const splitDate = (date) => {
		return date.split('-').reverse().join('.');
	}

	const convertTime = (time) => {
		return time.toTimeString().substring(0, 5);
	}


	return (
		<View style={styles.container}>
			<Image style={{ width: 215, height: 215, borderRadius: 120 }} source={trainer.imgURL} />
			<Text style={styles.nameText}>{trainer.name}</Text>
			<View style={styles.pointContainer}>
				<Text style={styles.pointText}>{trainer.points}/5.0</Text>
				<Star width={20} height={20} />
			</View>
			<ScrollView style={styles.schedule}>
				{
					trainer.freeHours && trainer.freeHours.map((freeHour, index) => {
						const sessions = createTrainingsSession(freeHour.hours);

						return sessions.map((session, index) => {
							return (
								<View key={index} style={styles.freeHours}>
									<Text style={styles.date}>
										{splitDate(freeHour.date)}
									</Text>
									<Text style={styles.hours}>
										{convertTime(session.startTime)} - {convertTime(session.endTime)}
									</Text>
									<Pressable>
										<Text style={{ color: Colors.PRIMARY_COLOR, fontFamily: "nunito-bold", fontSize: 16 }}>Book</Text>
									</Pressable>
								</View>
							);
						});
					})
				}
			</ScrollView>
		</View>
	);
};

export default IndividualTrainerContainer;