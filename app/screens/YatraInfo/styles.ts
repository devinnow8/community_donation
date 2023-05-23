import { StyleSheet } from "react-native";
import { getHeight, getWidth } from "../../utils/pixelConversion";
import { Colors } from "../../utils/colors";

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.WHITE },
  listHeaderView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(30),
    paddingVertical: getHeight(11),
    borderBottomWidth: getHeight(1),
    marginTop: getHeight(22),
    borderColor: Colors.GRAY,
  },
  itemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: getWidth(30),
    paddingVertical: getHeight(11),
    borderBottomWidth: getHeight(1),
    paddingRight: getWidth(20),
    borderColor: Colors.GRAY,
  },
  textColor: {
    color: Colors.BLACK,
  },
});
export default styles;
