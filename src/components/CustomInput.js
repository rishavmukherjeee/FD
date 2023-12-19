import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
  keyboardType,
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, isFocused && styles.textInput]}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        editable={editable}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit={true}
        placeholderTextColor={"#A2A2A6"}
        selectionColor="#B4AAF2"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  input: {
    borderColor: "#A2A2A6",
    color: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#B4AAF2",
    color: "black",
    backgroundColor: "#efedf8",
  },
});

export default CustomInput;
