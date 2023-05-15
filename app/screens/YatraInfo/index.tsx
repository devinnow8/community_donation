import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./styles";

const MockData = [
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
  {
    name: "Vikas Dhiman",
    seatCount: 5,
  },
];

const YatraInfo = () => {
  return (
    <View style={styles.mainContainer}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <FlatList
        data={MockData}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderView}>
            <Text>Name</Text>
            <Text>No. Of Seats Booked</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <Text>{item.name}</Text>
            <Text>{item.seatCount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default YatraInfo;
