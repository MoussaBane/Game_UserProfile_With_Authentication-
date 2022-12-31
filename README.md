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

   QR kodu bilgisayarınızla aynı internete bağlı olan telefonunuzdaki (Real Device) Expo Go uygulamasına okutarak uygulamayı başlatınız. (Eğer uygulamayı QR kod ile      değil de sanal cihazdan [Genymotion, Android Studio Emulator gibi] başlatmak istiyorsanız “a” tuşu ile uygulamayı sanal cihazdan başlatabilirsiniz.)

# Muhtemel problemler:

# 1) Package problemleri: 
Package problemi sonrası işlemleri sonlandırınız (uygulama aktifken package kurulumları sorun yaratabilir) ve hata mesajında eksik olduğu belirtilen package’ların kurulumunu yapınız. (Örneğin: axios paket hatası için “cd” komutuyla AuthMobile-main klasörünün içerisine girip “npm install axios” komutunu çalıştırarak axios paketini yükleyebilirsiniz. Diğer paketlerin kurulum komutlarına internetten erişebilirsiniz.)

# 2) Sanal cihazda Google Play Services hatası (Real Device’da bu hata alınmaz): 
Sanal cihazınızda Google Play Services hatası ile karşılaşabilirsiniz. Bu hatadan kurtulmak için AuthMobile-main>src>screens>UserProfileScreen.js dosyasının 14.satırındaki “import MainMap from '../map/components/MainMap/MainMap” ve 70.satırındaki “<MainMap></MainMap>” kodlarını silebilirsiniz. 

# Not: 
Sadece front-end kısmında geliştirmeler yapacaksanız (database bağlantısına ihtiyacınız yoksa) proje içerisindeki StyleSheet ve componentleri, oluşturduğunuz yeni boş projeye entegre edip düzenlemeler yapabilirsiniz.

# Not2: 
Backend bağlantısının nasıl yapıldığını bu videodan öğrenebilirsiniz: https://www.youtube.com/watch?v=CobhS6wdUeQ&ab_channel=ReactNativeDersleri 

#

# Programın Dosyalarının Dizilimi:

   ![Ekran görüntüsü_20221231_024900](https://user-images.githubusercontent.com/75726215/210118744-3eb605c7-feaf-4a22-a5af-4898118b1691.png)
   ![Ekran görüntüsü_20221231_024829](https://user-images.githubusercontent.com/75726215/210118763-02a2bb8f-d911-423e-9aa0-9ebe0d90deef.png)
   ![Ekran görüntüsü_20221231_024523](https://user-images.githubusercontent.com/75726215/210118774-4d53e21a-9cde-4e94-8b16-d2c7effa62ae.png)
   ![Ekran görüntüsü_20221231_024546](https://user-images.githubusercontent.com/75726215/210118775-90c45609-8762-457a-89e4-96f08d69eeb3.png)
   ![Ekran görüntüsü_20221231_024656](https://user-images.githubusercontent.com/75726215/210118779-145aee38-7651-41fc-8851-609e8de0fb63.png)
   ![Ekran görüntüsü_20221231_024733](https://user-images.githubusercontent.com/75726215/210118785-e99ba990-c2cc-42ba-8d97-3286b80e63d7.png)
   ![Ekran görüntüsü_20221231_024759](https://user-images.githubusercontent.com/75726215/210118788-884dd3ad-bfb3-41aa-b48b-fde2d177a753.png)

#

# Programın Çalıştırılmış Hali:


   ![Ekran görüntüsü_20221231_011345](https://user-images.githubusercontent.com/75726215/210118890-0696a17a-0ffb-4fae-826f-465ede7bbb84.png)
   ![Ekran görüntüsü_20221231_011441](https://user-images.githubusercontent.com/75726215/210118896-05762407-28f9-4362-a298-fdf57cb39ddd.png)
   
   ![Ekran görüntüsü_20221231_011600](https://user-images.githubusercontent.com/75726215/210118898-a23db3f6-e4df-41aa-8614-b308c417f11c.png)
   ![Ekran görüntüsü_20221231_011656](https://user-images.githubusercontent.com/75726215/210118901-49cc80f8-69b8-4b81-84e7-48d563658788.png)
   
   ![Ekran görüntüsü_20221231_011719](https://user-images.githubusercontent.com/75726215/210118903-36426135-d920-47d0-a5e6-292ae5df243b.png)
   ![Ekran görüntüsü_20221231_011835](https://user-images.githubusercontent.com/75726215/210118906-05bc1af7-9e92-4d0f-ac8c-4f26dc4045a5.png)
   
   ![Ekran görüntüsü_20221231_011915](https://user-images.githubusercontent.com/75726215/210118908-6a78fca5-0d77-4c39-8871-8d18bd1f1f0d.png)
   ![Ekran görüntüsü_20221231_011931](https://user-images.githubusercontent.com/75726215/210118909-67caca6e-3f47-4eea-83d1-acd9b4429ad7.png)
   
   ![Ekran görüntüsü_20221231_012050](https://user-images.githubusercontent.com/75726215/210118910-f0be9e37-7139-46ad-b148-7ce120e500d9.png)
   ![Ekran görüntüsü_20221231_012557](https://user-images.githubusercontent.com/75726215/210118913-27a09d25-e4e1-4715-b049-316496ae8172.png)
   
   ![Ekran görüntüsü_20221231_012711](https://user-images.githubusercontent.com/75726215/210118916-713c3d51-213a-4df2-ad21-5e0a864e27cd.png)
