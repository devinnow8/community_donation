import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getHeight, getWidth } from "../utils/pixelConversion";
interface IHeaderBarText {
  headingText?: string;
  headingLeftText?: string;
  HeadingRightText?: string;
  twoHeadings?: boolean;
  hasBackButton?: any;
  rightText?: String;
  onRightButtonPress?: any;
  hasAddUser?: boolean;
  onPress?: any;
}

const HeaderBar = ({
  headingText,
  twoHeadings,
  headingLeftText,
  HeadingRightText,
  hasBackButton,
  rightText,
  onRightButtonPress,
  hasAddUser,
  onPress,
}: IHeaderBarText) => {
  const navigation: any = useNavigation();

  return (
    <View>
      {twoHeadings ? (
        <View style={[styles.headerBarContainerWithTwoFields]}>
          <Text style={[styles.headerBarText, { marginLeft: 20 }]}>
            {headingLeftText}
          </Text>
          <Text style={[styles.headerBarText, styles.headerBarRightText]}>
            {HeadingRightText}
          </Text>
        </View>
      ) : hasAddUser ? (
        <View style={[styles.headerBarContainer]}>
          {hasBackButton && (
            <TouchableOpacity
              style={rightText && { width: 40 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={require("../assets/images/LeftIcon.png")} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerBarText}>{headingText}</Text>
          <Text style={styles.rightText} onPress={onPress}>
            Add
          </Text>
        </View>
      ) : (
        <View style={[styles.headerBarContainer]}>
          {hasBackButton && (
            <TouchableOpacity
              style={rightText && { width: 40 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={require("../assets/images/LeftIcon.png")} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerBarText}>{headingText}</Text>
          <Text
            style={styles.rightText}
            onPress={() => {
              onRightButtonPress && onRightButtonPress();
            }}
          >
            {rightText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerBarContainer: {
    padding: 12,
    paddingHorizontal: getWidth(20),
    backgroundColor: "#FFF7E7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBarText: {
    fontSize: getHeight(17),
    fontWeight: "600",
    lineHeight: getHeight(22),
    letterSpacing: -0.4,
  },
  headerBarContainerWithTwoFields: {
    padding: 12,
    backgroundColor: "#FFF7E7",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EB6611",
  },
  headerBarRightText: {
    color: "#EB6611",
    marginRight: 20,
  },
});
