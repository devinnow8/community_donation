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
import { Colors } from "../../utils/colors";

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
  const renderCalendarDate = (res: any) => {
    return (
      <TouchableOpacity
        disabled={res.date?.timestamp < moment(new Date()).valueOf() ?? false}
        onPress={() => {
          setSelectedDate(res.date);
          getCurrentDateData(res.date.timestamp);
        }}
        style={[
          styles.dateView,
          {
            backgroundColor:
              res.state === "disabled" ||
              moment(res.date.timestamp).startOf("day").valueOf() ===
                moment().startOf("day").valueOf()
                ? Colors.WHITE
                : selectedDate.dateString === res.date?.dateString
                ? Colors.PRIMARY
                : Colors.SECONDARY,
          },
        ]}
      >
        <Text
          style={{
            color:
              res?.state === "disabled" ||
              moment(res.date.timestamp).startOf("day").valueOf() ===
                moment().startOf("day").valueOf()
                ? "Colors.BLACK"
                : selectedDate.dateString === res.date?.dateString
                ? Colors.WHITE
                : Colors.PRIMARY,
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
          resizeMode="contain"
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
          minDate={new Date().toISOString()}
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
          dayComponent={renderCalendarDate}
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
                    disabled={selectedDateData?.firstSlot !== undefined}
                    onPress={() => handleNavigation(0)}
                    style={[
                      styles.timeSlotView,
                      {
                        borderColor: selectedDateData?.firstSlot
                          ? Colors.GRAY
                          : Colors.PRIMARY,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        {
                          color: selectedDateData?.firstSlot
                            ? Colors.GRAY
                            : Colors.PRIMARY,
                        },
                      ]}
                    >
                      11:00 AM
                    </Text>
                  </TouchableOpacity>
                  {selectedDateData?.firstSlot && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text>{selectedDateData?.firstSlot?.name}</Text>
                      <Text>{selectedDateData?.firstSlot?.amount}</Text>
                    </View>
                  )}
                </View>
                <View>
                  <TouchableOpacity
                    disabled={selectedDateData?.secondSlot !== undefined}
                    onPress={() => handleNavigation(1)}
                    style={[
                      styles.timeSlotView,
                      {
                        borderColor: selectedDateData?.secondSlot
                          ? Colors.GRAY
                          : Colors.PRIMARY,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeText,
                        {
                          color: selectedDateData?.secondSlot
                            ? Colors.GRAY
                            : Colors.PRIMARY,
                        },
                      ]}
                    >
                      02:00 PM
                    </Text>
                  </TouchableOpacity>
                  {selectedDateData?.secondSlot && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text>{selectedDateData?.secondSlot?.name}</Text>
                      <Text>{selectedDateData?.secondSlot?.amount}</Text>
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
