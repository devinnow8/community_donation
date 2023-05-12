import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const AdminYatra = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <View style={{ marginTop: 35 }}>
        <Labels labelName="Name" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={{ marginTop: 13 }}>
        <Labels labelName="Date" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={{ marginTop: 13 }}>
        <Labels labelName="Onboarding point" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={{ marginTop: 13 }}>
        <Labels labelName="TIme of Departure" />
      </View>
      <View>
        <TextInputs />
      </View>
      <View style={{ marginTop: 13 }}>
        <Labels labelName="Seats" />
      </View>
      <View>
        <TextInputs />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#EB6611",
          marginHorizontal: getWidth(110),
          marginVertical: getHeight(40),
          height: getHeight(40),
          width: getWidth(154),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
        onPress={() => {}}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminYatra;

const styles = StyleSheet.create({});
