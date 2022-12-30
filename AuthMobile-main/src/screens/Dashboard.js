import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Dashboard({ navigation }) {
  const [userName,setUserName]=useState("");
  const [userMail,setUserMail]=useState("");
  AsyncStorage.getItem('userInfo').then(value=>{
    var data=JSON.parse(value);
    setUserMail(data.user.userName);
    setUserName(data.user.userMail);
    //console.log("userInfo:"+value);    
  });     
  
  return (
    
    <Background>
      <Paragraph>Ad:{userName}</Paragraph>
      <Paragraph>Mail: {userMail}</Paragraph>
      <Header> Giriş yapıldı</Header>
      <Paragraph>
        çıkış yapmak için butona tıklayınız.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        ÇIKIŞ YAP 
      </Button>
    </Background>
  )
}
