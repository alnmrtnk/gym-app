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
	const splitDate = (date) => {
		return date.split('-').reverse().join('.');
	}

	const convertTime = (time) => {
		return time.toTimeString().substring(0, 5);
	}


	return (
		<View style={styles.container}>
			<Image style={{ width: 215, height: 215, borderRadius: 120 }} source={{uri: trainer.imgURL}} />
			<Text style={styles.nameText}>{trainer.name}</Text>
			<View style={styles.pointContainer}>
				<Text style={styles.pointText}>{trainer.points}/5.0</Text>
				<Star width={20} height={20} />
			</View>
			<ScrollView style={styles.schedule}>
				{
					trainer.free_hours ? trainer.free_hours.map((freeHour, index) => {
						const hours = freeHour.hours;
						console.log(hours);

						return hours.map((hour, index) => {
							return (
								<View key={index} style={styles.freeHours}>
									<Text style={styles.date}>
										{splitDate(freeHour.date)}
									</Text>
									<Text style={styles.hours}>
										{hour.time_from} - {hour.time_to}
									</Text>
									<Pressable>
										<Text style={{ color: Colors.PRIMARY_COLOR, fontFamily: "nunito-bold", fontSize: 16 }}>Book</Text>
									</Pressable>
								</View>
							);
						});
					}) : <Text style={{ color: Colors.DARK_GREY_COLOR, fontFamily: "nunito-bold", fontSize: 16 }}>No free hours</Text>
				}
			</ScrollView>
		</View>
	);
};

export default IndividualTrainerContainer;