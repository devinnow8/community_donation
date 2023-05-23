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
import firestore from "@react-native-firebase/firestore";

const AdminLogin = () => {
  const navigation: any = useNavigation();
  const [adminInfo, setAdminInfo] = useState({
    adminName: "",
    adminPassword: "",
    errMsg: "",
  });

  const [showButtons, setShowButtons] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const [adminFBdetail, setAdminFBdetail] = useState({
    adminName: "",
    adminPassword: "",
  });
  useEffect(() => {
    getAdminDetail();
  }, []);

  const getAdminDetail = () => {
    firestore()
      .collection("adminLogin")
      .doc("Admin")
      .get()
      .then(({ _data }: any) => {
        setAdminFBdetail(() => {
          return {
            adminName: _data.userName,
            adminPassword: _data.password,
          };
        });
      })
      .catch(() => {
        Alert.alert("Error fetching collections");
      });
  };

  const adminLogin = () => {
    if (
      adminInfo.adminName === adminFBdetail.adminName &&
      adminInfo.adminPassword === adminFBdetail.adminPassword
    ) {
      setShowButtons(true);
      setAdminInfo({
        ...adminInfo,
        errMsg: "",
      });
    } else {
      setAdminInfo({
        ...adminInfo,
        errMsg: "UserName or password may be incorrect",
      });
    }
  };

  return (
    <View style={styles.adminLoginContainer}>
      <HeaderBar headingText="भंडारा बुकिंग" hasBackButton={true} />
      <View style={styles.idLabelContainer}>
        <Labels labelName="ID नंबर " />
      </View>
      <View>
        <TextInputs
          onChangeText={(val) => setAdminInfo({ ...adminInfo, adminName: val })}
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
      {adminInfo.errMsg?.length > 0 ? (
        <View style={styles.errMsgContainer}>
          <Text style={styles.errMsgText}>{adminInfo.errMsg}</Text>
        </View>
      ) : (
        ""
      )}

      {/* {selectedTab === 0 ? <TabView1 /> : <TabView2 />} */}
      <TouchableOpacity
        style={[
          styles.btnStyle,
          {
            backgroundColor:
              adminInfo.adminName?.length != 0 &&
              adminInfo.adminPassword?.length != 0
                ? "#EB6611"
                : "transparent",
          },
        ]}
        // onLongPress={() => {
        //   navigation.navigate("AdminYatra");
        // }}
        onPress={() => [adminLogin(), Keyboard.dismiss()]}
      >
        <Text
          style={[
            styles.btnTextStyle,
            {
              color:
                adminInfo.adminName?.length != 0 &&
                adminInfo.adminPassword?.length != 0
                  ? "#FFF"
                  : "#EB6611",
            },
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>

      {showButtons && (
        <View>
          <View style={styles.adminLoginButtonView}>
            <Pressable
              style={[
                styles.adminButtonView,
                {
                  backgroundColor:
                    selectedTab === 0 ? "#EB6611" : "transparent",
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
                    color: selectedTab === 0 ? "#FFF" : "#EB6611",
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
                    selectedTab === 1 ? "#EB6611" : "transparent",
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
                    color: selectedTab === 1 ? "#FFF" : "#EB6611",
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
                    selectedTab === 2 ? "#EB6611" : "transparent",
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
                    color: selectedTab === 2 ? "#FFF" : "#EB6611",
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
