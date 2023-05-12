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
import HeaderBar from "../../ReusableComponents/HeaderBar";
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
            onPress={() => {
              navigation.navigate("InfoScreen");
            }}
          >
            <Image
              style={{ marginLeft: 5 }}
              source={require("../../assets/images/InfoIcon.png")}
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
                onPress={() => handleNavigation("11:00 AM")}
                style={styles.timeSlotView}
              >
                <Text style={styles.timeText}>11:00 AM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigation("02:00 PM")}
                style={styles.timeSlotView}
              >
                <Text style={styles.timeText}>02:00 PM</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
const TabView2 = () => {
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const navigation: any = useNavigation();
  return (
    <View style={styles.calendarView}>
      <View style={styles.mainImage}>
        <Image
          style={[{ height: 83, width: 83, borderRadius: 83 / 2 }]}
          source={require("../../assets/images/MainScreenIcon2.png")}
        />
        <Text style={[styles.headingText, { marginTop: 16 }]}>
          'सब की सेवा, रब की सेवा' ट्रस्ट
        </Text>
      </View>
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
        <Text style={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}>
          12 JUN 2023
        </Text>
        <Text
          style={{
            color: "#EB6611",
            fontSize: 18,
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर)
        </Text>
        <View
          style={{
            alignSelf: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: "45%" }}>Onboarding Point : </Text>
            <Text style={{ width: 150, textAlign: "left" }}>
              Housing board lights Chandigarh
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ width: "45%" }}>Time of Departure : </Text>
            <Text style={{ width: 150, textAlign: "left" }}>08:00 AM</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ width: "45%" }}>Seats Available :</Text>
            <Text style={{ width: 150, textAlign: "left" }}>
              50 Seats
              <Text
                onPress={() => navigation.navigate("YatraInfo")}
                style={{ color: "#EB6611" }}
              >
                {"   "}Details
              </Text>
            </Text>
          </View>
        </View>
      </View>
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
        <Text style={{ alignSelf: "center", fontWeight: "700" }}>
          Reserve your Seats
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{ fontSize: 20 }}
            onPress={() => {
              numberOfSeats > 0 && setNumberOfSeats(numberOfSeats - 1);
            }}
          >
            -
          </Text>
          <View
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderRadius: 7,
              marginHorizontal: 12,
              borderColor: "#EB6611",
            }}
          >
            <Text>{numberOfSeats}</Text>
          </View>
          <Text
            style={{ fontSize: 20 }}
            onPress={() => {
              numberOfSeats < 50 && setNumberOfSeats(numberOfSeats + 1);
            }}
          >
            +
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("YatraBooking", { numberOfSeats })}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: "#EB6611",
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>Book Now</Text>
        </TouchableOpacity>
      </View>
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
        {selectedTab === 0 ? <TabView1 /> : <TabView2 />}
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
