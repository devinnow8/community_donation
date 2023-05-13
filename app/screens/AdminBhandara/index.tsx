import {
  ActivityIndicator,
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
import firestore from "@react-native-firebase/firestore";

const AdminBhandara = () => {
  const [selectedDate, setSelectedDate] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<any>({});

  const getCurrentDateData = async (timestamp: number) => {
    setLoader(true);
    firestore()
      .collection("Test4")
      .doc(timestamp.toString())
      .get()
      .then((data) => {
        setLoader(false);
        if (data._exists) {
          console.log("Data for current Date", data);
          setSelectedDateData(data?._data);
        } else {
          setSelectedDateData({});
        }
      })
      .catch(() => {
        setLoader(false);
        Alert.alert("Error fetching collections");
      })
      .finally(() => {
        // dispatch(setLoader(false));
      });
  };
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
            date={selectedDate?.dateString}
            onDayPress={(res) => {
              setSelectedDate(res.dateString);
            }}
            dayComponent={(res: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDate(res.date?.dateString);
                    setSelectedDate(res.date);
                    getCurrentDateData(res.date.timestamp);
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
                          : selectedDate?.dateString === res.date?.dateString
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
                          : selectedDate?.dateString === res.date?.dateString
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
        {loader?<ActivityIndicator/> : selectedDate?.dateString !== "" && (
          <View style={{ paddingBottom: 50 }}>
            {Object.values(selectedDateData)?.map((item: any) => {
              console.log("ItemItemItem", item);
              return (
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
                      {moment(selectedDate?.dateString).format(
                        "dddd, DD MMM yyyy"
                      )}
                      <Text>
                        (
                        {item?.selectedTime === "firstSlot"
                          ? "11:00 AM"
                          : "02:00 PM"}
                        )
                      </Text>
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
                      <Text style={{ fontWeight: "500" }}>{item?.name}</Text>
                    </View>
                    <View>
                      <Text style={{ color: "#EB6611" }}>राशि</Text>
                      <Text style={{ fontWeight: "500" }}>{item?.amount}</Text>
                    </View>
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
                      <Text style={{ color: "#EB6611" }}>फ़ोन नंबर</Text>
                      <Text style={{ fontWeight: "500" }}>
                        {item?.phoneNumber}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ color: "#EB6611" }}>भुगतान</Text>
                      <Text style={{ fontWeight: "500" }}>{item?.mode}</Text>
                    </View>
                  </View>
                  {item?.mode === "CASH" && item?.status === "Pending" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 16,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: "#5CA300",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 5,
                          width: "45%",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 12,
                            color: "#FFF",
                          }}
                        >
                          Confirm
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: "#C21701",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 5,
                          width: "45%",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 12,
                            color: "#FFF",
                          }}
                        >
                          Reject
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
        {Object.values(selectedDateData)?.length===0&&<Text>No booking yet</Text>}
      </ScrollView>
    </>
  );
};

export default AdminBhandara;

const styles = StyleSheet.create({});
