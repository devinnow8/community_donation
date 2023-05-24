import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  renderArrowStyle: {
    backgroundColor: Colors.SECONDARY,
    height: getHeight(35),
    width: getWidth(35),
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  calenderDayPress: {
    height: getHeight(37),
    width: getWidth(37),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 37 / 2,
  },
  belowCalenderOuterContainer: {
    marginHorizontal: getWidth(10),
    // marginHorizontal: getWidth(20),
    // width: "100%",
    width: getWidth(300),
    // flex: 1,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: Colors.GRAY,
    shadowOffset: { height: getHeight(10), width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: getHeight(30),
  },
  selectedDateOuterContainer: {
    fontSize: getHeight(16),
    fontWeight: "700",
    color: Colors.BLACK,
  },
  nameAmountOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(26),
    marginTop: getHeight(13),
  },
  nameLabelText: { color: Colors.PRIMARY },
  itemText: { fontWeight: "500", color: Colors.BLACK },
  phoneNumberPaymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(26),
    marginTop: getHeight(13),
  },
  modePaymentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: getHeight(16),
  },
  confirmButtonContainer: {
    padding: 10,
    backgroundColor: Colors.CONFIRM_BUTTON,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "35%",
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: getHeight(12),
    color: Colors.WHITE,
  },
  rejectButtonContainer: {
    padding: 10,
    backgroundColor: Colors.RED,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "35%",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 16,
  },
  flatListMainContainer: {
    paddingBottom: 50,
    paddingRight: getWidth(20),
    alignItems: "center",
    marginLeft: 10,
  },
  listEmptyComponentView: {
    justifyContent: "center",
    marginTop: getHeight(100),
  },
  slotView: {
    alignSelf: "center",
  },
  calenderOuterView: { backgroundColor: Colors.WHITE },
  monthStyles: { color: Colors.BLACK, fontSize: 16 },
  emptyText: { color: Colors.BLACK, fontWeight: "600", fontSize: 18 },
  ColorCodingView: {
    flexDirection: "row",
    alignItems: "center",
    height: getHeight(20),
    marginTop: getHeight(5),
    backgroundColor: "white",
  },
});
export default styles;
