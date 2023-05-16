import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import styles from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";

const TabView2 = () => {
    const [numberOfSeats, setNumberOfSeats] = useState(0);
    const navigation: any = useNavigation();
    const isFocused = useIsFocused()
    const [loader, setLoader] = useState(false)
    const [yatraDetails, setYatraDetails] = useState<any>({})
    const getYatraDetails = async () => {
      console.log("HereIAM")
      setLoader(true);
      firestore()
        .collection("Yatra").orderBy('date','asc')
        .get()
        .then((data:any) => {
          console.log("Data for current Date", data.docs);
          setLoader(false);
          if(data.docs){
            const currentData = data.docs[0]._data
            console.log("CurrentData",currentData)
            setYatraDetails(currentData)
          }
        })
        .catch(() => {
          setLoader(false);
          Alert.alert("Error fetching collections");
        })
    };
    useEffect(()=>{
      if(isFocused){
        getYatraDetails()
      }
    },[isFocused])
    const bookSeats = () => {
      if(numberOfSeats>0){
        navigation.navigate("YatraBooking", {yatraDetails, numberOfSeats })
      }else{
        Alert.alert("Please select AtLeast one seat")
      }
    }
    return (
      <View style={styles.calendarView}>
        <View style={styles.mainImage}>
          <Image
            style={styles.mainImage2}
            source={require("../../assets/images/MainScreenIcon2.png")}
          />
          <Text onPress={getYatraDetails} style={[styles.headingText, { marginTop: 16 }]}>
            'सब की सेवा, रब की सेवा' ट्रस्ट
          </Text>
        </View>
        <View
          style={styles.yatraDetailCard}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}>
            {/* 12 JUN 2023 */}
            {moment(yatraDetails?.date).format('DD MMM YYYY')}
          </Text>
          <Text
            style={{
              color: "#EB6611",
              fontSize: 18,
              alignSelf: "center",
              marginTop: 5,
            }}
          >
            {/* चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर) */}
            {yatraDetails?.name}
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
                {/* Housing board lights Chandigarh */}
            {yatraDetails?.onboardingPoint}
  
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
            
              <Text style={{ width: 150, textAlign: "left" }}>
              {yatraDetails?.timeOfDeparture}
              </Text>
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
              {yatraDetails?.availableSeats} Seats
                <Text
                  onPress={() =>{ navigation.navigate("YatraInfo",yatraDetails)}}
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
            onPress={
              bookSeats
            }
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

export default TabView2
