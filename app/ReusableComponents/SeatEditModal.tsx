import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";

const SeatEditModal = ({
  isVisible,
  setIsVisible,
  index,
  setListData,
  listData,
  onSavePress,
}: any) => {
  const [counter, setCounter] = useState(listData[index]?.numberOfSeats ?? 0);
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.seatModalOuterContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(false);
          }}
        >
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
              counter > 0 && setCounter(counter - 1);
            }}
          >
            <Text style={styles.updateBtn}>-</Text>
          </TouchableOpacity>
          <View style={styles.updateNumberContainer}>
            <Text style={styles.counterView}>{counter}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setCounter(counter + 1);
            }}
          >
            <Text style={styles.updateBtn}>+</Text>
          </TouchableOpacity>
        </View>

        {/* SaveButton */}
        <TouchableOpacity
          onPress={() => {
            let newData = listData;
            newData[index].numberOfSeats = counter;
            setListData([...newData]);
            onSavePress();
            setIsVisible(false);
          }}
          style={styles.saveBtn}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
    color: Colors.BLACK,
  },
  updateNumberContainer: {
    height: getHeight(30),
    width: getWidth(54),
    justifyContent: "center",
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 6,
  },
  saveBtn: {
    height: getHeight(28),
    width: getWidth(109),
    backgroundColor: Colors.PRIMARY,
    justifyContent: "center",
    borderRadius: 5,
  },
  seatModalOuterContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    paddingVertical: getHeight(18),
    borderRadius: 10,
  },
  seatModalHeadingText: {
    fontSize: getHeight(16),
    fontWeight: "800",
    color: Colors.BLACK,
  },
  saveButtonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontSize: getHeight(15),
  },
  counterView: {
    textAlign: "center",
    color: Colors.BLACK,
  },
});
