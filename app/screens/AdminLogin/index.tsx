import {
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import firestore, { firebase } from "@react-native-firebase/firestore";
import messaging from "@react-native-firebase/messaging";
import { Colors } from "../../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminLogin = () => {
  const navigation: any = useNavigation();

  const [adminInfo, setAdminInfo] = useState({
    adminName: "",
    adminPassword: "",
    errMsg: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [adminFBdetail, setAdminFBdetail] = useState<any>({});
  const getAsyncData = async () => {
    const value = await AsyncStorage.getItem("isLoggedIn");
    console.log("Value Value", value);
    if (value === "true") {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    getAdminDetail();
    getAsyncData();
  }, []);
  const storeData = (value: any) => {
    AsyncStorage.setItem("isLoggedIn", value.toString())
      .then((res) => {
        setIsLoggedIn(value);
      })
      .catch((err) => console.log("Error", err));
  };
  const getAdminDetail = () => {
    firestore()
      .collection("adminLogin")
      .doc("Admin")
      .get()
      .then(({ _data }: any) => {
        setAdminFBdetail(_data);
      })
      .catch(() => {
        Alert.alert("Error fetching collections");
      });
  };

  const adminLogin = async () => {
    if (
      adminInfo.adminName === adminFBdetail.userName &&
      adminInfo.adminPassword === adminFBdetail.password
    ) {
      setShowButtons(true);
      setAdminInfo({
        ...adminInfo,
        errMsg: "",
      });
      subscribeTopic();
      setIsLoggedIn(true);
      storeData(true);
    } else {
      setAdminInfo({
        ...adminInfo,
        errMsg: "UserName or password may be incorrect",
      });
    }
  };

  const subscribeTopic = async () => {
    messaging()
      .subscribeToTopic(adminFBdetail.topicId)
      .then((res) => console.log("Subscribed to topic!", res))
      .catch((Error) => console.log("ErrorError", Error));
  };

  return (
    <View style={styles.adminLoginContainer}>
      <HeaderBar headingText="भंडारा बुकिंग" hasBackButton={true} />
      {!isLoggedIn ? (
        <>
          <View style={styles.idLabelContainer}>
            <Labels labelName="ID नंबर " />
          </View>
          <View>
            <TextInputs
              onChangeText={(val) =>
                setAdminInfo({ ...adminInfo, adminName: val })
              }
            />
          </View>
          <View style={styles.passwordContainer}>
            <Labels labelName="पासवर्ड" />
          </View>
          <View>
            <TextInputs
              secureTextEntry={true}
              onFocus={() =>
                setAdminInfo((prevState): any => {
                  return {
                    ...prevState,
                    errMsg: "",
                  };
                })
              }
              onChangeText={(val) =>
                setAdminInfo({ ...adminInfo, adminPassword: val })
              }
            />
          </View>

          {/* errorMessage */}
          {adminInfo.errMsg?.length > 0 && (
            <View style={styles.errMsgContainer}>
              <Text style={styles.errMsgText}>{adminInfo.errMsg}</Text>
            </View>
          )}

          {/* {selectedTab === 0 ? <TabView1 /> : <TabView2 />} */}
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                backgroundColor:
                  adminInfo.adminName?.length != 0 &&
                  adminInfo.adminPassword?.length != 0
                    ? Colors.PRIMARY
                    : "transparent",
              },
            ]}
            onPress={() => [adminLogin(), Keyboard.dismiss()]}
          >
            <Text
              style={[
                styles.btnTextStyle,
                {
                  color:
                    adminInfo.adminName?.length != 0 &&
                    adminInfo.adminPassword?.length != 0
                      ? Colors.WHITE
                      : Colors.PRIMARY,
                },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <TouchableOpacity
            style={[styles.btnStyle]}
            onPress={() => {
              storeData(false);
              messaging()
                .unsubscribeFromTopic(adminFBdetail.topicId)
                .then(() => console.log("Unsubscribed fom the topic!"));
            }}
          >
            <Text style={styles.btnTextStyle}>Logout</Text>
          </TouchableOpacity>
          <View style={styles.adminLoginButtonView}>
            <Pressable
              style={[
                styles.adminButtonView,
                {
                  backgroundColor:
                    selectedTab === 0 ? Colors.PRIMARY : "transparent",
                },
              ]}
              onPress={() => [
                navigation.navigate("AdminBhandara"),
                setSelectedTab(0),
              ]}
            >
              <Text
                style={[
                  styles.btnTextStyle,
                  {
                    color: selectedTab === 0 ? Colors.WHITE : Colors.PRIMARY,
                  },
                ]}
              >
                भोजन सेवा
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.adminButtonView,
                {
                  backgroundColor:
                    selectedTab === 1 ? Colors.PRIMARY : "transparent",
                },
              ]}
              onPress={() => [
                navigation.navigate("AdminBookingDetail"),
                setSelectedTab(1),
              ]}
            >
              <Text
                style={[
                  styles.btnTextStyle,
                  {
                    color: selectedTab === 1 ? Colors.WHITE : Colors.PRIMARY,
                  },
                ]}
              >
                धर्म यात्रा
              </Text>
            </Pressable>
          </View>
          <View style={styles.adminDonationBtnOuterContainer}>
            <Pressable
              style={[
                styles.adminDonationButtonView,
                {
                  backgroundColor:
                    selectedTab === 2 ? Colors.PRIMARY : "transparent",
                },
              ]}
              onPress={() => [
                navigation.navigate("AdminDonationCollection"),
                setSelectedTab(2),
              ]}
            >
              <Text
                style={[
                  styles.btnTextStyle,
                  {
                    color: selectedTab === 2 ? Colors.WHITE : Colors.PRIMARY,
                  },
                ]}
              >
                दान सेवा
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

export default AdminLogin;
