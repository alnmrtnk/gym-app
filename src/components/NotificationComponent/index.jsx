import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  read: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  notRead: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "red",
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifySelf: "flex-end",
    alignSelf: "flex-end",
  },
  message:{
    color: "black",
    fontSize: 16,
    fontFamily: "nunito-bold"
  },
  date: {
    color: "grey",
    fontSize: 12,
    fontFamily: "nunito-regular"
  },
  time: {
    alignSelf: "flex-end",
    color: "grey",
    fontSize: 12,
    fontFamily: "nunito-regular"
  }
})

const NotificationComponent = ({ notification }) => {
  const date = new Date(notification.dateTime);
  
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  });

  
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });

  return (
    <View style={notification.read ? styles.read : styles.notRead}>
      <Text style={styles.message}>{notification.message}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
};

export default NotificationComponent;