import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState } from "react";

const CustomModal = ({ props }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const { height } = Dimensions.get("window");

  const color = animation.interpolate({
    inputRange: [0, 0.2, 1.8, 2],
    outputRange: [
      "rgba(255, 255, 255, 0.0)",
      "rgba(45, 57, 82, 0.5)",
      "rgba(45, 57, 82, 0.8)",
      "rgba(255, 255, 255, 0.0)",
    ],
  });

  const openModal = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const saveModal = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -height],
    extrapolate: "clamp",
  });

  const modalTrigger = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const save = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const open = {
    transform: [{ scale: openModal }, { translateY: saveModal }],
  };

  const background = {
    backgroundColor: color,
  };

  return (
    <View style={[styles.container, styles.center]}>
      <View style={{ gap: 10 }}>
        <View style={[styles.shadowButton, styles.center]}>
          <TouchableOpacity
            style={[styles.mainButton, styles.center]}
            onPress={modalTrigger}
          >
            <Text style={[styles.headText]}>Donor</Text>
            <Text style={[styles.text]}>
              Person or an Organization who donates the food
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.shadowButton, styles.center]}>
          <TouchableOpacity
            style={[styles.mainButton, styles.center]}
            onPress={modalTrigger}
          >
            <Text style={[styles.headText]}>Transporter</Text>
            <Text style={[styles.text]}>
              Person or an Organization who helps Transporting the food
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.shadowButton, styles.center]}>
          <TouchableOpacity
            style={[styles.mainButton, styles.center]}
            onPress={modalTrigger}
          >
            <Text style={[styles.headText]}>needy</Text>
            <Text style={[styles.text]}>
              Person or an Organization who needs the food
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.background, open]}>
        <View style={styles.wrap}>
          <Text style={[styles.text, styles.helloText]}>Donor</Text>
          {/* <Text style={[styles.text, styles.moreText]}>
            Have some thing to write
          </Text> */}
          <View>
            <TouchableOpacity
              style={[styles.modalButton, styles.center]}
              onPress={close}
            >
              <Text style={[styles.text]}>Restaurant</Text>
              <Text style={[styles.text]}>
                Person or an Organization who donates the food
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.center]}
              onPress={save}
            >
              <Text style={[styles.text]}>Catering Services</Text>
              <Text style={[styles.text]}>
                Person or an Organization who helps Transporting the food
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.center]}
              onPress={save}
            >
              <Text style={[styles.text]}>Grocery Store</Text>
              <Text style={[styles.text]}>Grocery Store</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.center]}
              onPress={save}
            >
              <Text style={[styles.text]}>Normal People</Text>
              <Text style={[styles.text]}>
                Person or an Organization who needs the food
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    // position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    textAlign: "center",
    fontSize: 24,
  },
  modalButton: {
    zIndex: 10,
    width: 300,
    height: 70,
    borderRadius: 10,
    // shadowColor: "#4048bf",
    // shadowOffset: {
    //   width: 6.4,
    //   height: 6.4,
    // },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    backgroundColor: "#EFEDF8",
    // backgroundColor: "transparent",
    // borderRadius: 100,
    // borderColor: "#fff",
    // marginTop: 64,
    // borderWidth: 1,
    // paddingTop: 16,
    // paddingBottom: 16,
    // paddingLeft: 25,
    // paddingRight: 25,
    // marginHorizontal: 5,
    // flex: 1,
  },
  wrap: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    backgroundColor: "#2d3953",
    shadowColor: "#4048bf",
    shadowOffset: {
      width: 8.4,
      height: 8.4,
    },
    shadowOpacity: 0.74,
    shadowRadius: 30,
    elevation: 10,
  },
  shadowButton: {
    borderColor: "#B4AAF2",
    borderWidth: 1,
    borderRadius: 11,
    width: 310,
    height: 80,
    // shadowColor: "#4048bf",
    // shadowOffset: {
    //   width: 8.4,
    //   height: 8.4,
    // },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 10,
  },
  mainButton: {
    zIndex: 10,
    width: 300,
    height: 70,
    borderRadius: 10,
    // shadowColor: "#4048bf",
    // shadowOffset: {
    //   width: 6.4,
    //   height: 6.4,
    // },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    backgroundColor: "#EFEDF8",
  },
  text: {
    fontFamily: "Medium",
    fontSize: 14,
    color: "#667085",
  },
  headText: {
    fontFamily: "SemiBold",
    fontSize: 20,
    textAlign: "left",
    color: "#667085",
  },
  moreText: {
    textAlign: "center",
    marginTop: 64,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomModal;
