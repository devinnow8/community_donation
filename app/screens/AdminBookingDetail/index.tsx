import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./styles";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import SeatEditModal from "../../ReusableComponents/SeatEditModal";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { Colors } from "../../utils/colors";
import Modal from "react-native-modal";
const AdminBookingDetail = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [yatraDetails, setYatraDetails] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [showDeleteModal, setShowDeleteModal] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const editItem = (name: string, seats: number, index: number) => {
    setShowModal(true);
    setSelectedItemIndex(index);
  };
  const AdminAddYatra = () => {
    navigation.navigate("AdminYatra");
  };
  const adminEditYatraBooking = () => {
    const editableData = {
      yatraName: yatraDetails?.name,
      yatraDate: yatraDetails?.date,
      yatraOnboardPoint: yatraDetails?.onboardingPoint,
      yatraTimeOfDeparture: yatraDetails?.timeOfDeparture,
      totalYatraSeats: yatraDetails?.totalSeats,
      availableSeats: yatraDetails?.availableSeats,
      seatData: listData,
    };
    navigation.navigate("AdminYatra", editableData);
  };
  const isFocused = useIsFocused();
  const getYatraDetails = async () => {
    // setLoader(true);
    firestore()
      .collection("Yatra")
      .orderBy("date", "asc")
      .get()
      .then((data: any) => {
        // setLoader(false);
        if (data.docs) {
          let requiredData = data.docs?.filter(
            (item) => item?._data?.timestamp > moment().valueOf()
          );
          const currentData = requiredData[0]._data;
          setYatraDetails(currentData);
          setListData(currentData?.seatData);
        }
      })
      .catch(() => {
        // setLoader(false);
        // Alert.alert("Error fetching collections");
      });
  };
  useEffect(() => {
    if (isFocused) {
      getYatraDetails();
    }
  }, [isFocused]);

  const deleteEntry = (item: any) => {
    let newSeatData = yatraDetails?.seatData?.filter(
      (data) => data?.id !== item?.id
    );
    let newYatraDetail = {
      ...yatraDetails,
      seatData: newSeatData,
      availableSeats: yatraDetails?.availableSeats + item?.numberOfSeats,
    };
    const timestamp = moment(yatraDetails.date).valueOf();

    firestore()
      .collection("Yatra")
      .doc(timestamp.toString())
      .set(newYatraDetail)
      .then((res) => {
        // setShowModal(true);
        getYatraDetails();
        setShowDeleteModal("");
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };

  const editEntry = () => {
    let seatCount = 0;
    listData?.forEach((item: any) => {
      seatCount += item?.numberOfSeats;
    });
    let newYatraDetail = {
      ...yatraDetails,
      seatData: listData,
      availableSeats: yatraDetails?.totalSeats - seatCount,
    };
    const timestamp = moment(yatraDetails.date).valueOf();

    firestore()
      .collection("Yatra")
      .doc(timestamp.toString())
      .set(newYatraDetail)
      .then((res) => {
        getYatraDetails();
      })
      .catch((err) => {
        // console.log("Error", err);
      });
  };
  return (
    <View style={styles.container}>
      {/* header */}
      <HeaderBar
        hasBackButton={true}
        headingText="यात्रा बुकिंग"
        hasAddUser={true}
        onPress={AdminAddYatra}
      />

      {JSON.stringify(yatraDetails) !== "{}" ? (
        <>
          <View style={styles.bookingDetailContainer}>
            <View style={styles.dateView}>
              <Text style={styles.dateFormatStyle}>
                {moment(yatraDetails?.date)?.format("DD MMM YYYY")}
              </Text>
              <TouchableOpacity onPress={adminEditYatraBooking}>
                <Image
                  source={require("../../assets/images/iconEdit.png")}
                  resizeMode="contain"
                  style={styles.iconEditStyle}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.bookingContainerHeadingText}>
              {/* चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर) */}
              {yatraDetails?.name}
            </Text>

            <View style={styles.belowHeadingTextOuterContainer}>
              <View style={styles.belowHeadingTextSubContainer}>
                <Text style={styles.leftSideText}>Onboarding Point : </Text>
                <Text style={styles.rightSideText}>
                  {/* Housing board lights Chandigarh */}
                  {yatraDetails?.onboardingPoint}
                </Text>
              </View>
              <View
                style={[styles.belowHeadingTextSubContainer, { marginTop: 10 }]}
              >
                <Text style={styles.leftSideText}>Time of Departure : </Text>
                <Text style={styles.rightSideText}>
                  {yatraDetails?.timeOfDeparture}
                </Text>
              </View>
              <View
                style={[styles.belowHeadingTextSubContainer, { marginTop: 10 }]}
              >
                <Text style={styles.leftSideText}>Total Seats :</Text>
                <Text style={styles.rightSideText}>
                  {yatraDetails?.totalSeats} Seats
                </Text>
              </View>
            </View>
          </View>

          {/* seats Available */}
          <View style={styles.availableSeatsContainer}>
            <Text style={styles.seatAvailableText}>Available Seats </Text>
            <Text style={styles.seatAvailableNumberText}>
              {yatraDetails?.availableSeats} Seats
            </Text>
          </View>

          {/* chart */}
          <View style={styles.chatOuterContainer}>
            <View style={styles.chartContainer}>
              <Text style={styles.textColor}>Name</Text>
              <Text style={styles.textColor}>No. of seats booked</Text>
              <Text style={styles.textColor}>Action</Text>
            </View>

            <FlatList
              data={listData ?? []}
              renderItem={({ item, index }: any) => {
                return (
                  <View key={item.id} style={styles.chartContainer}>
                    <View style={styles.chartItems}>
                      <Text style={styles.textColor}>{item.name}</Text>
                      <Text style={styles.phoneNumberTextStyle}>
                        {item.phoneNumber}
                      </Text>
                    </View>
                    <View style={styles.chartItems}>
                      <Text style={styles.textColor}>{item.numberOfSeats}</Text>
                    </View>
                    <View style={styles.chartIconOuter}>
                      <TouchableOpacity
                        style={styles.editTouchableStyle}
                        onPress={() => editItem(item.name, item.seats, index)}
                      >
                        <Image
                          style={styles.editTouchableImageStyle}
                          resizeMode="contain"
                          source={require("../../assets/images/iconEdit.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          // deleteEntry(item)
                          setShowDeleteModal(item);
                        }}
                        style={styles.deleteTouchableStyle}
                      >
                        <Image
                          style={styles.deleteTouchableImageStyle}
                          resizeMode="contain"
                          source={require("../../assets/images/emptyIcon.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          {/* modal */}
          {selectedItemIndex !== -1 && (
            <SeatEditModal
              isVisible={showModal}
              setIsVisible={setShowModal}
              index={selectedItemIndex}
              setListData={setListData}
              listData={listData ?? []}
              onSavePress={editEntry}
            />
          )}

          <Modal isVisible={showDeleteModal !== ""}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalViewText}>
                  Are you Sure you want to delete this entry ?
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowDeleteModal("")}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    deleteEntry(showDeleteModal);
                  }}
                >
                  <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={styles.dataNotFound}>
          <Text style={styles.dataNotFounfText}>No Upcomming Yatra</Text>
        </View>
      )}
    </View>
  );
};

export default AdminBookingDetail;
