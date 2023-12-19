import { StyleSheet } from "react-native";
import COLORS from "../../const/color";
// import FONTS from '../../const/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    color: COLORS.black,
    fontSize: 28,
    fontFamily: "SemiBold",
    marginBottom: 20,
  },
  backIcon: {
    color: COLORS.grey,
    marginBottom: 10,
  },
  message: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
    marginBottom: 30,
  },
  blueText: {
    color: COLORS.darkBlue,
  },
  starText: {
    color: COLORS.blue,
  },
  centerText: {
    textAlign: "center",
  },
});
export default styles;
