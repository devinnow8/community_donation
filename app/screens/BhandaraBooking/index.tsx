import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import moment from "moment";
import styles from "./styles";
import { getHeight } from "../../utils/pixelConversion";
import upHeadIcon from "../../assets/images/upHeadIcon.png";
import downHeadIcon from "../../assets/images/downHeadIcon.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../utils/colors";
import firestore from "@react-native-firebase/firestore";
const BhandaraBooking = () => {
  const [confirm, setConfirm] = useState<any>(null);
  const [showOtpField, setShowOtpField] = useState(false);
  const [showDropDown, setShowUpDown] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(false);
  const [adminPhoneNumber, setAdminPhoneNumber] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    place: "",
    address: "",
    otp: "",
    nameErrMsg: "",
    phoneErrMsg: "",
    placeErrMsg: "",
    addressErrMsg: "",
    otpErrMsg: "",
  });
  const route = useRoute();
  const navigation: any = useNavigation();
  const date: any = route.params?.date;
  const time: any = route.params?.time;
  const screenType: any = route.params?.screenType;

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

  const SendOTP = () => {
    // Name Validation
    let error = false;
    if (userInfo.name.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          nameErrMsg: "*Please Fill The Missing Field*",
        };
      });
      error = true;
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
      error = true;
    } else if (userInfo.phoneNumber.length === 10 && validatePhoneNumber) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "",
        };
      });
      // error = false;
    } else if (!validatePhoneNumber) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "*Phone number should be number digits*",
        };
      });
      error = true;
    } else {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          phoneErrMsg: "*Phone number should be 10 digits*",
        };
      });
      error = true;
    }
    // placeValidation
    if (screenType !== "DaanSewa" && userInfo.place?.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          placeErrMsg: "*Please Fill The Missing Field*",
        };
      });
      error = true;
    }
    // Address Validation
    if (screenType !== "DaanSewa" && userInfo.address?.length === 0) {
      setUserInfo((prevState) => {
        return {
          ...prevState,
          addressErrMsg: "*Please Fill The Missing Field*",
        };
      });
      error = true;
    }
    if (!error) {
      setLoaderVisible(true);
      sendOTP();
    }

    // otp Validation
    // if (userInfo.otp.length === 0) {
    //   setUserInfo((prevState) => {
    //     return {
    //       ...prevState,
    //       otpErrMsg: "*Please Fill The Missing Field*",
    //     };
    //   });
    // } else if (userInfo.otp.length === 6) {
    //   setUserInfo((prevState) => {
    //     return {
    //       ...prevState,
    //       otpErrMsg: "",
    //     };
    //   });
    // } else {
    //   setUserInfo((prevState) => {
    //     return {
    //       ...prevState,
    //       otpErrMsg: "*Invalid OTP*",
    //     };
    //   });
    // }
  };
  const sendOTP = async () => {
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
        let params;
        params = {
          name: userInfo.name,
          phoneNumber: userInfo.phoneNumber,
        };
        if (screenType !== "DaanSewa") {
          params = {
            ...params,
            place: userInfo?.address + " " + userInfo?.place,
            selectedDate: date,
            selectedTime: time,
          };
        } else {
          params = {
            ...params,
            screenType: "DaanSewa",
          };
        }
        setLoaderVisible(false);
        navigation.navigate("BhandaraBookingPayment", params);
      }
    } catch (error) {
      setLoaderVisible(false);
      Alert.alert("OTP is invalid ", "Please Enter Valid OTP !!");
    }
  };
  const dropDownItems = [
    {
      id: 1,
      itemName: "Chandigarh",
    },
    {
      id: 2,
      itemName: "Panchkula",
    },
    {
      id: 3,
      itemName: "Mohali",
    },
    {
      id: 4,
      itemName: "Zirakpur",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* headerBar */}
      <View>
        <HeaderBar
          hasBackButton={true}
          headingText={screenType !== "DaanSewa" ? "भंडारा बुकिंग" : "दान सेवा"}
        />
      </View>

      {/* Date Field */}
      {screenType !== "DaanSewa" && (
        <View style={styles.bookingDateContainer}>
          <Text style={styles.bookingDateText}>{`${moment(
            date.dateString
          ).format("dddd, DD MMM yyyy")} (${
            time === 0 ? "11:00  AM" : "12:30 PM"
          })`}</Text>
        </View>
      )}

      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
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
            <Text style={styles.errorText}>{userInfo.nameErrMsg}</Text>
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
            keyboardType="number-pad"
          />
        </View>
        {userInfo.phoneErrMsg ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{userInfo.phoneErrMsg}</Text>
          </View>
        ) : (
          <Text></Text>
        )}
        {screenType !== "DaanSewa" && (
          <>
            <View>
              <Labels labelName="शहर" />
            </View>

            <TouchableOpacity
              onPress={() => setShowUpDown(!showDropDown)}
              style={[
                styles.textInputContainer,
                showDropDown && {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
            >
              <Text style={{ color: Colors.BLACK }}>{userInfo.place}</Text>
              <Image
                source={showDropDown ? upHeadIcon : downHeadIcon}
                style={styles.upDownArrow}
              />
            </TouchableOpacity>
            {showDropDown && (
              <View style={styles.dropDownOuterContainer}>
                <FlatList
                  data={dropDownItems}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: Colors.TEXT_INPUT_BORDER_COLOR,
                      }}
                      key={item.id}
                    >
                      <TouchableOpacity
                        style={styles.dropDownItemsContainer}
                        onPress={() => {
                          setShowUpDown(false);
                          setUserInfo((prevState) => {
                            return {
                              ...prevState,
                              place: item.itemName,
                            };
                          });
                        }}
                      >
                        <Text style={{ color: Colors.BLACK }}>
                          {item.itemName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            )}
            {userInfo.place?.length === 0 && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{userInfo.placeErrMsg}</Text>
              </View>
            )}

            <View style={{ marginTop: getHeight(20) }}>
              <Labels
                labelColor={
                  userInfo.place?.length !== 0
                    ? Colors.PRIMARY
                    : Colors.TEXT_INPUT_BORDER_COLOR
                }
                labelName="स्थान"
              />
            </View>

            <View>
              <TextInputs
                editable={userInfo.place?.length !== 0 ? true : false}
                multiline
                textInputStyles={{
                  height: getHeight(80),
                  textAlignVertical: "top",
                }}
                onChangeText={(val: string) =>
                  setUserInfo((prevState) => {
                    return {
                      ...prevState,
                      address: val,
                    };
                  })
                }
                onFocus={() =>
                  setUserInfo((prevState) => {
                    return {
                      ...prevState,
                      addressErrMsg: "",
                    };
                  })
                }
              />
            </View>
            {userInfo.addressErrMsg?.length > 0 && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{userInfo.placeErrMsg}</Text>
              </View>
            )}
          </>
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
                      otpErrMsg: "",
                    };
                  })
                }
                keyboardType="number-pad"
              />
            </View>
            {userInfo.otpErrMsg && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{userInfo.otpErrMsg}</Text>
              </View>
            )}
          </>
        )}

        {/* confirmButton */}
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            Keyboard.dismiss();
            if (!showOtpField) {
              SendOTP();
            } else {
              Confirm();
            }
          }}
        >
          {isLoaderVisible ? (
            <ActivityIndicator size={"small"} color={"#ffffff"} />
          ) : (
            <Text style={styles.btnTextStyle}>
              {!showOtpField ? "Send OTP" : "Confirm"}
            </Text>
          )}
        </TouchableOpacity>
        {screenType === "DaanSewa" && (
          <TouchableOpacity onPress={() => openDialScreen()}>
            <Text style={styles.adminContactText}>
              अधिक जानकारी के लिए संपर्क करें
            </Text>
            <Text style={styles.adminContactTextNumber}>
              {adminPhoneNumber}
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default BhandaraBooking;
