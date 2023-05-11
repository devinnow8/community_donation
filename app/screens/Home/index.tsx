import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import styles from "./styles";
import HeaderBar from "../ReusableComponents/HeaderBar";
import { useNavigation } from "@react-navigation/native";
const TabView1 = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const navigation: any = useNavigation();
  const handleNavigation = (val: string) => {
    navigation.navigate("BhandaraBooking", {
      time: val,
      date: moment(selectedDate).format("dddd, DD MMMM"),
    });
  };
  return (
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
                styles.dateView,
                {
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
      {selectedDate !== "" && (
        <View style={styles.timeSlotWrapper}>
          <Text>{moment(selectedDate).format("dddd, MMMM DD")}</Text>
          <View style={styles.selectedDateView}>
            <TouchableOpacity
              style={styles.timeSlotView}
              onPress={() => handleNavigation("11:00 AM")}
            >
              <Text style={styles.timeText}>11:00 AM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.timeSlotView}
              onPress={() => handleNavigation("02:00 PM")}
            >
              <Text style={styles.timeText}>02:00 PM</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
      <SafeAreaView style={styles.homeUpperContainer}>
        <HeaderBar
          headingLeftText="भंडारा बुकिंग"
          HeadingRightText="दान सेवा"
          twoHeadings={true}
        />
        <View style={styles.mainImage}>
          <Image
            style={styles.imageStyle}
            source={require("../../assets/images/MainScreenIcon.png")}
          />
          <Text style={styles.headingText}>
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
        </View>
        {selectedTab === 0 ? <TabView1 /> : <></>}
      </SafeAreaView>
      <View style={styles.homeBottomContainer}>
        <Pressable
          style={[
            styles.btnStyle,
            { backgroundColor: selectedTab === 0 ? "#EB6611" : "#FFFFFF" },
          ]}
          onPress={() => setSelectedTab(0)}
        >
          <Text
            style={[
              styles.btnTextStyle,
              { color: selectedTab !== 0 ? "#EB6611" : "#FFFFFF" },
            ]}
          >
            भोजन सेवा
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btnStyle,
            { backgroundColor: selectedTab === 1 ? "#EB6611" : "#FFFFFF" },
          ]}
          onPress={() => setSelectedTab(1)}
        >
          <Text
            style={[
              styles.btnTextStyle,
              {
                color: selectedTab === 0 ? "#EB6611" : "#FFFFFF",
              },
            ]}
          >
            धर्म यात्रा
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Home;
