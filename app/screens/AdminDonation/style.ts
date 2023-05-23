import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  donationTotalCollectionHeading: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: getHeight(20),
  },
  donationTextHeading: {
    fontWeight: "500",
    fontSize: 20,
  },
  commonStyle: {
    fontSize: 18,
    fontWeight: "500",
  },
  mainContainer: {
    flexDirection: "row",
    borderColor: "grey",
    paddingVertical: getHeight(5),
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDate: {
    flex: 2,
    color: "#EB6611",
    fontSize: getHeight(14),
  },
  itemNamePhoneNumber: {
    flex: 3,
    fontSize: 14,
    textAlign: "center",
  },
  itemAmount: {
    flex: 2,
    textAlign: "center",
    paddingRight: getWidth(5),
    fontSize: 14,
  },
  itemModeContainer: {
    flex: 1.3,
    backgroundColor: "#EB6611",
    padding: 5,
    borderRadius: 5,
    marginLeft: getWidth(5),
  },
  itemModeText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  fieldBottomBar: {
    flexDirection: "row",
    borderBottomWidth: getWidth(1),
    borderColor: "grey",
  },
  renderDonationFieldsView: {
    flexDirection: "row",
    borderBottomWidth: getWidth(1),
    borderColor: "grey",
    paddingBottom: getHeight(5),
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  dateText: { flex: 2 },
  donarDetailText: { flex: 3, alignItems: "center" },
  amountText: { flex: 2, alignItems: "center" },
  modeText: {
    flex: 2,
    alignItems: "center",
  },
  daanSewaOuterContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatlistOuterContainer: {
    flex: 1,
    marginHorizontal: getWidth(20),
  },
});
export default styles;
