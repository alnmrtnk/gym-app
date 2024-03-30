import React from 'react';
import Colors from '../../../assets/Colors';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
    "input-container": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        margin: "5%, 0%",
        padding: "2%",
        borderRadius: 20, 
    },
    input: {
        backgroundColor: 'transparent',
        padding: 'offset',
        width: '90%',
        fontFamily: "nunito-regular",
    },
});

const FormsInput = (props) => {
    const { Icon, onChangeText, ...input } = props;

    return (
        <View style={styles["input-container"]}>
            <Icon />
            <TextInput
                onChangeText={onChangeText}
                style={styles.input}
                outlineColor='transparent'
                theme={{
                    colors: {
                        primary: Colors.PRIMARY_COLOR,
                        underlineColor: 'transparent',
                        onSurfaceVariant: Colors.SECONDARY_HEADER_COLOR,
                    },
                    fonts: {
                        bodyLarge: { fontFamily: "nunito-bold" }
                    }
                }}
                {...input}
            />
        </View>
    );
};

export default FormsInput;