//Grup9

import { React, useState, useEffect } from 'react';
import { StatusBar, View, Image, StyleSheet, ActionSheetIOS } from 'react-native';
import axios from 'axios'
import { BASE_URL } from '../../backend.config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import InfoInput from "../components/InfoInput";
import ActionButton from '../components/ActionButton';
import CustomAlert from '../components/CustomAlert';
import Colors from '../constants/Colors';

function EditProfileScreen({ navigation }) {

    const [userMail, setUserMail] = useState();
    const [userName, setUserName] = useState();
    const [userFullName, setUserFullName] = useState();
    const [userPhone, setUserPhone] = useState();
    const [currentMail, setCurrentMail] = useState();
    const [currentPhone, setCurrentPhone] = useState();
    const [currentUsername, setCurrentUsername] = useState();
    const [errorMessage, setErrorMessage] = useState("Sorry, we couldn't update your profile.");

    const [showSuccessAlert, setShowSuccessAlert] = useState(
        false,
    );
    const [showErrorAlert, setShowErrorAlert] = useState(
        false,
    );

    const [updateProfile, setUpdateProfile] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('userMail').then(value => {
            const profileStr = BASE_URL + "/user/profile";
            axios.post(profileStr, { "userMail": value })
                .then(res => {
                    setUserMail(res.data.userMail);
                    setUserName(res.data.userName);
                    setUserFullName(res.data.userFullName);
                    setUserPhone(res.data.userPhone);

                    setCurrentMail(res.data.userMail);
                    setCurrentPhone(res.data.userPhone);
                    setCurrentUsername(res.data.userName);
                })
                .catch(e => {
                    console.log(`user profile error ${e}`);
                });
        })
            .catch(e => {
                console.log(`user profile get error ${e}`);
            });
    }, []);

    if (updateProfile) {
        saveButton();
    }

    function update() {
        console.log("update girildi.");
        let check_validation = checkValidation();
        //let check_database = checkDatabase();

        if (check_validation) {
            const checkUpdateStr = BASE_URL + "/user/checkUpdate";
            axios.post(checkUpdateStr, {
                "userMail": userMail,
                "currentMail": currentMail,
                "userPhone": userPhone,
                "currentPhone": currentPhone,
                "userName": userName,
                "currentUsername": currentUsername
            })
            .then((res) => {
                if(res.data.status == "success"){
                    setUpdateProfile(true);
                }
                else{
                    setErrorMessage(res.data.message);
                    setShowErrorAlert(true);
                }
            })
        }
        else {
            console.log("update is false");
            setShowErrorAlert(true);
        }
    }

    function checkValidation() {
        let mail_validation = mailValidation();
        let username_validation = usernameValidation();
        let phone_validation = phoneValidation();
        let fullname_validation = fullnameValidation();

        if (mail_validation && username_validation && phone_validation && fullname_validation) {
            console.log("checkValidation: true");
            return true;
        }
        console.log("checkValidation: false");
        return false;
    }

    function mailValidation() {
        console.log("mailValidation");
        if (currentMail != userMail) {
            const regex = /\S+@\S+\.\S+/
            if (!userMail || !regex.test(userMail)) {
                console.log("invalid mail.");
                setErrorMessage("Email is invalid!");
                return false;
            }
        }
        return true;
    }

    function fullnameValidation() {
        if(!userFullName){
            setErrorMessage("Full name is required.");
            return false;
        }
        return true;
    }

    function usernameValidation() {
        if (currentUsername != userName) {
            if (!userName) {
                console.log("invalid username.");
                setErrorMessage("Username is invalid!");
                return false;
            }
        }
        return true;
    }

    function phoneValidation() {
        if (currentPhone != userPhone) {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!regex.test(userPhone)) {
                console.log("invalid phone.");
                setErrorMessage("Phone is invalid!");
                return false;
            }
        }
        return true;
    }

    function saveButton() {
        const updateStr = BASE_URL + "/user/update"
        axios.post(updateStr,
            {
                "mail": currentMail,
                "userFullName": userFullName,
                "userPhone": userPhone,
                "userName": userName,
                "userMail": userMail
            })
            .then(res => {
                if (res.data.status == "success") {
                    console.log("Updated: " + currentMail + userFullName + userPhone + userName + userMail);
                    AsyncStorage.setItem('userMail', userMail).then(setShowSuccessAlert(true));
                }
            })
            .catch(e => {
                console.log(`edit profile update error ${e}`);
                setErrorMessage("Database error: " + e);
                setShowErrorAlert(true);
            });
    }

    function cancelButton() {
        navigation.navigate('UserProfileScreen', { name: 'UserProfileScreen' });
    }

    function changePasswordButton() {
        navigation.navigate('ChangePasswordScreen', { name: 'ChangePasswordScreen' });
    }

    return (
        <View style={styles.container}>

            <CustomAlert
                displayMode={'success'}
                displayMsg={'Your profile has been updated.'}
                visibility={showSuccessAlert}
                dismissAlert={setShowSuccessAlert}
                navigation={navigation}
            />
            <CustomAlert
                displayMode={'failed'}
                displayMsg={errorMessage}
                visibility={showErrorAlert}
                dismissAlert={setShowErrorAlert}
                navigation={navigation}
            />

            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <View style={styles.avatarSection}>
                <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
                    <Image
                        style={{ width: '30%', height: '70%', borderRadius: 50, overflow: 'hidden', borderWidth: 2, borderColor: 'white' }}
                        source={{ uri: "https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" }} />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", marginBottom: "2%" }}>
                    <ActionButton iconName={"upload"} text="Change your avatar" />
                </View>
            </View>
            <View style={styles.inputSection}>
                <InfoInput setValue={setUserFullName} iconName={"user"} label={"Full Name"} information={userFullName}></InfoInput>
                <InfoInput setValue={setUserName} iconName={"at"} label={"Username"} information={userName}></InfoInput>
                <InfoInput setValue={setUserMail} iconName={"envelope"} label={"Email"} information={userMail}></InfoInput>
                <InfoInput setValue={setUserPhone} iconName={"phone"} label={"Phone"} information={userPhone}></InfoInput>
            </View>
            <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center", width: "95%", marginBottom: "7%" }}>
                <ActionButton onPress={changePasswordButton} iconName="key" text={"Change password"} />
            </View>
            <View style={styles.buttonSection}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActionButton onPress={() => { cancelButton() }} iconName="close" text="Cancel" />
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActionButton onPress={() => { update() }} iconName="save" text={"Save"} />
                </View>
            </View>

        </View>
    )
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: "column"
    },
    avatarSection: {
        flex: 6,
        flexDirection: "column",
        width: "95%",
        marginBottom: "3%",
        backgroundColor: Colors.secondary,
        borderColor: "black",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    inputSection: {
        flexDirection: 'column',
        flex: 14,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "3%"
    },
    buttonSection: {
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "95%",
        marginBottom: "5%"
    },
});