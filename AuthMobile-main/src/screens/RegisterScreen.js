import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { theme } from '../theme'
import { passwordValidator } from '../helpers/passwordValidator'
import { emailValidator } from '../helpers/emailValidator'
import { nameValidator } from '../helpers/nameValidator'
//import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../backend.config.js';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const sendRegister = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError|| passwordError || nameError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }else{

        var nameVal=name.value;
        var emailVal=email.value;
        var passVal=password.value;
        var sigUpStr=BASE_URL+"/auth/signup";
        console.log(sigUpStr);
        axios
        .post(sigUpStr, {
          "userName":nameVal,
          "userMail":emailVal,
          "userPassword":passVal,
        })
        .then(res => {
          let userInfo = res.data;
          //AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          console.log(userInfo);
          navigation.navigate('LoginScreen');
        })
        .catch(e => {
          console.log(`register error ${e}`);
        });
      }    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Header>Merhaba, Hesap Olu??tur</Header>
      
      <TextInput
        label="Ad??n??z"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="??ifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={sendRegister}
        style={{ marginTop: 20 }}
      >
        ??ye Ol
      </Button>

      <View style={{flexDirection: 'row', marginTop: 4}}>
        <Text style={{ color: theme.colors.secondary}}>Hesab??n??z var m??? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={{fontWeight: 'bold', color: theme.colors.primary}}>Giri?? Yap</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}
