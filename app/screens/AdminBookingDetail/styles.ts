import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  bookingDetailContainer: {
    backgroundColor: "#FFF8F3",
    marginHorizontal: getWidth(24),
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: "grey",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: getHeight(20),
  },
  iconEditStyle: {
    height: getHeight(20),
    width: getWidth(20),
    marginLeft: getWidth(300),
    marginRight: getWidth(50),
    position: "absolute",
    marginTop: getHeight(-20),
  },
  availableSeatsContainer: {
    width: getWidth(325),
    height: getHeight(40),
    backgroundColor: "#FFF8F3",
    marginHorizontal: getWidth(24),
    marginVertical: getHeight(30),
    shadowColor: "grey",
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 7,
    padding: getHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: getWidth(1),
    borderColor: "grey",
    paddingVertical: getHeight(5),
  },
  chatOuterContainer: {
    marginHorizontal: getWidth(30),
  },
  horizontalBar: {
    borderWidth: getWidth(0.6),
    marginVertical: getHeight(8),
  },
  chartItems: {
    width: getWidth(120),
  },
  chartIconOuter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bookingContainerHeadingText: {
    color: "#EB6611",
    fontSize: getHeight(18),
    alignSelf: "center",
    marginTop: getHeight(5),
  },
  belowHeadingTextOuterContainer: {
    alignSelf: "center",
    marginTop: getHeight(22),
  },
  belowHeadingTextSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSideText: { width: "45%" },
  rightSideText: { width: getWidth(150), textAlign: "left" },
  seatAvailableText: {
    textAlign: "center",
    marginLeft: getWidth(15),
    fontSize: getHeight(16),
    fontWeight: "600",
  },
  seatAvailableNumberText: {
    textAlign: "center",
    marginRight: getWidth(15),
    color: "#EB6611",
    fontSize: getHeight(16),
    fontWeight: "600",
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
});
export default styles;
