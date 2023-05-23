import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

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
    color: Colors.BLACK,
  },
  mainContainer: {
    flexDirection: "row",
    borderColor: Colors.GRAY,
    paddingVertical: getHeight(5),
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDate: {
    flex: 2,
    color: Colors.PRIMARY,
    fontSize: getHeight(12),
  },
  itemNamePhoneNumber: {
    flex: 3,
    fontSize: 14,
    textAlign: "center",
    color: Colors.BLACK,
  },
  itemAmount: {
    flex: 2,
    textAlign: "center",
    paddingRight: getWidth(5),
    fontSize: 14,
    color: Colors.BLACK,
  },
  itemModeContainer: {
    flex: 1.3,
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    borderRadius: 5,
    marginLeft: getWidth(5),
  },
  itemModeText: {
    textAlign: "center",
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: "bold",
  },
  fieldBottomBar: {
    flexDirection: "row",
    borderBottomWidth: getWidth(1),
    borderColor: Colors.GRAY,
  },
  renderDonationFieldsView: {
    flexDirection: "row",
    borderBottomWidth: getWidth(1),
    borderColor: Colors.GRAY,
    paddingBottom: getHeight(5),
    backgroundColor: Colors.WHITE,
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
    backgroundColor: Colors.WHITE,
  },
  flatlistOuterContainer: {
    flex: 1,
    marginHorizontal: getWidth(20),
  },
  textColor: {
    color: Colors.BLACK,
  },
});
export default styles;
