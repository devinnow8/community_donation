import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { Calendar } from "react-native-calendars";

import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import styles from "./styles";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";
const AdminBhandara = () => {
  const [selectedDate, setSelectedDate] = useState<any>({ dateString: "" });
  const [loader, setLoader] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<any>({});

  const getCurrentDateData = async (timestamp: number) => {
    setLoader(true);
    firestore()
      .collection("Bandhara Booking")
      .doc(timestamp.toString())
      .get()
      .then((data) => {
        setLoader(false);
        if (data._exists) {
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
        <View style={styles.calenderOuterView}>
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
                          ? Colors.WHITE
                          : selectedDate?.dateString === res.date?.dateString
                          ? Colors.PRIMARY
                          : Colors.SECONDARY,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        res.state === "disabled"
                          ? Colors.BLACK
                          : selectedDate?.dateString === res.date?.dateString
                          ? Colors.WHITE
                          : Colors.PRIMARY,
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
            <View style={styles.flatListMainContainer}>
              <FlatList
                data={Object.values(selectedDateData)}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View style={styles.listEmptyComponentView}>
                    <Text>No booking yet</Text>
                  </View>
                )}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.belowCalenderOuterContainer}>
                      <View style={styles.slotView}>
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
                                .collection("Bandhara Booking")
                                .doc(item?.timeStamp.toString())
                                .set(
                                  { [item?.selectedTime]: currentData },
                                  { merge: true }
                                )
                                .then((res) => {
                                  // setShowModal(true);
                                  getCurrentDateData(item?.timeStamp);
                                })
                                .catch((err) => {
                                  // console.log("Error", err);
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
                                .collection("Bandhara Booking")
                                .doc(item?.timeStamp.toString())
                                .get()
                                .then((data: any) => {
                                  let currentData = data._data;
                                  delete currentData[item?.selectedTime];
                                  firestore()
                                    .collection("Bandhara Booking")
                                    .doc(item?.timeStamp.toString())
                                    .set(currentData)
                                    .then((res) => {
                                      getCurrentDateData(item?.timeStamp);

                                      // setShowModal(true);
                                    })
                                    .catch((err) => {
                                      // console.log("Error", err);
                                    });
                                })
                                .catch((err) => {
                                  // console.log("Error", err);
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
