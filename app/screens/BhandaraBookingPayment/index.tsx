import { Text, View, TouchableOpacity, Alert, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";
import CustomModal from "../../ReusableComponents/Modal";
import styles from "./styles";
import RazorpayCheckout from "react-native-razorpay";
import { Paymenticon } from "../../assets/images/PaymentIcon";
import moment from "moment";
import { Colors } from "../../utils/colors";
import axios from "axios";
const BhandaraBookingPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState("11000");
  const [moneyErr, setMoneyErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adminFBdetail, setAdminFBdetail] = useState<any>({});

  const { params } = useRoute();
  const {
    name,
    phoneNumber,
    place,
    selectedDate,
    selectedTime,
    screenType,
  }: any = params;
  useEffect(() => {
    getAdminDetail();
  }, []);
  const PayMoney = (mode: string) => {
    if (screenType !== "DaanSewa" && Number(selectedAmount) < 11000) {
      setMoneyErr("* Amount should be above 11000rs *");
    } else if (mode === "CASH") {
      saveData(mode);
      setShowModal(true);
    } else if (mode === "ONLINE") {
      var options = {
        description: "Credits towards consultation",
        image:
          "https://firebasestorage.googleapis.com/v0/b/sabki-sewa-rabki-sewa-6fa5f.appspot.com/o/AppIcon.png?alt=media&token=aba97599-1e68-4d8c-a1eb-e8ef160b0328",
        currency: "INR",
        key: "rzp_test_CKghbIZojq126Q", // Your api key
        amount: (Number(selectedAmount) * 100).toString(),
        name: "'सब की सेवा, रब की सेवा' ट्रस्ट",
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Razorpay Software",
        },
        theme: { color: Colors.SECONDARY },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          saveData("ONLINE");
          setShowModal(true);
          // alert(`Success: ${data.razorpay_payment_id}`);
        })
        .catch((error) => {
          // handle failure
          // alert(`Error: ${error.code} | ${error.description}`);
        });
    }
  };

  const saveData = async (mode: String) => {
    const selectedTimeSlot = selectedTime === 0 ? "firstSlot" : "secondSlot";

    if (screenType === "DaanSewa") {
      const daanSewaData = {
        name,
        phoneNumber,
        amount: selectedAmount,
        mode,
        selectedDate: moment(new Date()).format("DD-MM-YYYY"),
        timeStamp: new Date().valueOf(),
      };

      firestore()
        .collection("DaanSewa")
        .doc()
        .set(daanSewaData)
        .then((res) => console.log("res====>", res));
    } else {
      const currentData = {
        name,
        phoneNumber,
        place,
        selectedDate: selectedDate.dateString,
        selectedTime: selectedTimeSlot,
        amount: selectedAmount,
        mode,
        timeStamp: selectedDate.timestamp,
        status: mode === "CASH" ? "Pending" : "Completed",
      };
      firestore()
        .collection("Bandhara Booking")
        .doc(selectedDate.timestamp.toString())
        .get()
        .then((data) => {
          firestore()
            .collection("Bandhara Booking")
            .doc(selectedDate.timestamp.toString())
            .set(
              {
                timeStamp: selectedDate.timestamp,
                [selectedTimeSlot]: currentData,
              },
              { merge: true }
            )
            .then((res) => {
              setShowModal(true);
              axios
                .post("http://13.233.123.182:4000/api/v1/seva/notify", {
                  groupId: adminFBdetail.topicId,
                  messageToShow: `${name} booked Bhandara on ${moment(
                    selectedDate.timestamp
                  ).format("DD-MM-YYYY")} at ${
                    selectedTimeSlot === "firstSlot" ? "11:00 AM" : "12:30 PM"
                  }`,
                  title: "Bhandara Booked",
                })
                .then((res) => {
                  console.log("Response", res);
                })
                .catch((err) => console.log("Err", err));
            })
            .catch((err) => {
              // console.log("Error", err);
            });
        })
        .catch(() => {
          Alert.alert("Error fetching collections");
        });
    }
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
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* headerBar */}
      <View>
        <HeaderBar hasBackButton={true} headingText="भंडारा बुकिंग" />
      </View>

      {/* paymentField */}
      <View style={styles.paymentFieldContainer}>
        <Labels labelName="राशि" />
      </View>

      <View>
        <TextInputs
          placeholder={selectedAmount}
          placeholderTextColor={Colors.GRAY}
          value={selectedAmount}
          onChangeText={(text: any) => {
            let regex = /^[0-9]+$/;
            if (regex.test(text) || text === "") {
              setSelectedAmount(text);
            }
          }}
          keyboardType="numeric"
          onFocus={() => setMoneyErr("")}
          editable={screenType === "DaanSewa"}
        />
      </View>

      {/* moneyButtons */}
      <View style={styles.moneyButtonsContainer}>
        <TouchableOpacity
          onPress={() => [setSelectedAmount("11000"), setMoneyErr("")]}
          style={[
            styles.btnStyle,
            {
              backgroundColor:
                selectedAmount === "11000" ? Colors.PRIMARY : Colors.WHITE,
            },
          ]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color:
                  selectedAmount === "11000" ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            11,000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              backgroundColor:
                selectedAmount === "13000" ? Colors.PRIMARY : Colors.WHITE,
            },
          ]}
          onPress={() => [setSelectedAmount("13000"), setMoneyErr("")]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color:
                  selectedAmount === "13000" ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            13,000
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => [setSelectedAmount("51000"), setMoneyErr("")]}
          style={[
            styles.btnStyle,
            {
              backgroundColor:
                selectedAmount === "51000" ? Colors.PRIMARY : Colors.WHITE,
            },
          ]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color:
                  selectedAmount === "51000" ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            51,000
          </Text>
        </TouchableOpacity> */}
      </View>
      {screenType !== "DaanSewa" && (
        <View style={styles.halwa_Container}>
          <Text style={styles.halwa_TextStyle}>साथ में हलवे का प्रसाद</Text>
        </View>
      )}

      {/* error Msg */}

      {moneyErr && (
        <View style={styles.errorContainer}>
          <Text style={{ color: Colors.RED }}>{moneyErr}</Text>
        </View>
      )}

      {/* paying Options */}

      <View style={styles.PayingButtonsContainer}>
        <TouchableOpacity
          style={[styles.payBtnStyle, { backgroundColor: Colors.PRIMARY }]}
          onPress={() => [PayMoney("ONLINE"), Keyboard.dismiss()]}
        >
          <Text style={[styles.btnTextStyle, { color: Colors.WHITE }]}>
            Pay Online
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.payBtnStyle, { backgroundColor: Colors.PRIMARY }]}
          onPress={() => [PayMoney("CASH"), Keyboard.dismiss()]}
        >
          <Text style={[styles.btnTextStyle, { color: Colors.WHITE }]}>
            Pay Cash
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal  */}

      <CustomModal
        isVisible={showModal}
        setIsVisible={() => setShowModal(false)}
        message="भगवान् आपकी मनोकामना पूरी करे"
        navigationScreen="Home"
      />
    </View>
  );
};

export default BhandaraBookingPayment;
