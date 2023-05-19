import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import styles from "./styles";

const TabView1 = () => {
  const [selectedDate, setSelectedDate] = useState<any>({ dateString: "" });
  const [loader, setLoader] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<any>({});
  const navigation: any = useNavigation();
  const handleNavigation = (val: number) => {
    navigation.navigate("BhandaraBooking", {
      time: val,
      date: selectedDate,
    });
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setSelectedDate({ dateString: "" });
    }
  }, [isFocused]);
  const getCurrentDateData = async (timestamp: number) => {
    setLoader(true);
    firestore()
      .collection("Bandhara Booking")
      .doc(timestamp.toString())
      .get()
      .then((data: any) => {
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
  const renderCalendatDate = (res: any) => {
    return (
      <TouchableOpacity
        disabled={res.date?.timestamp < moment(new Date()).valueOf()}
        onPress={() => {
          setSelectedDate(res.date);
          getCurrentDateData(res.date.timestamp);
        }}
        style={[
          styles.dateView,
          {
            backgroundColor:
              res.state === "disabled"
                ? "white"
                : selectedDate.dateString === res.date?.dateString
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
                : selectedDate.dateString === res.date?.dateString
                ? "white"
                : "#EB6611",
          }}
        >
          {res.date.day}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.mainImage}>
        <Image
          style={styles.imageStyle}
          source={require("../../assets/images/MainScreenIcon.png")}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headingText}>
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
          <TouchableOpacity
            hitSlop={10}
            onPress={() => {
              navigation.navigate("InfoScreen");
            }}
          >
            <Image
              style={styles.infoIconstyle}
              source={require("../../assets/images/InfoIcon.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.calendarView}>
        <Calendar
          minDate={new Date().toString()}
          style={{}}
          theme={{}}
          renderArrow={(res) => {
            return (
              <View style={styles.arrowView}>
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
          date={selectedDate.dateString}
          dayComponent={renderCalendatDate}
        />
        {selectedDate.dateString !== "" && (
          <View style={styles.timeSlotWrapper}>
            <Text>
              {moment(selectedDate.dateString).format("dddd, MMMM DD")}
            </Text>
            {loader ? (
              <ActivityIndicator />
            ) : (
              <View style={styles.selectedDateView}>
                <View>
                  <TouchableOpacity
                    disabled={selectedDateData.firstSlot}
                    onPress={() => handleNavigation(0)}
                    style={[
                      styles.timeSlotView,
                      {
                        borderColor: selectedDateData.firstSlot
                          ? "gray"
                          : "#EB6611",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        {
                          color: selectedDateData.firstSlot
                            ? "grey"
                            : "#EB6611",
                        },
                      ]}
                    >
                      11:00 AM
                    </Text>
                  </TouchableOpacity>
                  {selectedDateData.firstSlot && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text>{selectedDateData.firstSlot?.name}</Text>
                      <Text>{selectedDateData.firstSlot?.amount}</Text>
                    </View>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    disabled={selectedDateData.secondSlot}
                    onPress={() => handleNavigation(1)}
                    style={[
                      styles.timeSlotView,
                      {
                        borderColor: selectedDateData.secondSlot
                          ? "gray"
                          : "#EB6611",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        {
                          color: selectedDateData.secondSlot
                            ? "gray"
                            : "#EB6611",
                        },
                      ]}
                    >
                      02:00 PM
                    </Text>
                  </TouchableOpacity>
                  {selectedDateData.secondSlot && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text>{selectedDateData.secondSlot?.name}</Text>
                      <Text>{selectedDateData.secondSlot?.amount}</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default TabView1;
