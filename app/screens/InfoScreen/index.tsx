import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const InfoScreen = () => {
  const navigation: any = useNavigation();
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const getAdminPhoneNumber = () => {
    firestore()
      .collection("adminLogin")
      .doc("Admin")
      .get()
      .then(({ _data }: any) => setAdminPhoneNumber(_data.phoneNumber))
      .catch(() => {
        Alert.alert("Error fetching collections");
      });
  };
  useEffect(() => {
    getAdminPhoneNumber();
  }, []);
  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:${adminPhoneNumber}`;
    } else {
      number = `tel:${adminPhoneNumber}`;
    }

    Linking.openURL(number);
  };
  return (
    <View style={styles.mainContainer}>
      <HeaderBar
        headingText="भंडारा बुकिंग"
        hasBackButton={true}
        rightText={"Admin Login"}
        onRightButtonPress={() => {
          navigation.navigate("AdminLogin");
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getHeight(30) }}
      >
        <View style={styles.mainImage}>
          <Image
            resizeMode="contain"
            style={{ height: getHeight(140), width: getWidth(110) }}
            source={require("../../assets/images/MainScreenIcon.png")}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headingText}>
              'सब की सेवा, रब की सेवा' ट्रस्ट
            </Text>
          </View>
          <TouchableOpacity
            style={styles.adminContactContainer}
            onPress={() => openDialScreen()}
          >
            <Text style={styles.adminContactText}>संपर्क करे</Text>
            <Text style={styles.adminContactTextNumber}>
              {adminPhoneNumber}
            </Text>
          </TouchableOpacity>
          <Text style={styles.trustInfoText}>
            'सब की सेवा, रब की सेवा' ट्रस्ट की ओर से महामाया बाला सुंदरी मंदिर
            त्रिलोकपुर के लिए निशुल्क बस सेवा शुरू की गई है। ट्रस्ट की ओर से
            महीने में एक बार वॉल्वो बस चलाई जाएगी। इस बस सेवा का लाभ लेने के लिए
            श्रद्धालुओं को रजिस्ट्रेशन करवाना होगा। ट्रस्ट द्वारा हर महीने करीब
            100 श्रद्धालुओं को महामाया बाला सुंदरी के दर्शन करवाए जाएंगे। लंगर
            की सेवा भी रहेगी|{"\n"}
            {"\n"}
            गौसेवा में योगदान देता ट्रस्ट ट्रस्ट के प्रधान संजय सिंगला ने बताया
            कि ट्रस्ट की ओर से गौ सेवा के लिए भी महत्वपूर्ण योगदान दिया जा रहा
            है। लंपी रोग के दौरान गौ सेवा के लिए चंडीगढ़ व पंचकूला गौशालाओं में
            सहयोग किया गया। अब ट्रस्ट द्वारा महामाया बाला सुंदरी गौशाला में
            पशुओं की देखभाल व पशु चारा के लिए भी सहयोग किया जाएगा।
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
