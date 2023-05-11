import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  listHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(30),
    paddingVertical: getHeight(11),
    borderBottomWidth: getHeight(1),
    marginTop: getHeight(22),
    borderColor: "#B3B3B3",
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(30),
    paddingVertical: getHeight(11),
    borderBottomWidth: getHeight(1),
    paddingRight: getWidth(20),
    borderColor: "#B3B3B3",
  },
});
export default styles;
