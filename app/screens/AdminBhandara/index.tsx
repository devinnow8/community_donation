import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { Calendar } from "react-native-calendars";

import moment from "moment";
import firestore from "@react-native-firebase/firestore";
import styles from "./styles";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";
import CalendarHeader from "react-native-calendars/src/calendar/header";
import ColorCoding from "../../ReusableComponents/ColorCoding";
import { useIsFocused } from "@react-navigation/native";
const AdminBhandara = () => {
  const [selectedDate, setSelectedDate] = useState<any>({ dateString: "" });
  const [loader, setLoader] = useState(false);
  const [selectedDateData, setSelectedDateData] = useState<any>({});
  const [cardData, setCardData] = useState([]);
  const [listView, setListView] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [data, setData] = useState([]);
  const [selectedCalendarData, setSelectedCalendarData] = useState([]);
  const [selectedMonthData, setSelectedMonthData] = useState([]);
  const isFocused = useIsFocused();
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
          let newData: any = [];
          if (data?._data?.firstSlot) {
            newData.push(data?._data?.firstSlot);
          }
          if (data?._data?.secondSlot) {
            newData.push(data?._data?.secondSlot);
          }
          setCardData(newData);
          firestoreData();
        } else {
          setSelectedDateData({});
          setCardData([]);
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
  useEffect(() => {
    if (isFocused) {
      firestoreData();
    }
  }, [isFocused]);
  useEffect(() => {
    let newData = data.filter((item: any) => {
      if (
        item.timeStamp > moment(selectedMonth).startOf("month").valueOf() &&
        item?.timeStamp < moment(selectedMonth).endOf("month").valueOf()
      ) {
        return item;
      }
    });
    setSelectedMonthData(newData);
  }, [data]);

  const firestoreData = async () => {
    firestore()
      .collection("Bandhara Booking")
      .get()
      .then((data: any) => {
        let newData = data?._docs?.map(({ _data }) => _data);
        let cardData: any = [];
        let newData1 = data?._docs?.map(({ _data }) => _data);
        newData.map((item: any) => {
          if (item?.firstSlot) {
            cardData.push(item?.firstSlot);
          }
          if (item?.secondSlot) {
            cardData.push(item?.secondSlot);
          }
        });
        setData(cardData);
        setSelectedCalendarData(newData1);
      });
  };
  const renderCardList = (data: any, isHorizontal: boolean) => {
    return (
      <FlatList
        data={data}
        horizontal={isHorizontal}
        contentContainerStyle={{ paddingBottom: 80 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyComponentView}>
            <Text style={styles.emptyText}>No booking yet</Text>
          </View>
        )}
        renderItem={({ item }: any) => {
          return (
            <View style={styles.belowCalenderOuterContainer}>
              <View style={styles.slotView}>
                <Text style={styles.selectedDateOuterContainer}>
                  {moment(
                    selectedDate?.dateString === ""
                      ? item?.timeStamp
                      : selectedDate?.dateString
                  ).format("dddd, DD MMM yyyy")}
                  <Text>
                    (
                    {item?.selectedTime === "firstSlot"
                      ? "11:00 AM"
                      : "12:30 PM"}
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
                  <Text style={styles.itemText}>{item?.phoneNumber}</Text>
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
    );
  };

  return (
    <>
      <HeaderBar
        headingText="भंडारा बुकिंग"
        hasBackButton={true}
        rightText={listView ? "List" : "Calendar"}
        onRightButtonPress={() => {
          setSelectedDate({ dateString: "" });
          setListView(!listView);
        }}
      />
      <View style={styles.scrollViewContainer}>
        {listView ? (
          <>
            <View style={styles.calenderOuterView}>
              <Calendar
                arrowsHitSlop={10}
                minDate={new Date().toString()}
                style={{ marginBottom: 20 }}
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
                  const currentDateData: any = selectedCalendarData?.filter(
                    (item: any) => item?.timeStamp === res.date?.timestamp
                  );
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
                              : selectedDate?.dateString ===
                                res.date?.dateString
                              ? Colors.PRIMARY
                              : currentDateData[0]?.firstSlot &&
                                currentDateData[0]?.secondSlot
                              ? Colors.BLACK
                              : currentDateData[0]?.firstSlot ||
                                currentDateData[0]?.secondSlot
                              ? Colors.GRAY
                              : Colors.SECONDARY,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            res.state === "disabled"
                              ? Colors.BLACK
                              : selectedDate?.dateString ===
                                res.date?.dateString
                              ? Colors.WHITE
                              : currentDateData[0]?.firstSlot &&
                                currentDateData[0]?.secondSlot
                              ? Colors.WHITE
                              : currentDateData[0]?.firstSlot ||
                                currentDateData[0]?.secondSlot
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

              <View style={styles.ColorCodingView}>
                <ColorCoding labelText="Booked" />
                <ColorCoding labelText="Partially Booked" />
                <ColorCoding labelText="Available" />
              </View>
            </View>
            {loader ? (
              <ActivityIndicator />
            ) : (
              selectedDate?.dateString !== "" && (
                <View style={styles.flatListMainContainer}>
                  {renderCardList(cardData, true)}
                </View>
              )
            )}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            <CalendarHeader
              hideDayNames
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
              month={selectedMonth}
              onPressArrowLeft={(res, month) => {
                let newDate = moment(month).set(
                  "month",
                  selectedMonth.get("month") - 1
                );
                let newData = data.filter((item) => {
                  if (
                    item.timeStamp >
                      moment(newDate).startOf("month").valueOf() &&
                    item?.timeStamp < moment(newDate).endOf("month").valueOf()
                  ) {
                    return item;
                  }
                });
                setSelectedMonthData(newData);
                setSelectedMonth(newDate);
              }}
              onPressArrowRight={(res, month) => {
                let newDate = moment(month).set(
                  "month",
                  selectedMonth.get("month") + 1
                );

                let newData = data.filter((item) => {
                  if (
                    item.timeStamp >
                      moment(newDate).startOf("month").valueOf() &&
                    item?.timeStamp < moment(newDate).endOf("month").valueOf()
                  ) {
                    return item;
                  }
                });
                setSelectedMonthData(newData);
                setSelectedMonth(newDate);
              }}
              renderHeader={() => (
                <Text style={styles.monthStyles}>
                  {moment(selectedMonth).format("MMMM YYYY")}
                </Text>
              )}
            />
            {loader ? (
              <ActivityIndicator />
            ) : (
              <View style={{ alignItems: "center" }}>
                {renderCardList(selectedMonthData, false)}
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default AdminBhandara;
