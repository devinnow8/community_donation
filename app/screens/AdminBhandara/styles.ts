import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  renderArrowStyle: {
    backgroundColor: "#FFF7E7",
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
    marginLeft: getWidth(20),
    // marginHorizontal: getWidth(20),
    // width: "100%",
    width: getWidth(300),
    // flex: 1,
    backgroundColor: "#FFF8F3",
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: "grey",
    shadowOffset: { height: getHeight(10), width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: getHeight(50),
  },
  selectedDateOuterContainer: { fontSize: getHeight(16), fontWeight: "700" },
  nameAmountOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(26),
    marginTop: getHeight(13),
  },
  nameLabelText: { color: "#EB6611" },
  itemText: { fontWeight: "500" },
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
    backgroundColor: "#5CA300",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: "35%",
  },
  ButtonText: {
    fontWeight: "600",
    fontSize: getHeight(12),
    color: "#FFF",
  },
  rejectButtonContainer: {
    padding: 10,
    backgroundColor: "#C21701",
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
  },
  listEmptyComponentView: {
    justifyContent: "center",
    marginTop: getHeight(100),
  },
  slotView: {
    alignSelf: "center",
  },
  calenderOuterView: { backgroundColor: "white" },
});
export default styles;
