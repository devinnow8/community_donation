import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: Colors.WHITE },
  labelViewStyle: { marginTop: 13 },
  nameLabel: { marginTop: 35 },
  submitButtonContainer: {
    backgroundColor: Colors.PRIMARY,
    marginHorizontal: getWidth(110),
    marginVertical: getHeight(40),
    height: getHeight(40),
    width: getWidth(154),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: Colors.WHITE,
  },
  errMsgContainer: {
    marginHorizontal: getWidth(35),
    marginTop: getHeight(10),
  },
  errMsgText: {
    color: Colors.RED,
  },
  modalStyles: {
    flex: 1,
    alignItems: "center",
  },
  parentView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  calenderCloseIcon: {
    height: getHeight(20),
    width: getWidth(18),
    marginLeft: getWidth(300),
    marginBottom: getHeight(20),
  },
  calenderStyle: {
    width: getWidth(300),
    // height: getHeight(200),
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
