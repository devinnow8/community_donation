import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { getHeight } from "../../utils/pixelConversion";

import CustomModal from "../../ReusableComponents/Modal";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { Colors } from "../../utils/colors";
import axios from "axios";

const YatraBooking = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    otp: "",
    nameErrMsg: "",
    phoneErrMsg: "",
    placeErrMsg: "",
  });
  const { params }: any = useRoute();
  const { yatraDetails, numberOfSeats } = params;
  const [confirm, setConfirm] = useState<any>(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(false);
  const [adminFBdetail, setAdminFBdetail] = useState<any>({});
  useEffect(() => {
    getAdminDetail();
  }, []);
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
  const sendOTP = async () => {
    let validate = true;
    if (userInfo.name?.length === 0) {
      validate = false;
      setUserInfo((prevState) => {
        return {
          ...prevState,
          nameErrMsg: "Please Fill The Missing Field",
        };
      });
    }
    if (userInfo.phoneNumber?.length === 0) {
      validate = false;
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "Please Fill The Missing Field",
        };
      });
    } else if (userInfo.phoneNumber?.length < 10) {
      validate = false;
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "Phone Number should be 10 digits",
        };
      });
    }

    if (validate) {
      setLoaderVisible(true);
      const confirmation = await auth().signInWithPhoneNumber(
        "+91" + userInfo.phoneNumber
      );
      if (confirmation) {
        setLoaderVisible(false);
        setShowOtpField(true);
        setConfirm(confirmation);
      }
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
                axios
                  .post("http://13.233.123.182:4000/api/v1/seva/notify", {
                    groupId: adminFBdetail.topicId,
                    messageToShow: `${userInfo.name} booked ${numberOfSeats} seats for upcoming Yatra`,
                    title: "Yatra Booked",
                  })
                  .then((res) => {
                    console.log("Response", res);
                  })
                  .catch((err) => console.log("Err", err));
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
          keyboardType="number-pad"
          onChangeText={(val: string) => {
            let regex = /^[0-9]+$/;
            if (regex.test(val) || val === "") {
              setUserInfo((prevState) => {
                return {
                  ...prevState,
                  phoneNumber: val,
                };
              });
            }
          }}
          onFocus={() => {
            setUserInfo((prevState) => {
              return {
                ...prevState,
                phoneErrMsg: "",
              };
            });
          }}
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
              keyboardType="number-pad"
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
