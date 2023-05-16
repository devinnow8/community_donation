import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";

const AdminYatra = () => {
  const navigation: any = useNavigation();
  const BookingDetail = () => {
    const timestamp = moment(yatraDetails.date).valueOf()
    console.log("TimeStamp",timestamp)
    try {
      // const 
      firestore()
      .collection("Yatra")
      .doc(timestamp.toString())
      .set(yatraDetails, { merge: true })
      .then((res) => {
        console.log("Response after adding new data", res);
        navigation.navigate("AdminBookingDetail",{yatraDetails});
        // setShowModal(true);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    } catch (error) {
      console.log("Error",error)
    }
  };
  const [yatraDetails, setYatraDetails] = useState({
    name:'',
    date:'',
    onboardingPoint:'',
    timeOfDeparture:'',
    totalSeats:'',
    availableSeats:''
  })
  return (
    <View style={styles.outerContainer}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <View style={styles.nameLabel}>
        <Labels labelName="Name" />
      </View>
      <View>
        <TextInputs
          value={yatraDetails.name}
          placeholder="Name"
          onChangeText={(text)=>{setYatraDetails({...yatraDetails,name:text})}}
        />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Date(YYYY-MM-DD)" />
      </View>
      <View>
        
      <TextInputs
          value={yatraDetails.date}
          placeholder="YYYY-MM-DD"
          onChangeText={(text)=>{setYatraDetails({...yatraDetails,date:text})}}
        />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Onboarding point" />
      </View>
      <View>
        
      <TextInputs
          value={yatraDetails.onboardingPoint}
          placeholder="Onboarding point"

          onChangeText={(text)=>{setYatraDetails({...yatraDetails,onboardingPoint:text})}}
        />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="TIme of Departure" />
      </View>
      <View>
        
      <TextInputs
          value={yatraDetails.timeOfDeparture}
          placeholder="Time of Departure"

          onChangeText={(text)=>{setYatraDetails({...yatraDetails,timeOfDeparture:text})}}
        />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Seats" />
      </View>
      <View>
        
      <TextInputs
          value={yatraDetails.totalSeats}
          placeholder="Seats"

          onChangeText={(text)=>{setYatraDetails({...yatraDetails,totalSeats:text,availableSeats:text})}}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => BookingDetail()}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminYatra;
