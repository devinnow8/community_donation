import { StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFF" },
  mainImage: { alignItems: "center", marginTop: 10 },
  imageStyle: { height: getHeight(138), aspectRatio: 1, marginTop: 10 },
  headingText: { fontSize: getHeight(22), fontWeight: "700", color: "#1E1E1E" },
  trustInfoText: {
    fontSize: getHeight(18),
    textAlign: "center",
    marginTop: getHeight(14),
    marginHorizontal: getWidth(35),
  },
});
export default styles;
