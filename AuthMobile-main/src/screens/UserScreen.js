import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import UserProfileScreen from './UserProfileScreen';
import { BASE_URL } from '../../backend.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function UserScreen({ navigation }) {

    console.log("Basa dondu.");

    const [mail, setMail] = useState(null);
    const [data, setData] = useState(null);

    console.log("mail: " + mail + " data: " + data);
    
    let screen;
    
    const getUserMail = () => {
        AsyncStorage.getItem('userMail').then(value => {
            console.log("user mail handler:" + value)
            const profileStr = BASE_URL + "/user/profile";
            axios.post(profileStr, { "userMail": value })
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(e => {
                console.log(`user profile error ${e}`);
            });
        })
            .catch(e => {
                console.log(`async storage mail error ${e}`);
            });
    }

    if(mail == null){
        getUserMail();
    }

    if(mail != null && data != null){
        screen = <UserProfileScreen data={data} />;
    }
    else{
        console.log("null var");
    }

    /*function fetchData(){
        const profileStr = BASE_URL + "/user/profile";
        console.log("fetch mail:" + getUserMail());
        axios.post(profileStr, { "userMail": getUserMail() })
            .then(res => {
                console.log(res.data);
                setData(res.data);
                screen = <UserProfileScreen data={data} />;
            })
            .catch(e => {
                console.log(`user profile error ${e}`);
            });
    }*/

    /*useEffect(() => {
        fetchData();
    }, []);*/

    return (
        <SafeAreaView style={styles.rootScreen}>
            {screen}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        backgroundColor: "grey"
    },
});
