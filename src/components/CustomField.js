import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";

const CustomField = ({ duration = 200 }) => {
  const [text, setText] = useState("");
  const transY = useRef(new Animated.Value(0));

  const borderWidth = useRef(new Animated.Value(1));

  const handleFocus = () => {
    animateTransform(-40);
    animateBorderWidth(0);
  };

  const handleBlur = () => {
    if (text) return;
    animateTransform(0);
    animateBorderWidth(0);
  };

  const animateTransform = (toValue) => {
    Animated.timing(transY.current, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };
  const transX = transY.current.interpolate({
    inputRange: [-40, 0],
    outputRange: [-20, 0],
    extrapolate: "clamp",
  });
  const animateBorderWidth = (toValue) => {
    Animated.timing(borderWidth.current, {
      toValue,
      duration,
      useNativeDriver: false,
      easing: Easing.ease,
    }).start();
  };

  const borderColor = borderWidth.current.toString().interpolate({
    inputRange: [1, 2],
    outputRange: ["grey", "black"],
    extrapolate: "clamp",
  });

  const labelColorAnimation = borderWidth.current.interpolate({
    inputRange: [0, 2],
    outputRange: ["grey", "black"],
    extrapolate: "clamp",
  });

  const fontSize = borderWidth.current.interpolate({
    inputRange: [0, 2],
    outputRange: [14, 12],
    extrapolate: "clamp",
  });

  const handleChangeText = (value) => {
    setText(value);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          { borderWidth: borderWidth.current, borderColor },
        ]}
      >
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                { translateY: transY.current },
                {
                  translateX: transX,
                },
              ],
            },
          ]}
        >
          <Animated.Text style={{ color: labelColorAnimation, fontSize }}>
            Email
          </Animated.Text>
          <TextInput
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={text}
            onChangeText={handleChangeText}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "88%",
    justifyContent: "center",
  },
  input: {
    padding: 20,
  },
  labelContainer: {
    position: "absolute",
    padding: 20,
  },
});

export default CustomField;
