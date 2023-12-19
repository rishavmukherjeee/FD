import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
} from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please Enter email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please Enter a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please Enter the password", "password");
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };
  const login = () => {
    navigation.navigate("Login");
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View>
        <Input
          onChangeText={(text) => handleOnchange(text, "email")}
          onFocus={() => handleError(null, "email")}
          iconName="mail"
          label="E-mail"
          placeholder="Your Email"
          error={errors.email}
        />

        <Input
          onChangeText={(text) => handleOnchange(text, "password")}
          onFocus={() => handleError(null, "password")}
          iconName="lock"
          label="Password"
          placeholder="your password"
          error={errors.password}
          password
        />
        <View style={styles.smallBox}>
          <Text style={styles.remember}>Remember Me</Text>
          <Text style={styles.password}>Forgot Password</Text>
        </View>
      </View>
      <Button title="Login" onPress={validate} />
      <Button title="Login as a Guest" onPress={validate} />
      <Text
        onPress={() => navigation.navigate("Welcome")}
        style={[styles.message, styles.centerText]}
      >
        Don't have an account?{" "}
        <Text
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          style={styles.password}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
