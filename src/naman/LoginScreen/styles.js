import { StyleSheet } from "react-native";
import COLORS from "../../const/color";
// import FONTS from '../../const/fonts';
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  scrollViewContainer: {},
  heading: {
    color: COLORS.black,
    fontSize: 28,
    fontFamily: "SemiBold",
    marginBottom: 20,
  },
  smallBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  line: {
    borderWidth: 1,
    flex: 1,
    height: 0,
    marginTop: 10,
    borderColor: COLORS.light,
  },
  space: {
    fontFamily: "SemiBold",
    color: COLORS.grey,
    marginHorizontal: 10,
  },
  message: {
    fontFamily: "Medium",
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 30,
  },
  remember: {
    color: COLORS.grey,
    fontFamily: "Medium",
    marginBottom: 20,
  },
  password: {
    color: COLORS.blue,
    fontFamily: "Medium",
  },
  ssoImages: {
    marginHorizontal: 30,
  },
});
export default styles;
