import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  mainImage: { alignItems: "center" },
  imageStyle: { height: 80, width: 65 },
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
    padding: 10,
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
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  dateView: {
    height: 37,
    width: 37,
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
  timeSlotWrapper: { marginTop: 27, marginLeft: 10 },
  timeSlotView: {
    paddingVertical: 13,
    paddingHorizontal: 43,
    borderWidth: 1,
    borderColor: "#EB6611",
    borderRadius: 5,
  },
  timeText: { fontSize: 14, fontWeight: "600", color: "#EB6611" },
});
export default styles;
