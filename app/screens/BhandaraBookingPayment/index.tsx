import { Text, View, TouchableOpacity, Alert, Keyboard } from "react-native";
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
import { Colors } from "../../utils/colors";
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
        image:
          "https://firebasestorage.googleapis.com/v0/b/community-donation.appspot.com/o/Group%20434%20(1).png?alt=media&token=29d44072-a6ae-4fe5-9d3c-11b91c773b8c",
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
              backgroundColor:
                selectedAmount === "21000" ? Colors.PRIMARY : Colors.WHITE,
            },
          ]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color:
                  selectedAmount === "21000" ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            21,000
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnStyle,
            {
              backgroundColor:
                selectedAmount === "31000" ? Colors.PRIMARY : Colors.WHITE,
            },
          ]}
          onPress={() => [setSelectedAmount("31000"), setMoneyErr("")]}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color:
                  selectedAmount === "31000" ? Colors.WHITE : Colors.PRIMARY,
              },
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
        </TouchableOpacity>
      </View>

      {/* error Msg */}

      {moneyErr ? (
        <View style={styles.errorContainer}>
          <Text style={{ color: Colors.RED }}>{moneyErr}</Text>
        </View>
      ) : (
        <Text></Text>
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
