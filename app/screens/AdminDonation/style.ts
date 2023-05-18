import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  donationTotalCollectionHeading: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: getHeight(20),
  },
  donationTextHeading: {
    fontWeight: "500",
    fontSize: getHeight(20),
    lineHeight: getHeight(22),
  },
  commonStyle: {
    fontSize: getHeight(18),
    fontWeight: "500",
  },
});
export default styles;
