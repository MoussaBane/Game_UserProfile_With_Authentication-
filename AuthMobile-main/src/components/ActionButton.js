//Grup9

import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

function ActionButton({ text, iconName, onPress }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <View style={styles.content}>
                <Icon size={15} name={iconName} color="white" style={{color:Colors.primary}}/>
                <Text style={[styles.text, {marginLeft: "3%"}]}>{text}</Text>
                </View>
                
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 50,
        width: "85%",
        height: "50%"
    },
    content: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    button: {
        flex: 1,
        flexDirection: "row",
        width: "100%"
    },
    icon: {
        flex: 1,
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    label: {
        flex: 1,
        height: "100%",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.primary
    }
});

export default ActionButton;
