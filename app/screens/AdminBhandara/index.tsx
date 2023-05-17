import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { Calendar } from "react-native-calendars";

import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import styles from "./styles";
import { getWidth } from "../../utils/pixelConversion";
const AdminBhandara = () => {
  const [selectedDate, setSelectedDate] = useState<any>({ dateString: "" });
  const [loader, setLoader] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<any>({});

  const getCurrentDateData = async (timestamp: number) => {
    setLoader(true);
    firestore()
      .collection("Test5")
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
      <View style={styles.scrollViewContainer}>
        <View style={{ backgroundColor: "white" }}>
          <Calendar
            minDate={new Date().toString()}
            style={{}}
            theme={{}}
            renderArrow={(res) => {
              return (
                <View style={styles.renderArrowStyle}>
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
                    styles.calenderDayPress,
                    {
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
        {loader ? (
          <ActivityIndicator />
        ) : (
          selectedDate?.dateString !== "" && (
            <View style={{ paddingBottom: 50, paddingRight: getWidth(20) }}>
              <FlatList
                data={Object.values(selectedDateData)}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={()=><View style={{}} ><Text>No booking yet</Text></View>}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.belowCalenderOuterContainer}>
                      <View style={{ alignSelf: "center" }}>
                        <Text style={styles.selectedDateOuterContainer}>
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

                      <View style={styles.nameAmountOuterContainer}>
                        <View>
                          <Text style={styles.nameLabelText}>नाम</Text>
                          <Text style={styles.itemText}>{item?.name}</Text>
                        </View>
                        <View>
                          <Text style={styles.nameLabelText}>राशि</Text>
                          <Text style={styles.itemText}>{item?.amount}</Text>
                        </View>
                      </View>

                      <View style={styles.phoneNumberPaymentContainer}>
                        <View>
                          <Text style={styles.nameLabelText}>फ़ोन नंबर</Text>
                          <Text style={styles.itemText}>
                            {item?.phoneNumber}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.nameLabelText}>भुगतान</Text>
                          <Text style={styles.itemText}>{item?.mode}</Text>
                        </View>
                      </View>
                      {item?.mode === "CASH" && item?.status === "Pending" && (
                        <View style={styles.buttonsView}>
                          <TouchableOpacity
                            onPress={() => {
                              const currentData = {
                                ...item,
                                status: "Completed",
                              };
                              firestore()
                                .collection("Test5")
                                .doc(item?.timeStamp.toString())
                                .set(
                                  { [item?.selectedTime]: currentData },
                                  { merge: true }
                                )
                                .then((res) => {
                                  console.log(
                                    "Response after adding new data",
                                    res
                                  );
                                  // setShowModal(true);
                                  getCurrentDateData(item?.timeStamp);
                                })
                                .catch((err) => {
                                  console.log("Error", err);
                                });
                            }}
                            style={styles.confirmButtonContainer}
                          >
                            <Text style={styles.ButtonText}>Confirm</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              const currentData = {
                                ...item,
                              };
                              firestore()
                                .collection("Test5")
                                .doc(item?.timeStamp.toString())
                                .get()
                                .then((data: any) => {
                                  let currentData = data._data;
                                  delete currentData[item?.selectedTime];
                                  firestore()
                                    .collection("Test5")
                                    .doc(item?.timeStamp.toString())
                                    .set(currentData)
                                    .then((res) => {
                                      console.log(
                                        "Response after adding new data",
                                        res
                                      );
                                  getCurrentDateData(item?.timeStamp);

                                      // setShowModal(true);
                                    })
                                    .catch((err) => {
                                      console.log("Error", err);
                                    });
                                })
                                .catch((err) => {
                                  console.log("Error", err);
                                });
                            }}
                            style={styles.rejectButtonContainer}
                          >
                            <Text style={styles.ButtonText}>Reject</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                }}
              />
            </View>
          )
        )}
      </View>
    </>
  );
};

export default AdminBhandara;
