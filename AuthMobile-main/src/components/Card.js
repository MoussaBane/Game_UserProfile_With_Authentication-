//Grup9

import Background from "./Background";
import { StyleSheet, View, Text, Image} from "react-native";
import { theme } from "../theme";
import Colors from "../constants/Colors"
import { withDecay } from "react-native-reanimated";

function Card({userFullName, userName}){
    
    return (
        <View style={styles.bg}><View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Image
                        style={{ width: '50%', height: '70%', borderRadius: 50, overflow: 'hidden', borderWidth: 2, borderColor: 'white' }}
                        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg' }} />
        </View>
        <View style={{ flex: 3, justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>{userFullName}</Text>
            <Text style={{ fontSize: 15, color: "white" }}>@{userName}</Text>
        </View>
    </View></View>
    );
}

const styles = StyleSheet.create(
    {
        bg: {
            backgroundColor: Colors.secondary,
            borderBottomStartRadius: 10,
            borderBottomEndRadius: 10,
            borderWidth: 1,
            borderColor: Colors.secondary,
            width: '100%',
            height: '100%'
        }
    }
);

export default Card;