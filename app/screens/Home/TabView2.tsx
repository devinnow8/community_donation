import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import styles from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { getHeight } from "../../utils/pixelConversion";
import { openNavigation } from "../../utils/openDirection";
import { Colors } from "../../utils/colors";

const TabView2 = () => {
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const navigation: any = useNavigation();
  const isFocused = useIsFocused();
  const [yatraDetails, setYatraDetails] = useState<any>({});
  const getYatraDetails = async () => {
    firestore()
      .collection("Yatra")
      .orderBy("date", "asc")
      .get()
      .then((data: any) => {
        if (data.docs) {
          let requiredData = data.docs?.filter(
            (item) => item?._data?.timestamp > moment().valueOf()
          );
          const currentData = requiredData[0]._data;
          setYatraDetails(currentData);
        }
      })
      .catch(() => {
        // Alert.alert("Error fetching collections");
      });
  };
  useEffect(() => {
    if (isFocused) {
      getYatraDetails();
    }
  }, [isFocused]);
  const bookSeats = () => {
    if (numberOfSeats > 0 && yatraDetails?.availableSeats >= numberOfSeats) {
      navigation.navigate("YatraBooking", { yatraDetails, numberOfSeats });
    } else if (numberOfSeats === 0) {
      Alert.alert("Please select AtLeast one seat");
    } else if (yatraDetails?.availableSeats < numberOfSeats) {
      Alert.alert("Not Enough Seats Available");
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
              <Text style={styles.date}>
                {/* 12 JUN 2023 */}
                {moment(yatraDetails?.date).format("DD MMM YYYY")}
              </Text>
              <Text style={styles.name}>
                {/* चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर) */}
                {yatraDetails?.name}
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: getHeight(22),
                }}
              >
                <View style={styles.onBoardingContainer}>
                  <Text style={styles.onboardingHeading}>
                    Onboarding Point :
                  </Text>
                  <Text style={styles.onboardingPoint}>
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
                      style={styles.directionIconStyles}
                      source={require("../../assets/images/directionIcon.png")}
                    />
                  </Pressable>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.onboardingHeading}>
                    Time of Departure :
                  </Text>

                  <Text style={styles.textStyles}>
                    {yatraDetails?.timeOfDeparture}
                  </Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.seatsAvailableText}>
                    Seats Available :
                  </Text>
                  <Text style={styles.textStyles}>
                    {yatraDetails?.availableSeats} Seats
                    <Text
                      onPress={() => {
                        navigation.navigate("YatraInfo", yatraDetails);
                      }}
                      style={{ color: Colors.PRIMARY }}
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

            <View style={styles.reserveSeatCard}>
              <Text style={styles.reserveText}>Reserve your Seats</Text>
              <View style={styles.seatsCountContainer}>
                <TouchableOpacity
                  onPress={() => {
                    numberOfSeats > 0 && setNumberOfSeats(numberOfSeats - 1);
                  }}
                  hitSlop={15}
                >
                  <Text style={styles.negativeBtn}>-</Text>
                </TouchableOpacity>
                <View style={styles.numberOfSeatsContainer}>
                  <Text style={styles.textColor}>{numberOfSeats}</Text>
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
                  <Text style={styles.addBtn}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={bookSeats}
                style={styles.bookNowContainer}
              >
                <Text style={styles.bookNowText}>Book Now</Text>
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
