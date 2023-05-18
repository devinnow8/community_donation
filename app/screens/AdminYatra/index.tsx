import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import Labels from "../../ReusableComponents/Labels";
import TextInputs from "../../ReusableComponents/TextInputs";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
const AdminYatra = () => {
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const [yatraDetails, setYatraDetails] = useState({
    name: params?.yatraName ?? "",
    date: params?.yatraDate ?? "",
    onboardingPoint: params?.yatraOnboardPoint ?? "",
    timeOfDeparture: params?.yatraTimeOfDeparture ?? "",
    totalSeats: params?.totalYatraSeats ?? "",
    availableSeats: params?.availableSeats ?? "",
    seatData: params?.seatData ?? [],
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
    yatraDetails?.seatData?.forEach((item) => {
      seatCount += item?.numberOfSeats;
    });
    const newData = {
      name: yatraDetails?.name,
      date: yatraDetails?.date,
      onboardingPoint: yatraDetails?.onboardingPoint,
      timeOfDeparture: yatraDetails?.timeOfDeparture,
      totalSeats: yatraDetails?.totalSeats,
      availableSeats: yatraDetails?.totalSeats - seatCount,
      timestamp: moment(yatraDetails?.date).valueOf(),
    };

    try {
      firestore()
        .collection("Yatra")
        .doc(timestamp.toString())
        .set(newData, { merge: true })
        .then((res) => {
          navigation.navigate("AdminBookingDetail", { yatraDetails });
          // setShowModal(true);
        })
        .catch((err) => {
          // console.log("Error", err);
        });
    } catch (error) {
      // console.log("Error", error);
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
          onFocus={() => [setCalenderVisible(true), Keyboard.dismiss()]}
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

      <Modal
        hasBackdrop={true}
        backdropOpacity={0.4}
        isVisible={isCalenderVisible}
        style={styles.modalStyles}
        onBackdropPress={() => setCalenderVisible(false)}
      >
        <View style={styles.parentView}>
          <Pressable hitSlop={10} onPress={() => setCalenderVisible(false)}>
            <Image
              source={require("../../assets/images/crossIcon.png")}
              style={styles.calenderCloseIcon}
            />
          </Pressable>
          <Calendar
            minDate={new Date().toString()}
            style={styles.calenderStyle}
            renderArrow={(res) => {
              return (
                <View>
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
            onDayPress={(day) => {
              setCalenderVisible(false);
              setYatraDetails((prevState) => {
                return {
                  ...prevState,
                  date: day.dateString,
                };
              });
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AdminYatra;
