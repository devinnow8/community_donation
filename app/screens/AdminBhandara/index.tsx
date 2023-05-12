import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { Calendar } from "react-native-calendars";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import moment from "moment";

const AdminBhandara = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <>
      <HeaderBar headingText="भंडारा बुकिंग" hasBackButton={true} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#FFF" }}
      >
        <View style={{ backgroundColor: "white" }}>
          <Calendar
            minDate={new Date().toString()}
            style={{}}
            theme={{}}
            renderArrow={(res) => {
              return (
                <View
                  style={{
                    backgroundColor: "#FFF7E7",
                    height: getHeight(35),
                    width: getWidth(35),
                    borderRadius: 35 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={
                      res === "left"
                        ? require("../../assets/images/LeftIcon.png")
                        : require("../../assets/images/RightIcon.png")
                    }
                  />
                </View>
              );
            }}
            date={selectedDate}
            onDayPress={(res) => {
              setSelectedDate(res.dateString);
            }}
            dayComponent={(res: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(res.date?.dateString);
                  }}
                  style={[
                    {
                      height: getHeight(37),
                      width: getWidth(37),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 37 / 2,
                      backgroundColor:
                        res.state === "disabled"
                          ? "white"
                          : selectedDate === res.date?.dateString
                          ? "#EB6611"
                          : "#FFF7E7",
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        res.state === "disabled"
                          ? "black"
                          : selectedDate === res.date?.dateString
                          ? "white"
                          : "#EB6611",
                    }}
                  >
                    {res.date.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {selectedDate !== "" && (
          <View style={{ paddingBottom: 50 }}>
            {[1, 2]?.map((item) => (
              <View
                style={{
                  backgroundColor: "#FFF8F3",
                  marginHorizontal: 24,
                  borderRadius: 7,
                  paddingVertical: 14,
                  shadowColor: "grey",
                  shadowOffset: { height: 10, width: 0 },
                  shadowRadius: 5,
                  shadowOpacity: 0.2,
                  marginTop: 20,
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: "700" }}>
                    {moment(selectedDate).format("dddd, DD MMM yyyy")}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 26,
                    marginTop: 13,
                  }}
                >
                  <View>
                    <Text style={{ color: "#EB6611" }}>नाम</Text>
                    <Text style={{ fontWeight: "500" }}>Vikas Dhiman</Text>
                  </View>
                  <View>
                    <Text style={{ color: "#EB6611" }}>राशि</Text>
                    <Text style={{ fontWeight: "500" }}>11,000</Text>
                  </View>
                </View>

                <View style={{ marginTop: 9, marginHorizontal: 26 }}>
                  <Text style={{ color: "#EB6611" }}>फ़ोन नंबर</Text>
                  <Text style={{ fontWeight: "500" }}>+918571947017</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default AdminBhandara;

const styles = StyleSheet.create({});
