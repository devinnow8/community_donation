import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ActivityIndicator,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../utils/colors";

const AdminYatra = () => {
  const navigation: any = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { params }: any = useRoute();
  const [isCalenderVisible, setCalenderVisible] = useState(false);
  const [isLoaderVisible, setLoaderVisible] = useState(false);
  const [yatraDetails, setYatraDetails] = useState({
    name: params?.yatraName ?? "",
    date: params?.yatraDate ?? "",
    onboardingPoint: params?.yatraOnboardPoint ?? "Yavnika park panchkula",
    timeOfDeparture: params?.yatraTimeOfDeparture ?? "",
    totalSeats: params?.totalYatraSeats ?? "45",
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
  const deleteYatra = () => {
    firestore()
      .collection("Yatra")
      .doc(moment(params.yatraDate)?.valueOf().toString())
      .delete()
      .then((res) => {
        setShowDeleteModal(false);
        navigation.navigate("AdminBookingDetail");
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };
  const sendFormData = () => {
    setLoaderVisible(true);
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
      seatData: params?.seatData ?? [],
      timestamp: moment(yatraDetails?.date).valueOf(),
    };
    try {
      if (
        !params?.yatraDate ||
        moment(params.yatraDate)?.valueOf() === timestamp
      ) {
        firestore()
          .collection("Yatra")
          .doc(timestamp.toString())
          .set(newData, { merge: true })
          .then((res) => {
            setLoaderVisible(false);
            navigation.navigate("AdminBookingDetail", { yatraDetails });
            // setShowModal(true);
          })
          .catch((err) => {
            setLoaderVisible(false);
            // console.log("Error", err);
          });
      } else {
        firestore()
          .collection("Yatra")
          .doc(moment(params.yatraDate)?.valueOf().toString())
          .delete()
          .then((res) => {
            firestore()
              .collection("Yatra")
              .doc(timestamp.toString())
              .set(newData, { merge: true })
              .then((res) => {
                setLoaderVisible(false);
                navigation.navigate("AdminBookingDetail", { yatraDetails });
                // setShowModal(true);
              })
              .catch((err) => {
                setLoaderVisible(false);
                // console.log("Error", err);
              });
            // setShowModal(true);
          })
          .catch((err) => {
            setLoaderVisible(false);
            // console.log("Error", err);
          });
      }
    } catch (error) {
      setLoaderVisible(false);
      // console.log("Error", error);
    }
  };
  return (
    <View style={styles.outerContainer}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
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
          <Labels labelName="Date(DD-MM-YYYY)" />
        </View>
        <View>
          <TextInputs
            value={
              yatraDetails.date === ""
                ? ""
                : moment(yatraDetails.date).format("DD-MM-YYYY")
            }
            placeholder="DD-MM-YYYY"
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
          <Labels labelName="Time of Departure" />
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
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.submitButtonContainer}
            onPress={() => [BookingDetail(), Keyboard.dismiss()]}
          >
            {isLoaderVisible ? (
              <ActivityIndicator size={"small"} color={Colors.WHITE} />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          {params?.yatraName && (
            <TouchableOpacity
              style={styles.submitButtonContainer}
              onPress={() => [setShowDeleteModal(true), Keyboard.dismiss()]}
            >
              <Text style={styles.submitButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
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
      <Modal isVisible={showDeleteModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalViewText}>
              Are you Sure you want to delete this Yatra ?
            </Text>
          </View>

          <View style={styles.modalBtnContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                deleteYatra();
              }}
            >
              <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminYatra;
