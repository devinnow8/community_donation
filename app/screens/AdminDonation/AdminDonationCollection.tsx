import { Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../ReusableComponents/HeaderBar";
import styles from "./style";
import firestore from "@react-native-firebase/firestore";

const AdminDonationCollection = () => {
  const [listData, setListData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const RenderDonationList = ({ item }) => {
    console.log("item===>", item);
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            borderColor: "grey",
            paddingVertical: 5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 2, color: "#EB6611", fontSize: 12 }}>
            {item?.selectedDate}
          </Text>
          <Text
            style={{
              flex: 3,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {item?.name}
            {"\n"} {item?.phoneNumber}
          </Text>
          <Text
            style={{
              flex: 2,
              textAlign: "center",
              paddingRight: 5,
              fontSize: 12,
            }}
          >
            ₹{item?.amount}
          </Text>
          <View
            style={{
              flex: 1.3,
              backgroundColor: "#EB6611",
              padding: 5,
              borderRadius: 5,
              marginLeft: 5,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {item?.mode}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "grey",
          }}
        >
          {/* <Text style={{ width: "32%", textAlign: "center" }}>
            {item?.phoneNumber}
          </Text> */}
        </View>
      </View>
    );
  };
  const RenderDonationFields = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: "grey",
          paddingBottom: 5,
          backgroundColor: "#fff",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 2 }}>
          <Text style={styles.commonStyle}>Date </Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.commonStyle}>Donar Details </Text>
        </View>
        {/* <View
          style={{
            width: "32%",

            alignItems: "center",
          }}
        >
         
        </View> */}
        <View style={{ flex: 2, alignItems: "center" }}>
          <Text style={styles.commonStyle}>Amount</Text>
        </View>
        <View
          style={{
            flex: 2,
            alignItems: "center",
          }}
        >
          <Text style={styles.commonStyle}>Mode</Text>
        </View>
      </View>
    );
  };

  const getDonationPaisa = async () => {
    firestore()
      .collection("DaanSewa")
      .get()
      .then((data) => {
        let amt = 0;

        let newData = data?._docs?.map((item) => {
          amt += parseInt(item?._data?.amount);
          return item?._data;
        });
        setListData(newData);
        setTotalAmount(amt);
      });
  };
  useEffect(() => {
    getDonationPaisa();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HeaderBar hasBackButton={true} headingText="दान सेवा" />
      <View style={styles.donationTotalCollectionHeading}>
        <Text style={styles.donationTextHeading}>
          Total amount : ₹{totalAmount}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <FlatList
          data={listData}
          renderItem={RenderDonationList}
          ListHeaderComponent={RenderDonationFields}
          bounces={false}
          stickyHeaderIndices={[0]}
        />
      </View>
    </View>
  );
};

export default AdminDonationCollection;
