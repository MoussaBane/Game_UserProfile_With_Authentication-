import React, { createContext, useState } from 'react'
import { TouchableOpacity, StyleSheet, View,Image } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../../backend.config'
import { debug } from 'react-native-reanimated'
import UserProfileScreen from './UserProfileScreen'


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }else{
      var emailVal=email.value;
      var passVal=password.value;
      var loginStr=BASE_URL+"/auth/login";
      console.log(loginStr);
      axios
      .post(loginStr, {
        "userMail":emailVal,
        "userPassword":passVal
      })
      .then(res => {
        let userInfo = res.data;
        let userMail = res.data.user.userMail;
        console.log("Async userMail: " + userMail);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));//JSON.stringify(userInfo) ifade yerine direkt userInfo yazılması gerekiyor olabilir.
        AsyncStorage.setItem('userMail', userMail);
        //console.log(userInfo.durum);
        if(userInfo.token){
          navigation.reset({
            index: 0,
            routes: [{ name: 'UserProfileScreen' }],
          })
        }        
      })
      .catch(e => {
        console.log(`login error ${e}`);
      });
    }
    //ilk if geçildikten sonra veri tabanı işlemleri burada yapılıcak
    //token oluşturma vb...    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Header>Tekrar Hoşgeldin</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Şifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Şifrenimi unuttun?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Giriş Yap
      </Button>
      <View style={styles.row}>
        <Text>Hesabın yok mu?  </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      {/* social login section */}
      <View style={{ backgroundColor: '#fff', flexDirection: 'column', paddingHorizontal: '4%' }} >
                <Text style={{ textAlign: 'center', marginTop: 15,marginBottom:15,fontSize:15, color:theme.colors.primary,fontWeight:'bold'}} >Veya</Text>

                <View style={{ flexDirection: 'column', alignItems: 'center', width: '95%' }} >
                    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../../assets/google_icon.png')} />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 16 }} >Google ile giriş yap</Text>
                    </TouchableOpacity>
                </View>
        </View>

    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  social_btn: {
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
},
social_img: {
    width: 25,
    height: 25,
    marginLeft: 15
},
})
