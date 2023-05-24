import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  bookingDetailContainer: {
    backgroundColor: Colors.SECONDARY,
    marginHorizontal: getWidth(24),
    borderRadius: 7,
    paddingVertical: getHeight(14),
    shadowColor: Colors.GRAY,
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
    height: getHeight(45),
    backgroundColor: Colors.SECONDARY,
    marginHorizontal: getWidth(24),
    marginVertical: getHeight(30),
    shadowColor: Colors.GRAY,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 7,
    padding: getHeight(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: getWidth(1),
    borderColor: Colors.GRAY,
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
    color: Colors.BLACK,
  },
  chartIconOuter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bookingContainerHeadingText: {
    color: Colors.PRIMARY,
    fontSize: getHeight(22),
    alignSelf: "center",
    marginTop: getHeight(5),
    fontWeight: "600",
  },
  belowHeadingTextOuterContainer: {
    alignSelf: "center",
    marginTop: getHeight(22),
  },
  belowHeadingTextSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSideText: { width: "45%", color: Colors.BLACK },
  rightSideText: {
    width: getWidth(150),
    textAlign: "left",
    color: Colors.BLACK,
  },
  seatAvailableText: {
    textAlign: "center",
    marginLeft: getWidth(15),
    fontSize: getHeight(16),
    fontWeight: "600",
    color: Colors.BLACK,
  },
  seatAvailableNumberText: {
    textAlign: "center",
    marginRight: getWidth(15),
    color: Colors.PRIMARY,
    fontSize: getHeight(16),
    fontWeight: "600",
  },
  dataNotFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dataNotFounfText: {
    fontSize: getHeight(20),
    fontWeight: "600",
    color: Colors.BLACK,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  dateView: {
    justifyContent: "center",
  },
  dateFormatStyle: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
    color: Colors.BLACK,
  },
  phoneNumberTextStyle: {
    fontSize: 12,
    color: Colors.BLACK,
  },
  editTouchableStyle: {
    justifyContent: "center",
  },
  editTouchableImageStyle: {
    width: 20,
    height: 20,
  },
  deleteTouchableStyle: {
    marginHorizontal: getWidth(5),
    justifyContent: "center",
  },
  deleteTouchableImageStyle: {
    width: 20,
    height: 20,
  },
  textColor: {
    color: Colors.BLACK,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    padding: 10,
  },
  modalView: {
    marginVertical: getHeight(20),
  },
  modalViewText: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    padding: getHeight(15),
    backgroundColor: Colors.RED,
    marginBottom: getHeight(20),
    borderRadius: 5,
    width: getWidth(100),
  },
  okButton: {
    padding: getHeight(15),
    backgroundColor: Colors.CONFIRM_BUTTON,
    marginBottom: getHeight(20),
    borderRadius: 5,
    width: getWidth(100),
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default styles;
