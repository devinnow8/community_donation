import { StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFF" },
  mainImage: { alignItems: "center", marginTop: 10 },
  imageStyle: { height: getHeight(138), aspectRatio: 1, marginTop: 10 },
  headingText: { fontSize: getHeight(26), fontWeight: "700", color: "#1E1E1E" },
  trustInfoText: {
    fontSize: getHeight(18),
    marginTop: getHeight(14),
    marginHorizontal: getWidth(35),
    textAlign: "justify",
  },
  adminContactContainer: {
    marginHorizontal: getWidth(35),
    marginVertical: getHeight(5),
  },
  adminContactText: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: getHeight(22),
  },
  adminContactTextNumber: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: getHeight(18),
    color: "blue",
  },
});
export default styles;
