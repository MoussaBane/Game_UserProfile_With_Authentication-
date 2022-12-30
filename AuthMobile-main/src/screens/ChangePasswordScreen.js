//Grup9

import { React, useState, useEffect } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import ActionButton from "../components/ActionButton";
import InfoInput from "../components/InfoInput";
import Card from "../components/Card";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../backend.config";
import Colors from "../constants/Colors";
import CustomAlert from "../components/CustomAlert";

function ChangePasswordScreen({ navigation }) {
  const [userName, setUserName] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [userFullName, setUserFullName] = useState();
  const [userPassword, setUserPassword] = useState({ value: "", error: "" });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: "",
  });
  const [userMail, setUserMail] = useState();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Sorry, we couldn't update your profile.");

  useEffect(() => {
    AsyncStorage.getItem("userMail")
      .then((value) => {
        const profileStr = BASE_URL + "/user/profile";
        axios
          .post(profileStr, { userMail: value })
          .then((res) => {
            setUserName(res.data.userName);
            setUserFullName(res.data.userFullName);
            setUserMail(res.data.userMail);
          })
          .catch((e) => {
            console.log(`user profile error ${e}`);
          });
      })
      .catch((e) => {
        console.log(`user profile get error ${e}`);
      });
  }, []);

  function saveButton() {
    if (!userPassword && !passwordConfirm || userPassword.length < 5 && passwordConfirm.length < 5) {
      setErrorMessage("Password must be at least 5 characters!");
      setShowErrorAlert(true);
    }
    else {
      const checkPasswordStr = BASE_URL + "/user/checkPassword";
      axios.post(checkPasswordStr, { userMail: userMail, currentPassword: currentPassword })
        .then((res) => {
          console.log("status: " + res.data.status + " " + "message: " + res.data.message);
          if (res.data.status == "success") {
            if (userPassword == passwordConfirm) {
              const updateStr = BASE_URL + "/user/change-password";
              axios
                .post(updateStr, {
                  userPassword: userPassword,
                  userMail: userMail,
                })
                .then((res) => {
                  if (res.data.status == "success") {
                    AsyncStorage.setItem("userMail", userMail).then(
                      setShowSuccessAlert(true)
                    );
                  }
                })
                .catch((e) => {
                  console.log(`edit profile update error ${e}`);
                  setShowErrorAlert(true);
                  setErrorMessage(errorMessage + "(" + e + ")");
                });
            }
          }
          else {
            setShowErrorAlert(true);
            setErrorMessage(res.data.message);
          }
        });
    }
  }

  function cancelButton() {
    navigation.navigate("EditProfileScreen", { name: "EditProfileScreen" });
  }

  return (
    <View style={styles.container}>
      <CustomAlert
        displayMode={"success"}
        displayMsg={"Your password has been updated."}
        visibility={showSuccessAlert}
        dismissAlert={setShowSuccessAlert}
        navigation={navigation}
      />
      <CustomAlert
        displayMode={"failed"}
        displayMsg={errorMessage}
        visibility={showErrorAlert}
        dismissAlert={setShowErrorAlert}
        navigation={navigation}
      />
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View style={styles.cardSection}>
        <Card userFullName={userFullName} userName={userName}>
          {" "}
        </Card>
      </View>
      <View style={styles.inputContainer}>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}></View>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <InfoInput
            iconName={"key"}
            label={"Current Password"}
            secureTextEntry={true}
            placeholder="*******"
            setValue={setCurrentPassword}
          />
        </View>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <InfoInput
            iconName={"key"}
            label={"New Password"}
            secureTextEntry={true}
            placeholder="*******"
            setValue={setUserPassword}
          />
        </View>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <InfoInput
            iconName={"key"}
            label={"Confirm New Password"}
            secureTextEntry={true}
            placeholder="*******"
            setValue={setPasswordConfirm}
          />
        </View>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}></View>
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActionButton text="Cancel" iconName="close" onPress={cancelButton} />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActionButton
            text="Update Password"
            iconName="key"
            onPress={saveButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardSection: {
    flex: 3,
    width: "95%",
    marginBottom: "3%",
  },
  inputContainer: {
    flex: 13,
    flexDirection: "column",
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    marginBottom: "5%",
  },
});

export default ChangePasswordScreen;