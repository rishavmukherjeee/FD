import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import TextField from "../components/TextField";
import Container from "../components/container";
import { userContext } from "../context/Provider";
const Login = () => {
  const {
    signIn,
    // promptAsync,
    user,
    // request,
    setAllData,
    loading,
    setLoading,
  } = userContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState({});
  console.log("🚀 ~ file: Login.js:25 ~ Login ~ error:", error);

  const navigation = useNavigation();
  const isFocus = useIsFocused();
  useEffect(() => {
    if (user?.email && isFocus) {
      navigation.navigate("background");
    }
  }, [user?.email, isFocus]);
  const onSignInPressed = async () => {
    setError({});
    try {
      const res = await signIn(email, password);
    } catch (error) {
      console.log(error);
      let errorMessage = "An error occurred during sign-in.";

      if (error.code === "auth/user-not-found") {
        errorMessage = "Invalid email . Please try again.";
        setError((prev) => ({
          ...prev,
          email: errorMessage,
          password: errorMessage,
        }));
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Invalid password . Please try again.";
        setError((prev) => ({
          ...prev,
          password: errorMessage,
        }));
      } else if (error.code === "auth/invalid-email") {
        errorMessage =
          "Invalid email format. Please enter a valid email address.";
        setError((prev) => ({
          ...prev,
          email: errorMessage,
        }));
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many sign-in attempts. Please try again later.";
        setError((prev) => ({
          ...prev,
          email: errorMessage,
          password: errorMessage,
        }));
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
        setError((prev) => ({
          ...prev,
          email: errorMessage,
          password: errorMessage,
        }));
      } else {
        errorMessage = "An unknown error occurred. Please try again later.";
        setError((prev) => ({
          ...prev,
          email: errorMessage,
          password: errorMessage,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onGuestPressed = async () => {
    const res = await axios.get(
      "https://food-donation-backend.vercel.app/api/v1/users?email=guest@gmail.com"
    );
    if (res.status === 200) {
      setAllData((prev) => ({ ...prev, guestData: res.data.data.role }));
      navigation.navigate("home");
    }
  };

  const onSignup = () => {
    navigation.navigate("signup");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
        <Header style={{ marginTop: 50 }}>Login</Header>

        <TextField
          style={{ marginTop: 50 }}
          placeholder="Your Email"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          error={error.email}
        />
        <TextField
          placeholder="Your Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          error={error.password}
        />

        <View
          style={{
            flexDirection: "row",
            gap: 160,
            alignSelf: "flex-start",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#B4AAF2" : undefined}
            />
            <Text
              style={{ fontFamily: "Medium", fontSize: 12, color: "#747980" }}
            >
              Remember me
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={onForgotPasswordPressed}>
              <Text
                style={{ fontFamily: "Medium", fontSize: 12, color: "#B4AAF2" }}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, width: "90%", gap: 10, marginTop: 20 }}>
          <CustomButton
            text="Login"
            onPress={onSignInPressed}
            type="primary"
            loading={loading}
            disabled={loading}
          />
          <CustomButton
            text="Signin as a Guest"
            onPress={onGuestPressed}
            type="primary"
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Text
            style={{
              fontFamily: "SemiBold",
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text
              style={{
                fontFamily: "SemiBold",
                color: "#B4AAF2",
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignSelf: "center",
    width: 72,
    heigh: 68,
    padding: 16,
    borderRadius: 6,
    borderColor: "#EBE9F1",
    borderWidth: 1,
  },
  checkbox: { marginRight: 3 },

  button: {
    backgroundColor: "#B4AAF2",
    elevation: 1,

    width: "90%",
    maxHeight: 50,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "white",
  },
});
export default Login;
