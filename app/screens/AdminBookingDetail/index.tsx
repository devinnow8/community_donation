import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import SeatEditModal from "../../ReusableComponents/SeatEditModal";
import moment from "moment";
const passengerData = [
  {
    id: 1,
    name: "vikasDhiman",
    seats: 5,
  },
  {
    id: 2,
    name: "Gaganpreet singh",
    seats: 5,
  },
  {
    id: 3,
    name: "Sumit Kumar",
    seats: 1,
  },
  {
    id: 4,
    name: "Mayank Sharma",
    seats: 5,
  },
  {
    id: 5,
    name: "Parul Garg",
    seats: 6,
  },
  {
    id: 6,
    name: "Shikhar",
    seats: 1,
  },
];
const AdminBookingDetail = () => {
  const navigation = useNavigation();
  const {params} = useRoute()
  const {yatraDetails} = params
  const [showModal, setShowModal] = useState(false);
  const [listData, setListData] = useState(passengerData);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const editItem = (name: string, seats: number, index: number) => {
    setShowModal(true);
    setSelectedItemIndex(index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {/* header */}
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />

      <View style={styles.bookingDetailContainer}>
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{ fontSize: 16, fontWeight: "600", alignSelf: "center" }}
          >
            {moment(yatraDetails.date)?.format('DD MMM YYYY')}
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/iconEdit.png")}
              resizeMode="contain"
              style={styles.iconEditStyle}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.bookingContainerHeadingText}>
          {/* चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर) */}
          {yatraDetails.name}

        </Text>

        <View style={styles.belowHeadingTextOuterContainer}>
          <View style={styles.belowHeadingTextSubContainer}>
            <Text style={styles.leftSideText}>Onboarding Point : </Text>
            <Text style={styles.rightSideText}>
              {/* Housing board lights Chandigarh */}
          {yatraDetails.onboardingPoint}

            </Text>
          </View>
          <View
            style={[styles.belowHeadingTextSubContainer, { marginTop: 10 }]}
          >
            <Text style={styles.leftSideText}>Time of Departure : </Text>
            <Text style={styles.rightSideText}>
          {yatraDetails.timeOfDeparture}
              
            </Text>
          </View>
          <View
            style={[styles.belowHeadingTextSubContainer, { marginTop: 10 }]}
          >
            <Text style={styles.leftSideText}>Seats Available :</Text>
            <Text style={styles.rightSideText}>{yatraDetails?.totalSeats}{' '}
               Seats</Text>
          </View>
        </View>
      </View>

      {/* seats Available */}
      <View style={styles.availableSeatsContainer}>
        <Text style={styles.seatAvailableText}>Available Seats </Text>
        <Text style={styles.seatAvailableNumberText}>{yatraDetails?.availableSeats} Seats</Text>
      </View>

      {/* chart */}
      <View style={styles.chatOuterContainer}>
        <View style={styles.chartContainer}>
          <Text>Name</Text>
          <Text>No. of seats booked</Text>
          <Text>Action</Text>
        </View>

        <FlatList
          data={passengerData}
          renderItem={({ item, index }) => {
            return (
              <View key={item.id} style={styles.chartContainer}>
                <View style={styles.chartItems}>
                  <Text>{item.name}</Text>
                </View>
                <View style={styles.chartItems}>
                  <Text>{item.seats}</Text>
                </View>
                <View style={styles.chartIconOuter}>
                  <TouchableOpacity
                    onPress={() => editItem(item.name, item.seats, index)}
                  >
                    <Image
                      source={require("../../assets/images/chartEdit.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginHorizontal: getWidth(5) }}>
                    <Image
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
          listData={listData}
        />
      )}
    </View>
  );
};

export default AdminBookingDetail;
