import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";

const AdminYatra = () => {
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const [yatraDetails, setYatraDetails] = useState({
    name: params?.yatraName ?? "",
    date: params?.yatraDate ?? "",
    onboardingPoint: params?.yatraOnboardPoint ?? "",
    timeOfDeparture: params?.yatraTimeOfDeparture ?? "",
    totalSeats: params?.totalYatraSeats ?? "",
    availableSeats: params?.availableSeats ?? "",
    seatData: params?.seatData ?? "",
    nameErrMsg: "",
    dobErrMsg: "",
    onboardErrMsg: "",
    timeErrMsg: "",
    seatsErrMsg: "",
  });
  const BookingDetail = () => {
    let validate = true;

    // name Validation
    if (yatraDetails.name?.length === 0) {
      validate = false;
      setYatraDetails((prevState) => {
        return {
          ...prevState,
          nameErrMsg: "Please Fill The Missing Field",
        };
      });
    }
    // onBoarding Point validation
    if (yatraDetails.onboardingPoint?.length === 0) {
      validate = false;
      setYatraDetails((prevState) => {
        return {
          ...prevState,
          onboardErrMsg: "Please Fill The Missing Field",
        };
      });
    }

    // Time of departure validation
    if (yatraDetails.timeOfDeparture?.length === 0) {
      validate = false;
      setYatraDetails((prevState) => {
        return {
          ...prevState,
          timeErrMsg: "Please Fill The Missing Field",
        };
      });
    }

    // validate DOB

    if (validate) {
      sendFormData();
    }
  };

  const sendFormData = () => {
    const timestamp = moment(yatraDetails.date).valueOf();
    let seatCount = 0;
    yatraDetails.seatData.forEach((item) => {
      seatCount += item?.numberOfSeats;
    });
    const newData = {
      name: yatraDetails?.name,
      date: yatraDetails?.date,
      onboardingPoint: yatraDetails?.onboardingPoint,
      timeOfDeparture: yatraDetails?.timeOfDeparture,
      totalSeats: yatraDetails?.totalSeats,
      availableSeats: yatraDetails?.totalSeats - seatCount,
    };
    console.log("Yatra detail===>, ", yatraDetails);

    try {
      firestore()
        .collection("Yatra")
        .doc(timestamp.toString())
        .set(newData, { merge: true })
        .then((res) => {
          console.log("Response after adding new data", res);
          navigation.navigate("AdminBookingDetail", { yatraDetails });
          // setShowModal(true);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } catch (error) {
      console.log("Error", error);
    }
  };
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
          onFocus={() => setYatraDetails({ ...yatraDetails, nameErrMsg: "" })}
          onChangeText={(text) => {
            setYatraDetails({ ...yatraDetails, name: text });
          }}
        />
      </View>
      {yatraDetails.nameErrMsg.length > 0 ? (
        <View style={styles.errMsgContainer}>
          <Text style={styles.errMsgText}>{yatraDetails.nameErrMsg}</Text>
        </View>
      ) : (
        ""
      )}
      <View style={styles.labelViewStyle}>
        <Labels labelName="Date(YYYY-MM-DD)" />
      </View>
      <View>
        <TextInputs
          value={yatraDetails.date}
          placeholder="YYYY-MM-DD"
          onChangeText={(text) => {
            setYatraDetails({ ...yatraDetails, date: text });
          }}
        />
      </View>
      <View style={styles.labelViewStyle}>
        <Labels labelName="Onboarding point" />
      </View>
      <View>
        <TextInputs
          value={yatraDetails.onboardingPoint}
          placeholder="Onboarding point"
          onFocus={() =>
            setYatraDetails({ ...yatraDetails, onboardErrMsg: "" })
          }
          onChangeText={(text) => {
            setYatraDetails({ ...yatraDetails, onboardingPoint: text });
          }}
        />
      </View>
      {yatraDetails.onboardErrMsg?.length > 0 ? (
        <View style={styles.errMsgContainer}>
          <Text style={styles.errMsgText}>{yatraDetails.onboardErrMsg}</Text>
        </View>
      ) : (
        ""
      )}
      <View style={styles.labelViewStyle}>
        <Labels labelName="TIme of Departure" />
      </View>
      <View>
        <TextInputs
          value={yatraDetails.timeOfDeparture}
          placeholder="Time of Departure"
          onFocus={() => setYatraDetails({ ...yatraDetails, timeErrMsg: "" })}
          onChangeText={(text) => {
            setYatraDetails({ ...yatraDetails, timeOfDeparture: text });
          }}
        />
      </View>
      {yatraDetails.timeErrMsg?.length > 0 ? (
        <View style={styles.errMsgContainer}>
          <Text style={styles.errMsgText}>{yatraDetails.timeErrMsg}</Text>
        </View>
      ) : (
        ""
      )}
      <View style={styles.labelViewStyle}>
        <Labels labelName="Seats" />
      </View>
      <View>
        <TextInputs
          value={yatraDetails.totalSeats}
          placeholder="Seats"
          onChangeText={(text) => {
            setYatraDetails({
              ...yatraDetails,
              totalSeats: text,
              availableSeats: text,
            });
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => [BookingDetail(), Keyboard.dismiss()]}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminYatra;
