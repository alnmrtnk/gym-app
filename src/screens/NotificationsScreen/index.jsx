import React, { useContext, useEffect } from 'react'
import HeaderBottomMenuComponent from '../../components/HeaderBottomMenuComponent';
import { ScrollView, StyleSheet, View } from 'react-native';
import AuthContext from '../../contexts/AuthContext';
import Colors from '../../../assets/Colors';
import NotificationComponent from '../../components/NotificationComponent';

const styles = StyleSheet.create({
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Colors.PRIMARY_BACKGROUND_COLOR,
        padding: "5%",
        minHeight: 667,
    }
})

const NotificationsScreen = ({ navigation }) => {
    const { notifications, fetchNotifications } = useContext(AuthContext);

    useEffect(() => {
        fetchNotifications(true);
    }, []);

    return (
        <View>
            <HeaderBottomMenuComponent navigation={navigation} currentPage={4}>
                <View style={styles.contentContainer}>
                    <ScrollView>
                    {
                        notifications.map((notification, index) => {
                            return (
                                <NotificationComponent key={index} notification={notification} />
                            )
                        })
                    }
                    </ScrollView>
                </View>
            </HeaderBottomMenuComponent>
        </View>
    )
}

export default NotificationsScreen;