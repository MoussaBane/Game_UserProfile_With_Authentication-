//Grup9

import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";

function Info({ iconName, label, information }) {

    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Icon size={15} name={iconName} color="white"/>
            </View>
            <View style={styles.label}>
                <Text style={[styles.text, {fontWeight: "bold"}]}>{label}</Text>
            </View>
            <View style={styles.information}>
                <Text style={[styles.text, {marginLeft: "2%", color: "black"}]}>{information}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "row",
            width: '95%',
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 2,
            marginBottom: 2
        },
        icon: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.secondary
        },
        label: {
            flex: 3,
            fontSize: 15,
            color: Colors.text,
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: Colors.secondary,
        },
        information: {
            flex: 5,
            color: Colors.text,
            alignItems: "flex-start",
            justifyContent: "center"
        },
        text: {
            fontSize: 15,
            color: "white",
            fontWeight: "normal"
        }
    }
);

export default Info;
