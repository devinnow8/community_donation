import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./styles";
import HeaderBar from "../../ReusableComponents/HeaderBar";

import { useNavigation } from "@react-navigation/native";

const InfoScreen = () => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <HeaderBar
        headingText="भंडारा बुकिंग"
        hasBackButton={true}
        rightText={"Login"}
        onRightButtonPress={() => {
          navigation.navigate("AdminLogin");
        }}
      />
      <View style={styles.mainImage}>
        <Image source={require("../../assets/images/MainScreenIcon.png")} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headingText}>
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
        </View>
        <View style={styles.adminContactContainer}>
          <Text style={styles.adminContactText}>
            अन्य जानकारी के लिया संपर्क करे{" "}
          </Text>
          <Text style={styles.adminContactText}>+919965848564</Text>
        </View>
        <Text style={styles.trustInfoText}>
          {/* यह एक लंबा स्थापित तथ्य है कि जब एक पाठक एक पृष्ठ के खाखे को देखेगा तो
          पठनीय सामग्री से विचलित हो जाएगा */}
          'सब की सेवा, रब की सेवा' ट्रस्ट की ओर से महामाया बाला सुंदरी मंदिर
          त्रिलोकपुर के लिए निशुल्क बस सेवा शुरू की गई है। ट्रस्ट की ओर से महीने
          में एक बार वॉल्वो बस चलाई जाएगी। इस बस सेवा का लाभ लेने के लिए
          श्रद्धालुओं को रजिस्ट्रेशन करवाना होगा। ट्रस्ट द्वारा हर महीने करीब
          100 श्रद्धालुओं को महामाया बाला सुंदरी के दर्शन करवाए जाएंगे। लंगर की
          सेवा भी रहेगी|{"\n"}
          {"\n"}
          गौसेवा में योगदान देता ट्रस्ट ट्रस्ट के प्रधान संजय सिंगला ने बताया कि
          ट्रस्ट की ओर से गौ सेवा के लिए भी महत्वपूर्ण योगदान दिया जा रहा है।
          लंपी रोग के दौरान गौ सेवा के लिए चंडीगढ़ व पंचकूला गौशालाओं में सहयोग
          किया गया। अब ट्रस्ट द्वारा महामाया बाला सुंदरी गौशाला में पशुओं की
          देखभाल व पशु चारा के लिए भी सहयोग किया जाएगा।
        </Text>
      </View>
    </View>
  );
};

export default InfoScreen;
