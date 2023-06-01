import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { getHeight, getWidth } from "../utils/pixelConversion";
import { Colors } from "../utils/colors";
import navigationService from "../helper/navigationService";
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
  onRightTextPress?: any;
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
  onRightTextPress,
}: IHeaderBarText) => {
  return (
    <View
      style={[
        twoHeadings && styles.headerBarContainerWithTwoFields,
        hasBackButton && styles.headerBarContainer,
      ]}
    >
      {hasBackButton && (
        <>
          <TouchableOpacity
            style={rightText && styles.backBtnImgStyle}
            hitSlop={10}
            onPress={() => {
              navigationService.goBack();
            }}
          >
            <Image source={require("../assets/images/LeftIcon.png")} />
          </TouchableOpacity>
          <Text style={styles.headerBarText}>{headingText}</Text>
          {hasAddUser ? (
            <Text style={styles.rightText} onPress={onPress}>
              Add
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                onRightButtonPress && onRightButtonPress();
              }}
              hitSlop={15}
            >
              <Text style={styles.rightText}>{rightText}</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {twoHeadings && (
        <>
          <Text style={[styles.headerBarText, { marginLeft: 20 }]}>
            {headingLeftText}
          </Text>
          <TouchableOpacity onPress={onRightTextPress} hitSlop={15}>
            <Text style={[styles.headerBarText, styles.headerBarRightText]}>
              {HeadingRightText}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  headerBarContainer: {
    padding: 12,
    paddingHorizontal: getWidth(20),
    backgroundColor: Colors.SECONDARY,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBarText: {
    fontSize: getHeight(17),
    fontWeight: "600",
    lineHeight: getHeight(22),
    color: Colors.BLACK,
  },
  headerBarContainerWithTwoFields: {
    padding: 12,
    backgroundColor: Colors.SECONDARY,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.PRIMARY,
  },
  headerBarRightText: {
    color: Colors.PRIMARY,
    marginRight: getWidth(20),
  },
  backBtnImgStyle: { width: getWidth(40) },
});
