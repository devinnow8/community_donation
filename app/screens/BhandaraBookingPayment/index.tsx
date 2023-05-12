import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/native";

const BhandaraBookingPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState("11000");
  const { params } = useRoute();
  const { name, phoneNumber, place, selectedDate, selectedTime } = params;
  const saveData = async (mode: String) => {
    const currentData = {
      name,
      phoneNumber,
      place,
      selectedDate: selectedDate.dateString,
      selectedTime,
      amount: selectedAmount,
      mode,
      status: mode === "CASH" ? "Pending" : "Completed",
    };
    firestore()
      .collection("Test3")
      .doc(selectedDate.timestamp.toString())
      .get()
      .then((data) => {
        console.log("Getting Data from Collection", data._exists);
        let newData = [currentData];
        if (data._exists) {
          newData = [...newData, data._data];
        }
        firestore()
          .collection("Test3")
          .doc(selectedDate.timestamp.toString())
          .set({ [selectedTime]: newData }, { merge: true })
          .then((res) => {
            console.log("Response after adding new data", res);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      })
      .catch(() => {
        Alert.alert("Error fetching collections");
      })
      .finally(() => {
        // dispatch(setLoader(false));
      });
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
        <TextInputs placeholder="11000" placeholderTextColor="#949494" />
      </View>

      {/* moneyButtons */}
      <View style={styles.moneyButtonsContainer}>
        <TouchableOpacity
          onPress={() => setSelectedAmount("21000")}
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
          onPress={() => setSelectedAmount("31000")}
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
          onPress={() => setSelectedAmount("51000")}
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

      {/* paying Options */}

      <View style={styles.moneyButtonsContainer}>
        <TouchableOpacity
          style={[styles.payBtnStyle, { backgroundColor: "#EB6611" }]}
        >
          <Text style={[styles.btnTextStyle, { color: "#FFFFFF" }]}>
            Pay Online
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => saveData("CASH")}
          style={[styles.payBtnStyle, { backgroundColor: "#EB6611" }]}
        >
          <Text style={[styles.btnTextStyle, { color: "#FFFFFF" }]}>
            Pay Cash
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BhandaraBookingPayment;

const styles = StyleSheet.create({
  paymentFieldContainer: {
    marginTop: getHeight(35),
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    color: "#EB6611",
    paddingVertical: getHeight(10),
    paddingHorizontal: getWidth(20),
  },
  btnStyle: {
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(45),
    width: getWidth(93),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#EB6611",
    borderWidth: 1,
  },
  moneyButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: getWidth(30),
  },
  payBtnStyle: {
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(45),
    width: getWidth(146),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "#EB6611",
    borderWidth: 1,
  },
});
