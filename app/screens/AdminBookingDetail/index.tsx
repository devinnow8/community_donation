import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import { useNavigation } from "@react-navigation/native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import SeatEditModal from "../../ReusableComponents/SeatEditModal";
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
            12 JUN 2023
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/iconEdit.png")}
              resizeMode="contain"
              style={styles.iconEditStyle}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            color: "#EB6611",
            fontSize: 18,
            alignSelf: "center",
            marginTop: 5,
          }}
        >
          चंडीगढ़ से माता बाला सुंदरी (त्रिलोकपुर)
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
              Housing board lights Chandigarh
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
            <Text style={{ width: 150, textAlign: "left" }}>08:00 AM</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ width: "45%" }}>Seats Available :</Text>
            <Text style={{ width: 150, textAlign: "left" }}>50 Seats</Text>
          </View>
        </View>
      </View>

      {/* seats Available */}
      <View style={styles.availableSeatsContainer}>
        <Text
          style={{
            textAlign: "center",
            marginLeft: getWidth(15),
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Available Seats{" "}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginRight: getWidth(15),
            color: "#EB6611",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          20 Seats
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

const styles = StyleSheet.create({
  bookingDetailContainer: {
    backgroundColor: "#FFF8F3",
    marginHorizontal: getWidth(24),
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: "grey",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: 20,
  },
  iconEditStyle: {
    height: getHeight(20),
    width: getWidth(20),
    marginLeft: getWidth(300),
    marginRight: getWidth(50),
    position: "absolute",
    marginTop: getHeight(-20),
  },
  availableSeatsContainer: {
    width: getWidth(325),
    height: getHeight(40),
    backgroundColor: "#FFF8F3",
    marginHorizontal: getWidth(24),
    marginVertical: getHeight(30),
    shadowColor: "grey",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 7,
    padding: getHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  chatOuterContainer: {
    marginHorizontal: getWidth(30),
  },
  horizontalBar: {
    borderWidth: 0.6,
    marginVertical: getHeight(8),
  },
  chartItems: {
    width: getWidth(120),
  },
  chartIconOuter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
