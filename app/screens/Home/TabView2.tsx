import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { openNavigation } from "../../utils/openDirection";

const TabView2 = () => {
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [yatraDetails, setYatraDetails] = useState<any>({});
  const getYatraDetails = async () => {
    setLoader(true);
    firestore()
      .collection("Yatra")
      .orderBy("date", "asc")
      .get()
      .then((data: any) => {
        setLoader(false);
        if (data.docs) {
          let requiredData = data.docs?.filter(
            (item) => item?._data?.timestamp > moment().valueOf()
          );
          const currentData = requiredData[0]._data;
          setYatraDetails(currentData);
        }
      })
      .catch(() => {
        setLoader(false);
        // Alert.alert("Error fetching collections");
      });
  };
  useEffect(() => {
    if (isFocused) {
      getYatraDetails();
    }
  }, [isFocused]);
  const bookSeats = () => {
    if (numberOfSeats > 0) {
      navigation.navigate("YatraBooking", { yatraDetails, numberOfSeats });
    } else {
      Alert.alert("Please select AtLeast one seat");
    }
  };
  return (
    <View style={styles.calendarView}>
      <View>
        <View style={styles.mainImage}>
          <Image
            style={styles.mainImage2}
            source={require("../../assets/images/MainScreenIcon2.png")}
            resizeMode="cover"
          />
          <Text
            onPress={getYatraDetails}
            style={[styles.headingText, { marginTop: getHeight(16) }]}
          >
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
        </View>

        {JSON.stringify(yatraDetails) !== "{}" ? (
          <>
            <View style={styles.yatraDetailCard}>
              <Text
                style={{
                  fontSize: getHeight(20),
                  fontWeight: "600",
                  alignSelf: "center",
                }}
              >
                {/* 12 JUN 2023 */}
                {moment(yatraDetails?.date).format("DD MMM YYYY")}
              </Text>
              <Text
                style={{
                  color: "#EB6611",
                  fontSize: getHeight(22),
                  alignSelf: "center",
                  marginTop: getHeight(5),
                  fontWeight: "700",
                }}
              >
                {/* चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर) */}
                {yatraDetails?.name}
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: getHeight(22),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ flex: 1 }}>Onboarding Point : </Text>
                  <Text style={{ width: getWidth(125), textAlign: "left" }}>
                    {/* Housing board Lights Chandigarh */}
                    {yatraDetails?.onboardingPoint}
                  </Text>
                  <Pressable
                    hitSlop={10}
                    onPress={() => {
                      openNavigation(yatraDetails?.onboardingPoint);
                    }}
                  >
                    <Image
                      style={{
                        width: getWidth(20),
                        height: getHeight(20),
                        resizeMode: "contain",
                        marginRight: getWidth(5),
                      }}
                      source={require("../../assets/images/directionIcon.png")}
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: getHeight(10),
                  }}
                >
                  <Text style={{ flex: 1 }}>Time of Departure : </Text>

                  <Text style={{ width: getWidth(150), textAlign: "left" }}>
                    {yatraDetails?.timeOfDeparture}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: getHeight(10),
                  }}
                >
                  <Text style={{ width: "45%" }}>Seats Available :</Text>
                  <Text style={{ width: getWidth(150), textAlign: "left" }}>
                    {yatraDetails?.availableSeats} Seats
                    <Text
                      onPress={() => {
                        navigation.navigate("YatraInfo", yatraDetails);
                      }}
                      style={{ color: "#EB6611" }}
                    >
                      {"   "}Details
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.langerLocationContainer}>
              <Text style={styles.langerLocationText}>
                दर्शन के बाद अग्रवाल धर्मशाला में
              </Text>
              <Text style={styles.langerLocationText}>
                रात्रि भोजन की व्यवस्था है
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#FFF8F3",
                marginHorizontal: getWidth(24),
                borderRadius: 7,
                paddingVertical: getHeight(14),
                shadowColor: "grey",
                shadowOffset: { height: getHeight(10), width: 0 },
                shadowRadius: 5,
                shadowOpacity: 0.2,
                marginTop: getHeight(20),
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
                  marginVertical: getHeight(10),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    numberOfSeats > 0 && setNumberOfSeats(numberOfSeats - 1);
                  }}
                  hitSlop={15}
                >
                  <Text style={{ fontSize: getHeight(25) }}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    paddingVertical: getHeight(5),
                    paddingHorizontal: getWidth(20),
                    borderWidth: 1,
                    borderRadius: 7,
                    marginHorizontal: getWidth(12),
                    borderColor: "#EB6611",
                  }}
                >
                  <Text>{numberOfSeats}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    numberOfSeats < 4 && setNumberOfSeats(numberOfSeats + 1);
                    if (numberOfSeats === 4) {
                      Alert.alert("Number of Seats should be Maximum 4");
                    }
                  }}
                  hitSlop={15}
                >
                  <Text style={{ fontSize: getHeight(20) }}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={bookSeats}
                style={{
                  paddingVertical: getHeight(5),
                  paddingHorizontal: getWidth(20),
                  borderRadius: 5,
                  backgroundColor: "#EB6611",
                  alignSelf: "center",
                  marginTop: getHeight(5),
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.dataNotFound}>
            <Text style={styles.dataNotFounfText}>No Upcomming Yatra</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TabView2;
