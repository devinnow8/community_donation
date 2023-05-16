import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
const styles = StyleSheet.create({
  mainContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  mainImage: { alignItems: "center", marginTop: 10 },
  mainImage2:{ height: 83, width: 83, borderRadius: 83 / 2 },
  yatraDetailCard:{
    backgroundColor: "#FFF8F3",
    marginHorizontal: 24,
    borderRadius: 7,
    paddingVertical: 14,
    shadowColor: "grey",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: 20,
  },
  imageStyle: { height: getHeight(85), width: getWidth(65) },
  headingText: { fontSize: 22, fontWeight: "400", color: "#1E1E1E" },
  homeUpperContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  homeBottomContainer: {
    flexDirection: "row",
    width: "100%",
  },
  btnStyle: {
    padding: getWidth(10),
    width: "50%",
    borderWidth: 1,
    borderColor: "#EB6611",
  },
  btnTextStyle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  calendarView: { backgroundColor: "white", flex: 1 },
  arrowView: {
    backgroundColor: "#FFF7E7",
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
    marginTop: 10,
  },
  timeSlotWrapper: { marginTop: getHeight(27), marginLeft: getWidth(10) },
  timeSlotView: {
    paddingVertical: getHeight(13),
    paddingHorizontal: getWidth(43),
    borderWidth: 1,
    borderColor: "#EB6611",
    borderRadius: 5,
  },
  timeText: { fontSize: 14, fontWeight: "600", color: "#EB6611" },
});
export default styles;
