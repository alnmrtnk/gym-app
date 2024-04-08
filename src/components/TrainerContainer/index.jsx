import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../../assets/Colors';
import Star from '../../../assets/star.svg';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        borderRadius: 20,
        padding: 10,
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
    }
})

const TrainerContainer = ({ trainer }) => {
    return (
        <View style={styles.container}>
            <Image style={{ width: 100, height: 100, borderRadius: 120 }} source={trainer.imgURL} />
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{trainer.name}</Text>
                <View style={styles.pointContainer}>
                    <Text style={styles.pointText}>{trainer.points}/5.0</Text>
                    <Star width={20} height={20} />
                </View>
            </View>
        </View>
    )
}

export default TrainerContainer