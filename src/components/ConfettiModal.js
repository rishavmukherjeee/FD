import React from "react";
import { Modal, StyleSheet, View } from "react-native";

const ConfettiModal = ({ visible, onClose, children }) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity> */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 10,
  },
});

export default ConfettiModal;
