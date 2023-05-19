import { Alert, Linking, Platform } from "react-native";

export const openNavigation = (openAddress: string) => {
  if (openAddress !== "") {
    let url: any = Platform.select({
      ios: `maps://app.direction?daddr=${openAddress}`,
      android: `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${openAddress}`,
    });
    Linking.openURL(url);
  } else {
    Alert.alert("Address is not valid");
  }
};
