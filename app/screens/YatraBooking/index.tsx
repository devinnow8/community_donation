import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { getHeight } from "../../utils/pixelConversion";

import CustomModal from "../../ReusableComponents/Modal";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { Colors } from "../../utils/colors";

const YatraBooking = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
    nameErrMsg: "",
    phoneErrMsg: "",
    placeErrMsg: "",
  });
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const { yatraDetails, numberOfSeats } = params;
  const [confirm, setConfirm] = useState<any>(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(false);
  const sendOTP = async () => {
    setLoaderVisible(true);
    const confirmation = await auth().signInWithPhoneNumber(
      "+91" + userInfo.phoneNumber
    );
    if (confirmation) {
      setLoaderVisible(false);
      setShowOtpField(true);
      setConfirm(confirmation);
    }
  };

  const Confirm = async () => {
    setLoaderVisible(true);
    try {
      const response = await confirm?.confirm(userInfo.otp);

      if (response) {
        const timeStamp = moment(yatraDetails?.date).valueOf();
        firestore()
          .collection("Yatra")
          .doc(timeStamp.toString())
          .get()
          .then((data: any) => {
            let newData = data?._data;
            let seatData = [];
            if (newData?.seatData) {
              seatData = newData.seatData;
            }
            newData.availableSeats = newData.availableSeats - numberOfSeats;
            seatData = [
              ...seatData,
              {
                name: userInfo.name,
                phoneNumber: userInfo.phoneNumber,
                numberOfSeats,
                id: new Date().valueOf(),
              },
            ];
            newData.seatData = seatData;
            firestore()
              .collection("Yatra")
              .doc(timeStamp.toString())
              .set(newData, { merge: true })
              .then((res) => {
                setLoaderVisible(false);
                // setShowModal(true);
                setShowThanksModal(true);
              })
              .catch((err) => {
                setLoaderVisible(false);
                // console.log("Error", err);
              });
          })
          .catch(() => {
            setLoaderVisible(false);
            Alert.alert("Error fetching collections");
          });
      }
    } catch (error) {
      setLoaderVisible(false);
      // console.log("Error", error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* headerBar */}
      <View>
        <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      </View>

      {/* formFields */}
      <View style={{ marginTop: getHeight(20) }}>
        <Labels labelName="नाम" />
      </View>

      <View>
        <TextInputs
          onChangeText={(val: string) =>
            setUserInfo((prevState) => {
              return {
                ...prevState,
                name: val,
              };
            })
          }
          onFocus={() =>
            setUserInfo((prevState) => {
              return {
                ...prevState,
                nameErrMsg: "",
              };
            })
          }
        />
      </View>
      {userInfo.nameErrMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{userInfo.nameErrMsg}</Text>
        </View>
      )}
      <View style={{ marginTop: getHeight(20) }}>
        <Labels labelName="फ़ोन नंबर" />
      </View>

      <View>
        <TextInputs
          onChangeText={(val: string) =>
            setUserInfo((prevState) => {
              return {
                ...prevState,
                phoneNumber: val,
              };
            })
          }
          onFocus={() =>
            setUserInfo((prevState) => {
              return {
                ...prevState,
                phoneErrMsg: "",
              };
            })
          }
          maxLength={10}
        />
      </View>
      {userInfo.phoneErrMsg && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{userInfo.phoneErrMsg}</Text>
        </View>
      )}
      {showOtpField && (
        <>
          <View style={{ marginTop: getHeight(20) }}>
            <Labels labelName="OTP" />
          </View>

          <View>
            <TextInputs
              onChangeText={(val: string) =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    otp: val,
                  };
                })
              }
              onFocus={() =>
                setUserInfo((prevState) => {
                  return {
                    ...prevState,
                    placeErrMsg: "",
                  };
                })
              }
            />
          </View>

          {userInfo.placeErrMsg && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{userInfo.placeErrMsg}</Text>
            </View>
          )}
        </>
      )}

      {/* confirmButton */}
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => {
          Keyboard.dismiss();
          showOtpField ? Confirm() : sendOTP();
        }}
      >
        {isLoaderVisible ? (
          <ActivityIndicator size={"small"} color={"#ffffff"} />
        ) : (
          <Text style={styles.btnTextStyle}>
            {showOtpField ? "Confirm" : "Send OTP"}
          </Text>
        )}
      </TouchableOpacity>
      <CustomModal
        setIsVisible={setShowThanksModal}
        isVisible={showThanksModal}
        title={"जय माता बालासुंदरी"}
        message={"आपकी यात्रा मंगलमय रहे"}
        navigationScreen="Home"
      />
    </View>
  );
};

export default YatraBooking;
