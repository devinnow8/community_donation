import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./style";
import firestore from "@react-native-firebase/firestore";

const AdminDonationCollection = () => {
  const [listData, setListData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const RenderDonationList = ({ item }) => {
    return (
      <View>
        <View style={styles.mainContainer}>
          <Text style={styles.selectedDate}>{item?.selectedDate}</Text>
          <Text style={styles.itemNamePhoneNumber}>
            {item?.name}
            {"\n"} {item?.phoneNumber}
          </Text>
          <Text style={styles.itemAmount}>₹{item?.amount}</Text>
          <View style={styles.itemModeContainer}>
            <Text style={styles.itemModeText}>{item?.mode}</Text>
          </View>
        </View>
        <View style={styles.fieldBottomBar}>
          {/* <Text style={{ width: "32%", textAlign: "center" }}>
            {item?.phoneNumber}
          </Text> */}
        </View>
      </View>
    );
  };
  const RenderDonationFields = () => {
    return (
      <View style={styles.renderDonationFieldsView}>
        <View style={styles.dateText}>
          <Text style={styles.commonStyle}>Date </Text>
        </View>
        <View style={styles.donarDetailText}>
          <Text style={styles.commonStyle}>Donar Details </Text>
        </View>
        <View style={styles.amountText}>
          <Text style={styles.commonStyle}>Amount</Text>
        </View>
        <View style={styles.modeText}>
          <Text style={styles.commonStyle}>Mode</Text>
        </View>
      </View>
    );
  };

  const getDonationList = async () => {
    firestore()
      .collection("DaanSewa")
      .get()
      .then((data) => {
        let amt = 0;

        let newData = data?._docs?.map((item) => {
          amt += parseInt(item?._data?.amount);
          return item?._data;
        });
        newData = newData.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
        setListData(newData);
        setTotalAmount(amt);
      });
  };
  useEffect(() => {
    getDonationList();
  }, []);
  return (
    <View style={styles.daanSewaOuterContainer}>
      <HeaderBar hasBackButton={true} headingText="दान सेवा" />
      <View style={styles.donationTotalCollectionHeading}>
        <Text style={[styles.donationTextHeading, styles.textColor]}>
          Total amount : ₹{totalAmount}
        </Text>
      </View>
      <View style={styles.flatlistOuterContainer}>
        <FlatList
          data={listData}
          renderItem={RenderDonationList}
          ListHeaderComponent={RenderDonationFields}
          stickyHeaderIndices={[0]}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>
    </View>
  );
};

export default AdminDonationCollection;
