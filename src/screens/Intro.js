import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import icons from "../../assets/icons";
import InitContainer from "../components/initContainer";
import data from "../data/introData";

import Onboarding from "../components/Carousel/Onboarding";
import CustomButton from "../components/CustomButton";

const Intro = () => {
  const navigation = useNavigation();
  return (
    <InitContainer>
      <LottieView
        style={{ width: 350, top: 30 }}
        key="animation"
        autoPlay
        loop
        resizeMode="center"
        source={require("../../assets/girl.json")}
      />

      <View style={styles.topContainer}>
        <Pressable
          onPress={() => navigation.navigate("login")}
          style={{ top: 150, left: 150 }}
        >
          <Image source={icons.rightArrow} />
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              bottom: 23,
              fontSize: 11,
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>

      <View style={styles.subContainer}>
        <Onboarding />
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,
    maxHeight: 300,
    justifyContent: "center",
  },
});

export default Intro;
