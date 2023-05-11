import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
const BhandaraBooking = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    place: "",
    otp: "",
    nameErrMsg: "",
    phoneErrMsg: "",
    placeErrMsg: "",
    otpErrMsg: "",
  });
  const route = useRoute();
  const navigation: any = useNavigation();
  const { time, date }: any = route.params;

  const SendOTP = () => {
    // Name Validation
    if (userInfo.name.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          nameErrMsg: "*Please Fill The Missing Field*",
        };
      });
    }
    // Phone number Validation
    const phoneReg = /[0-9]/;
    const validatePhoneNumber = phoneReg.test(userInfo.phoneNumber);
    if (userInfo.phoneNumber.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "*Please Fill The Missing Field*",
        };
      });
    } else if (userInfo.phoneNumber.length === 10 && validatePhoneNumber) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "",
        };
      });
    } else if (!validatePhoneNumber) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "*Phone number should be number digits*",
        };
      });
    } else {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "*Phone number should be 10 digits*",
        };
      });
    }
    // placeValidation
    if (userInfo.place.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          placeErrMsg: "*Please Fill The Missing Field*",
        };
      });
    }
    // otp Validation
    if (userInfo.otp.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          otpErrMsg: "*Please Fill The Missing Field*",
        };
      });
    } else if (userInfo.otp.length === 6) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          otpErrMsg: "",
        };
      });
    } else {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          otpErrMsg: "*Invalid OTP*",
        };
      });
    }
    navigation.navigate("BhandaraBookingPayment");
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* headerBar */}
      <View>
        <HeaderBar hasBackButton={true} headingText="भंडारा बुकिंग" />
      </View>

      {/* Date Field */}
      <View style={styles.bookingDateContainer}>
        <Text style={styles.bookingDateText}>{`${date} ${time}`}</Text>
      </View>

      {/* formFields */}
      <View>
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
      {userInfo.nameErrMsg ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: "red" }}>{userInfo.nameErrMsg}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
      <View>
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
      {userInfo.phoneErrMsg ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: "red" }}>{userInfo.phoneErrMsg}</Text>
        </View>
      ) : (
        <Text></Text>
      )}
      <View>
        <Labels labelName="स्थान" />
      </View>

      <View>
        <TextInputs
          onChangeText={(val: string) =>
            setUserInfo((prevState) => {
              return {
                ...prevState,
                place: val,
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
      {userInfo.placeErrMsg ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: "red" }}>{userInfo.placeErrMsg}</Text>
        </View>
      ) : (
        <Text></Text>
      )}

      <View>
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
                otpErrMsg: "",
              };
            })
          }
        />
      </View>

      {userInfo.otpErrMsg ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: "red" }}>{userInfo.otpErrMsg}</Text>
        </View>
      ) : (
        <Text></Text>
      )}

      {/* confirmButton */}
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => [SendOTP(), Keyboard.dismiss()]}
      >
        <Text style={styles.btnTextStyle}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BhandaraBooking;

const styles = StyleSheet.create({
  btnTextStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    color: "#FFFFFF",
  },
  btnStyle: {
    backgroundColor: "#EB6611",
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  errorContainer: {
    marginHorizontal: getWidth(34),
    marginBottom: getHeight(30),
  },
  bookingDateContainer: {
    marginHorizontal: getWidth(35),
    marginVertical: getHeight(30),
  },
  bookingDateText: {
    fontSize: 20,
    fontWeight: "400",
  },
});
