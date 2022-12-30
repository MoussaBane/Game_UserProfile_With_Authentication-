//Grup9

import { StyleSheet, View, Text, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/Colors";

function Info({ iconName, label, information, setValue, ...props }) {

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <View style={styles.icon}>
                    <Icon size={15} name={iconName} color="white" />
                </View>
                <View style={styles.label}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>{label}</Text>
                </View>
            </View>
            <View style={styles.input}>
                <TextInput 
                style={styles.input} 
                value={information} 
                onChangeText={(text) => setValue?.(text)} 
                defaultValue={information} 
                color="black"
                {...props}/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column",
            width: '95%',
            backgroundColor: Colors.secondary,
            borderColor: "black",
            borderWidth: 2,
            borderRadius: 5,
            marginTop: 10,
            marginBottom: 10,
        },
        title: {
            flex: 1,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "row"
        },
        input: {
            flex: 1,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "white",
            paddingLeft: "2%"
        },
        icon: {
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.secondary
        },
        label: {
            height: "100%",
            flex: 10,
            fontSize: 15,
            backgroundColor: "green",
            color: Colors.text,
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: Colors.secondary
        },
        text: {
            fontSize: 15,
            color: "white",
            fontWeight: "normal"
        }
    }
);

export default Info;
