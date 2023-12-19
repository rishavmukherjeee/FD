import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import InitContainer from "../components/initContainer";
import { userContext } from "../context/Provider";

const InitialPage = () => {
  const navigation = useNavigation();
  const { user, signOutUser } = userContext();

  const isFocus = useIsFocused();
  useEffect(() => {
    if (user?.email && isFocus) {
      navigation.navigate("user");
    }
  }, [user?.email, isFocus]);
  return (
    <InitContainer>
      <Text style={styles.header}> Bhojan Mitra </Text>

      <View style={{ paddingRight: 45, paddingLeft: 30 }}>
        <Text style={styles.detail}>
          Optimize Food Waste. Transforming leftovers into a sustainable future
        </Text>

        <Pressable onPress={() => navigation.navigate("intro")}>
          <Image source={icons.InitialBtn} style={styles.icon} />
        </Pressable>
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    fontFamily: "Bold",
    fontSize: 40,
    lineHeight: 46,
    textAlign: "center",
    justifyContent: "center",
    // paddingHorizontal: 20,
    marginHorizontal: 70,
  },
  detail: {
    fontFamily: "Regular",
    paddingLeft: 30,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    // paddingTop: 100,
    marginTop: 400,
  },
  icon: {
    marginRight: 220,
    marginTop: 120,
  },
});

export default InitialPage;
