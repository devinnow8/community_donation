import { FlatList, Text, View } from "react-native";
import React from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";

const YatraInfo = () => {
  const { params }: any = useRoute();
  return (
    <View style={styles.mainContainer}>
      <HeaderBar hasBackButton={true} headingText="यात्रा बुकिंग" />
      <FlatList
        data={params.seatData ?? []}
        bounces={false}
        ListHeaderComponent={() => (
          <View style={styles.listHeaderView}>
            <Text>Name</Text>
            <Text>No. Of Seats Booked</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemView}>
            <Text>{item.name}</Text>
            <Text>{item.numberOfSeats}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default YatraInfo;
