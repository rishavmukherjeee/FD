import { useEffect, useRef, useState } from "react";

import {
  Animated,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import icons from "../../assets/icons";

const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).reset();
    }
  };

  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const CustomAlert = ({ type, value }) => {
  const [visible, setVisible] = useState(true);

  let imageSource, message;

  if (type === "success") {
    imageSource = (
      <Image source={icons.success} style={{ height: 100, width: 100 }} />
    );
    {
      value
        ? (message = value)
        : (message = "Congratulations! Registration was successful.");
    }

    // message = 'Congratulations! Registration was successful.';
  } else if (type === "error") {
    imageSource = (
      <Image source={icons.error} style={{ height: 100, width: 100 }} />
    );
    {
      value ? (message = value) : (message = "Please check all requirements.");
    }
  }
  console.log(" Custom Alert called ========");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ModalPopUp visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => (setVisible(false), (value = null))}
            >
              <Image source={icons.close} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>{imageSource}</View>
        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          {message}
        </Text>
      </ModalPopUp>
      {/* <Button title={`Open ${type} Modal`} onPress={() => setVisible(true)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default CustomAlert;
