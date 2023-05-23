import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.WHITE },
  mainImage: { alignItems: "center", marginTop: getHeight(10) },
  imageStyle: {
    height: getHeight(138),
    aspectRatio: 1,
    marginTop: getHeight(10),
  },
  headingText: {
    fontSize: getHeight(26),
    fontWeight: "700",
    color: Colors.BLACK,
  },
  trustInfoText: {
    fontSize: getHeight(18),
    marginTop: getHeight(14),
    marginHorizontal: getWidth(35),
    textAlign: "justify",
    color: "black",
  },
  adminContactContainer: {
    marginHorizontal: getWidth(35),
    marginVertical: getHeight(5),
  },
  adminContactText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: getHeight(22),
    color: Colors.BLACK,
  },
  adminContactTextNumber: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: getHeight(18),
    color: Colors.BLUE,
  },
});
export default styles;
