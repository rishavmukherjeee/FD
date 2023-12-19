import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import COLORS from "../const/color";
import FONTS from "../const/fonts";
const Input = ({ label, error, password, onFocus = () => {}, ...props }) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
            alignItems: "center",
          },
        ]}
      >
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={styles.textInput}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 17,
    fontFamily: FONTS.semiBold,
  },
  inputContainer: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 4,
  },
  container: {
    marginBottom: 20,
  },
  textInput: {
    color: COLORS.black,
    fontFamily: FONTS.normal,
    flex: 1,
  },
  password: {
    color: COLORS.darkBlue,
    fontSize: 22,
  },
  error: {
    marginTop: 7,
    color: COLORS.red,
    fontSize: 12,
  },
});

export default Input;
