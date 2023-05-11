import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface IHeaderBarText {
  headingText?: string;
  headingLeftText?: string;
  HeadingRightText?: string;
  twoHeadings?: boolean;
}

const HeaderBar = ({
  headingText,
  twoHeadings,
  headingLeftText,
  HeadingRightText,
}: IHeaderBarText) => {
  return (
    <View>
      {twoHeadings ? (
        <View style={[styles.headerBarContainerWithTwoFields]}>
          <Text style={[styles.headerBarText, { marginLeft: 20 }]}>
            {headingLeftText}
          </Text>
          <Text
            style={[
              styles.headerBarText,
              { color: "#EB6611", marginRight: 20 },
            ]}
          >
            {HeadingRightText}
          </Text>
        </View>
      ) : (
        <View style={[styles.headerBarContainer]}>
          <Text style={styles.headerBarText}>{headingText}</Text>
        </View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerBarContainer: {
    padding: 12,
    backgroundColor: "#FFF7E7",
  },
  headerBarText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  headerBarContainerWithTwoFields: {
    padding: 12,
    backgroundColor: "#FFF7E7",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
