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
const AdminBookingDetail = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [yatraDetails, setYatraDetails] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [listData, setListData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
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
          const currentData = data.docs[0]._data;
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
    console.log("yatraDetailyatraDetailss", yatraDetails);
    let newSeatData = yatraDetails?.seatData?.filter(
      (data) => data?.phoneNumber !== item?.phoneNumber
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
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
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
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
              >
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
                <Text style={styles.leftSideText}>Seats Available :</Text>
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
              <Text>Name</Text>
              <Text>No. of seats booked</Text>
              <Text>Action</Text>
            </View>

            <FlatList
              data={listData ?? []}
              renderItem={({ item, index }) => {
                return (
                  <View key={item.id} style={styles.chartContainer}>
                    <View style={styles.chartItems}>
                      <Text>{item.name}</Text>
                      <Text style={{ fontSize: 12 }}>{item.phoneNumber}</Text>
                    </View>
                    <View style={styles.chartItems}>
                      <Text>{item.numberOfSeats}</Text>
                    </View>
                    <View style={styles.chartIconOuter}>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                        }}
                        onPress={() => editItem(item.name, item.seats, index)}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          resizeMode="contain"
                          source={require("../../assets/images/iconEdit.png")}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteEntry(item)}
                        style={{
                          marginHorizontal: getWidth(5),

                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                          }}
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
