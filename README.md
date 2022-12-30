# Game_UserProfile_With_Authentication

# Kurulum:

# Database bağlantısı için:

1) “cd” komutuyla AuthBackend-main klasörünün dizinine giriniz.

2) “npx node ./app.js” komutuyla database’e bağlanınız. (“db connected” yazısını gördüyseniz database bağlantısı gerçekleşmiştir.)

3) Terminali kapatmayınız.

# Database bağlantısı yapıldıktan sonra:

1) Yeni bir terminal açınız ve  “cd” komutuyla AuthMobile-main klasörünün dizinine giriniz.

2) “npm install” komutunu çalıştırınız.

3) “npm start” komutuyla Metro’yu çalıştırınız.

4) Terminalde “Metro waiting on exp://10.33.203.6:19000” yazısı olacaktır. Bu yazıdaki “10.33.203.6” adresini kopyalayınız. (Sizin için farklı bir adres yazacaktır.)

5) Metro’yu iptal ediniz.

6) AuthMobile-main klasörünün içerisindeki “backend.config.js” dosyasındaki BASE_URL değişkenini kopyaladığınız adresle değiştirip kaydediniz. (“http://192.168.55.58:3000” değeri “http://kopyaladiginiz adres:3000”)

7) Bu değişiklikten sonra “npm start” komutuyla Metro’yu tekrar çalıştırınız.

QR kodu bilgisayarınızla aynı internete bağlı olan telefonunuzdaki (Real Device) Expo Go uygulamasına okutarak uygulamayı başlatınız. (Eğer uygulamayı QR kod ile değil de sanal cihazdan [Genymotion, Android Studio Emulator gibi] başlatmak istiyorsanız “a” tuşu ile uygulamayı sanal cihazdan başlatabilirsiniz.)

# Muhtemel problemler:

# 1) Package problemleri: 
Package problemi sonrası işlemleri sonlandırınız (uygulama aktifken package kurulumları sorun yaratabilir) ve hata mesajında eksik olduğu belirtilen package’ların kurulumunu yapınız. (Örneğin: axios paket hatası için “cd” komutuyla AuthMobile-main klasörünün içerisine girip “npm install axios” komutunu çalıştırarak axios paketini yükleyebilirsiniz. Diğer paketlerin kurulum komutlarına internetten erişebilirsiniz.)

# 2) Sanal cihazda Google Play Services hatası (Real Device’da bu hata alınmaz): 
Sanal cihazınızda Google Play Services hatası ile karşılaşabilirsiniz. Bu hatadan kurtulmak için AuthMobile-main>src>screens>UserProfileScreen.js dosyasının 14.satırındaki “import MainMap from '../map/components/MainMap/MainMap” ve 70.satırındaki “<MainMap></MainMap>” kodlarını silebilirsiniz. 

# Not: 
Sadece front-end kısmında geliştirmeler yapacaksanız (database bağlantısına ihtiyacınız yoksa) proje içerisindeki StyleSheet ve componentleri, oluşturduğunuz yeni boş projeye entegre edip düzenlemeler yapabilirsiniz.

# Not2: 
Backend bağlantısının nasıl yapıldığını bu videodan öğrenebilirsiniz: https://www.youtube.com/watch?v=CobhS6wdUeQ&ab_channel=ReactNativeDersleri 
