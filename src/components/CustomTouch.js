import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import Container from "./container";

const CustomTouch = ({ props }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handlePress = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Container>
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={styles.anim}>
          <Text style={styles.text}>Fade View</Text>
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>CustomTouch</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  anim: {
    backgroundColor: "tomato",
    width: 200,
    padding: 15,
    borderRadius: 15,
    opacity: 1,
  },
  button: {
    backgroundColor: "#4ecdc4",
    width: 100,
    borderRadius: 15,
    padding: 15,
    margin: 5,
  },
  text: {
    textTransform: "uppercase",
    color: "#fff",
    fontFamily: "Medium",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomTouch;
