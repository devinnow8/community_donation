import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";
const styles = StyleSheet.create({
  mainContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  mainImage: { alignItems: "center", marginTop: getHeight(10) },
  mainImage2: {
    height: getHeight(95),
    width: getWidth(80),
    borderRadius: 95 / 2,
  },
  yatraDetailCard: {
    backgroundColor: Colors.SECONDARY,
    marginHorizontal: getWidth(24),
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: Colors.GRAY,
    shadowOffset: { height: getHeight(10), width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: getHeight(20),
  },
  imageStyle: { height: getHeight(100), width: getWidth(75) },
  headingText: {
    fontSize: getHeight(22),
    fontWeight: "400",
    color: Colors.BLACK,
  },
  homeUpperContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  homeBottomContainer: {
    flexDirection: "row",
    width: "100%",
  },
  btnStyle: {
    padding: getWidth(10),
    width: "50%",
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: getHeight(20),
    fontWeight: "500",
    color: Colors.WHITE,
  },
  calendarView: { backgroundColor: Colors.WHITE, flex: 1 },
  arrowView: {
    backgroundColor: Colors.SECONDARY,
    height: getHeight(35),
    width: getWidth(35),
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dateView: {
    height: getHeight(37),
    width: getWidth(37),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 37 / 2,
  },
  selectedDateView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: getHeight(10),
  },
  timeSlotWrapper: { marginTop: getHeight(27), marginLeft: getWidth(10) },
  timeSlotView: {
    paddingVertical: getHeight(13),
    paddingHorizontal: getWidth(43),
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
  },
  timeText: {
    fontSize: getHeight(14),
    fontWeight: "600",
    color: Colors.PRIMARY,
  },
  dataNotFound: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: getHeight(200),
  },
  dataNotFounfText: {
    fontSize: getHeight(20),
    fontWeight: "600",
  },
  infoIconstyle: {
    marginLeft: getWidth(5),
    height: getHeight(23),
    width: getWidth(23),
  },
  langerLocationContainer: {
    marginHorizontal: getWidth(35),
    marginTop: getHeight(20),
  },
  langerLocationText: {
    textAlign: "center",
    fontSize: getHeight(18),
    fontWeight: "500",
    letterSpacing: 0.6,
    color: Colors.BLACK,
  },
  numberSeatsText: {
    color: Colors.BLACK,
  },
});
export default styles;
