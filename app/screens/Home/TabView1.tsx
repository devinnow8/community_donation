import {
  ActivityIndicator,
  Alert,
  Image,
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
  const [data, setData] = useState([]);
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
      firestoreData();
    }
  }, [isFocused]);

  const firestoreData = async () => {
    firestore()
      .collection("Bandhara Booking")
      .get()
      .then((data: any) => {
        let newData = data?._docs?.map(({ _data }) => _data);
        setData(newData);
      });
  };

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
    const currentDateData: any = data?.filter(
      (item: any) => item?.timeStamp === res.date?.timestamp
    );
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
                : currentDateData[0]?.firstSlot &&
                  currentDateData[0]?.secondSlot
                ? Colors.LIGHT_GRAY
                : currentDateData[0]?.firstSlot ||
                  currentDateData[0]?.secondSlot
                ? Colors.YELLOW
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
                ? Colors.BLACK
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
        <View style={styles.headingTextContainer}>
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
          arrowsHitSlop={2}
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
            <Text style={{ color: Colors.BLACK }}>
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
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: Colors.PRIMARY }}>Delivery Only</Text>
                  </View>
                  {selectedDateData?.firstSlot && (
                    <View style={styles.selectedSlotContainer}>
                      <Text style={styles.textColor}>
                        {selectedDateData?.firstSlot?.name}
                      </Text>
                      <Text style={styles.textColor}>
                        {selectedDateData?.firstSlot?.amount}
                      </Text>
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
                      12:30 PM
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: Colors.PRIMARY }}>
                      Delivery & Distribution
                    </Text>
                  </View>
                  {selectedDateData?.secondSlot && (
                    <View style={styles.selectedSlotContainer}>
                      <Text style={styles.textColor}>
                        {selectedDateData?.secondSlot?.name}
                      </Text>
                      <Text style={[styles.textColor, { marginLeft: 5 }]}>
                        {selectedDateData?.secondSlot?.amount}
                      </Text>
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
