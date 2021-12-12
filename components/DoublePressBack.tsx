import { BackHandler, Platform, ToastAndroid } from "react-native";

let currentCount = 0;
export const useDoubleBackPressExit = (exitHandler: () => void) => {
  if (Platform.OS === "ios") return;
  const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
    if (currentCount === 1) {
      exitHandler();
      subscription.remove();
      return true;
    }
    backPressHandler();
    return true;
  });
};
const backPressHandler = () => {
  if (currentCount < 1) {
    currentCount += 1;
    ToastAndroid.show("lkjsljfsdljf", ToastAndroid.SHORT);
  }
  setTimeout(() => {
    currentCount = 0;
  }, 2000);
};
