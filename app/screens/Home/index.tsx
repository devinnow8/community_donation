import { Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import TabView1 from "./TabView1";
import TabView2 from "./TabView2";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation: any = useNavigation();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.homeUpperContainer}>
        <HeaderBar
          headingLeftText={
            selectedTab === 0 ? "भंडारा बुकिंग" : "यात्रा बुकिंग"
          }
          HeadingRightText="दान सेवा"
          onRightTextPress={() => {
            navigation.navigate("BhandaraBooking", {
              screenType: "DaanSewa",
            });
          }}
          twoHeadings={true}
        />
        {selectedTab === 0 ? <TabView1 /> : <TabView2 />}
      </SafeAreaView>
      <View style={styles.homeBottomContainer}>
        <Pressable
          style={[
            styles.btnStyle,
            { backgroundColor: selectedTab === 0 ? "#EB6611" : "#FFFFFF" },
          ]}
          onPress={() => setSelectedTab(0)}
        >
          <Text
            style={[
              styles.btnTextStyle,
              { color: selectedTab !== 0 ? "#EB6611" : "#FFFFFF" },
            ]}
          >
            भोजन सेवा
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btnStyle,
            { backgroundColor: selectedTab === 1 ? "#EB6611" : "#FFFFFF" },
          ]}
          onPress={() => setSelectedTab(1)}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color: selectedTab === 0 ? "#EB6611" : "#FFFFFF",
              },
            ]}
          >
            धर्म यात्रा
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Home;
