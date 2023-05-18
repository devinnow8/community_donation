import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
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
const BhandaraBookingPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState("11000");
  const [moneyErr, setMoneyErr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { params } = useRoute();
  const {
    name,
    phoneNumber,
    place,
    selectedDate,
    selectedTime,
    screenType,
  }: any = params;

  const PayMoney = (mode: string) => {
    if (screenType !== "DaanSewa" && Number(selectedAmount) < 11000) {
      setMoneyErr("* Amount should be above 11000rs *");
    } else if (mode === "CASH") {
      saveData(mode);
      setShowModal(true);
    } else if (mode === "ONLINE") {
      var options = {
        description: "Credits towards consultation",
        image: Paymenticon,
        currency: "INR",
        key: "rzp_test_CKghbIZojq126Q", // Your api key
        amount: (Number(selectedAmount) * 100).toString(),
        name: "'सब की सेवा, रब की सेवा' ट्रस्ट",
        prefill: {
          email: "void@razorpay.com",
          contact: "9191919191",
          name: "Razorpay Software",
        },
        theme: { color: "#FFF7E7" },
      };

      RazorpayCheckout.open(options)
        .then((data) => {
          // handle success

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
        .collection("Test5")
        .doc(selectedDate.timestamp.toString())
        .get()
        .then((data) => {
          firestore()
            .collection("Test5")
            .doc(selectedDate.timestamp.toString())
            .set({ [selectedTimeSlot]: currentData }, { merge: true })
            .then((res) => {
              setShowModal(true);
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
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
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
          placeholderTextColor="#949494"
          value={selectedAmount}
          onChangeText={(text: any) => setSelectedAmount(text)}
          onFocus={() => setMoneyErr("")}
        />
      </View>

      {/* moneyButtons */}
      <View style={styles.moneyButtonsContainer}>
        <TouchableOpacity
          onPress={() => [setSelectedAmount("21000"), setMoneyErr("")]}
          style={[
            styles.btnStyle,
            {
              backgroundColor: selectedAmount === "21000" ? "#EB6611" : "#FFF",
            },
          ]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              { color: selectedAmount === "21000" ? "#FFFFFF" : "#EB6611" },
            ]}
          >
            21,000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              backgroundColor: selectedAmount === "31000" ? "#EB6611" : "#FFF",
            },
          ]}
          onPress={() => [setSelectedAmount("31000"), setMoneyErr("")]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              { color: selectedAmount === "31000" ? "#FFFFFF" : "#EB6611" },
            ]}
          >
            31,000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => [setSelectedAmount("51000"), setMoneyErr("")]}
          style={[
            styles.btnStyle,
            {
              backgroundColor: selectedAmount === "51000" ? "#EB6611" : "#FFF",
            },
          ]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              { color: selectedAmount === "51000" ? "#FFFFFF" : "#EB6611" },
            ]}
          >
            51,000
          </Text>
        </TouchableOpacity>
      </View>

      {/* error Msg */}

      {moneyErr ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: "red" }}>{moneyErr}</Text>
        </View>
      ) : (
        <Text></Text>
      )}

      {/* paying Options */}

      <View style={styles.PayingButtonsContainer}>
        <TouchableOpacity
          style={[styles.payBtnStyle, { backgroundColor: "#EB6611" }]}
          onPress={() => [PayMoney("ONLINE"), Keyboard.dismiss()]}
        >
          <Text style={[styles.btnTextStyle, { color: "#FFFFFF" }]}>
            Pay Online
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.payBtnStyle, { backgroundColor: "#EB6611" }]}
          onPress={() => [PayMoney("CASH"), Keyboard.dismiss()]}
        >
          <Text style={[styles.btnTextStyle, { color: "#FFFFFF" }]}>
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
