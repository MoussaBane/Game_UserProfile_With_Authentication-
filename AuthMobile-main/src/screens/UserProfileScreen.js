//Grup9

import { React, useEffect, useState } from 'react';
import { StatusBar, View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { BASE_URL } from '../../backend.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { debug } from 'react-native-reanimated';
import { theme } from '../theme';
import Card from "../components/Card";
import Colors from '../constants/Colors';
import Info from '../components/Info';
import MainMap from '../map/components/MainMap/MainMap';
import ActionButton from '../components/ActionButton';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function UserProfileScreen({ navigation }) {

    const [userMail, setUserMail] = useState();
    const [userName, setUserName] = useState();
    const [userCreated, setUserCreated] = useState();
    const [userFullName, setUserFullName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [userPoint, setUserPoint] = useState();

    useEffect(() => {
        console.log("use effect");
        AsyncStorage.getItem('userMail').then(value => {
            const profileStr = BASE_URL + "/user/profile";
            axios.post(profileStr, { "userMail": value })
                .then(res => {
                    setUserMail(res.data.userMail);
                    setUserName(res.data.userName);
                    let dateOfRegistration = res.data.userCreated.split("T")[0];
                    setUserCreated(dateOfRegistration);
                    setUserFullName(res.data.userFullName);
                    setUserPhone(res.data.userPhone);
                    setUserPoint(res.data.userPoint);
                })
                .catch(e => {
                    console.log(`user profile error ${e}`);
                });
        })
            .catch(e => {
                console.log(`user profile get error ${e}`);
            });
    });

    function editButton() {
        navigation.navigate('EditProfileScreen', { name: 'Edit Profile Page' });
        console.log("Edit screen navigation.");
    }

    const logoutButton = async () => {
        try {
           await AsyncStorage.multiRemove(["userInfo", "userMail"]);
           navigation.navigate('StartScreen');
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <View style={styles.cardSection}>
                <Card userFullName={userFullName} userName={userName}> </Card >
            </View>
            <View style={styles.infoSection}>
                <Info iconName="user" label="User:" information={userFullName}></Info>
                <Info iconName="at" label="Username:" information={userName}></Info>
                <Info iconName="plus" label="Point:" information={userPoint}></Info>
                <Info iconName="calendar" label="Registration:" information={userCreated}></Info>
                <Info iconName="envelope" label="Email:" information={userMail}></Info>
                <Info iconName="phone" label="Phone:" information={userPhone}></Info>
            </View>
            <View style={styles.heatMapSection}>
                <MainMap></MainMap>
            </View>
            <View style={styles.buttonSection}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActionButton onPress={logoutButton} iconName="sign-out" text="Logout" />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActionButton onPress={editButton} iconName="edit" text="Edit Profile" />
                </View>
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        backgroundColor: 'white',
    },
    cardSection: {
        flex: 3,
        width: '95%',
        marginBottom: "3%"
    },
    infoSection: {
        marginBottom: '3%',
        flex: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heatMapSection: {
        flex: 9,
        width: "95%",
        marginBottom: '3%',
    },
    buttonSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        width: "95%",
        marginBottom: "5%"
    },
});