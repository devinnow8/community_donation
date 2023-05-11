import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { getHeight, getWidth } from "../../utils/pixelConversion";
const BhandaraBookingPayment = () => {
  const [selectedAmount, setSelectedAmount] = useState("11000");
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
