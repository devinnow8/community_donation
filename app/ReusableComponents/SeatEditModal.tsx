import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { getHeight, getWidth } from "../utils/pixelConversion";

const SeatEditModal = ({
  isVisible,
  setIsVisible,
  index,
  setListData,
  listData,
}: any) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.seatModalOuterContainer}>
        <TouchableOpacity onPress={() => setIsVisible(false)}>
          <Image
            source={require("../assets/images/crossIcon.png")}
            style={styles.crossIconStyle}
          />
        </TouchableOpacity>

        <Text
          style={styles.seatModalHeadingText}
        >{`${listData[index]?.name} reserved Seats`}</Text>

        <View style={styles.seatsCountContainer}>
          <TouchableOpacity
            onPress={() => {
              let newData = listData;
              if (newData[index]?.numberOfSeats > 0) {
                newData[index].numberOfSeats = newData[index].numberOfSeats - 1;
              }
              setListData([...newData]);
            }}
          >
            <Text style={styles.updateBtn}>-</Text>
          </TouchableOpacity>
          <View style={styles.updateNumberContainer}>
            <Text style={{ textAlign: "center" }}>{listData[index].numberOfSeats}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              let newData = listData;
              newData[index].numberOfSeats = newData[index].numberOfSeats + 1;
              setListData([...newData]);
            }}
          >
            <Text style={styles.updateBtn}>+</Text>
          </TouchableOpacity>
        </View>

        {/* SaveButton */}
        <View style={styles.saveBtn}>
          <Text style={styles.saveButtonText}>Save</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SeatEditModal;

const styles = StyleSheet.create({
  crossIconStyle: {
    marginLeft: getWidth(280),
    marginRight: getWidth(10),
    marginVertical: getHeight(5),
  },
  seatsCountContainer: {
    flexDirection: "row",
    marginVertical: getHeight(16),
    width: getWidth(100),
    justifyContent: "space-between",
    alignItems: "center",
  },
  updateBtn: {
    fontSize: getHeight(20),
    fontWeight: "700",
  },
  updateNumberContainer: {
    height: getHeight(30),
    width: getWidth(54),
    justifyContent: "center",
    borderColor: "#EB6611",
    borderWidth: 1,
    borderRadius: 6,
  },
  saveBtn: {
    height: getHeight(28),
    width: getWidth(109),
    backgroundColor: "#EB6611",
    justifyContent: "center",
    borderRadius: 5,
  },
  seatModalOuterContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingVertical: getHeight(18),
    borderRadius: 10,
  },
  seatModalHeadingText: {
    fontSize: getHeight(16),
    fontWeight: "800",
  },
  saveButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: getHeight(15),
  },
});
