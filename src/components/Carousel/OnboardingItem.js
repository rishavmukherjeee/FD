import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontFamily: "Medium",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});
