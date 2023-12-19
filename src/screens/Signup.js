import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import TextField from "../components/TextField";
import Container from "../components/container";
import { userContext } from "../context/Provider";
const Signup = () => {
  const { createUser, updateUser, user, promptAsync, loading, setLoading } =
    userContext();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});

  const onSignup = async () => {
    setError({});
    setLoading(true);
    try {
      if (!firstName) {
        return setError((prev) => ({ ...prev, firstName: "Required" }));
      } else if (!lastName) {
        return setError((prev) => ({ ...prev, lastName: "Required" }));
      } else if (!phoneNumber) {
        return setError((prev) => ({ ...prev, phoneNumber: "Required" }));
      } else if (!email) {
        return setError((prev) => ({ ...prev, email: "Required" }));
      } else if (!password) {
        return setError((prev) => ({ ...prev, phoneNumber: "Required" }));
      }

      const userName = { displayName: firstName + " " + lastName };
      await createUser(email, password);
      await updateUser(userName);
      const res = await axios.post(
        "https://food-donation-backend.vercel.app/api/v1/users/create",
        {
          name: userName.displayName,
          email,
          isAdmin: false,
          phone: phoneNumber,
        }
      );
      if (res.status === 201) return navigation.navigate("roleSelection");
    } catch (error) {
      console.log("🚀 ~ file: Signup.js:40 ~ onSignup ~ error:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setError((prev) => ({ ...prev, email: "Email is already in use" }));
      } else if (error.code === "auth/missing-password") {
        setError((prev) => ({
          ...prev,
          password: "Missing Password. Please try again!",
        }));
      } else if (error.code === "auth/weak-password") {
        setError((prev) => ({
          ...prev,
          password:
            "Weak Password. Password must be a minimum of six character",
        }));
      } else if (error.code === "auth/invalid-email") {
        setError((prev) => ({
          ...prev,
          email: "Invalid Email. Please enter a valid email address!",
        }));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        const errorMessage = error.response.data.error;
        const emailTakenMessage = "Email is already taken";
        if (errorMessage.includes(emailTakenMessage)) {
          setError((prev) => ({ ...prev, email: emailTakenMessage }));
        }
      } else {
        // setError("An error occurred");
        setError((prev) => ({
          ...prev,
          errorMsg: "An error occurred. Please Try again",
        }));
      }
    } finally {
      setLoading(false);
    }
  };
  const onLogin = () => {
    navigation.navigate("login");
  };
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <ScrollView style={{ flex: 1 }}>
      <Container style={{ alignItems: "center" }}>
        <Header style={{ marginTop: 50 }}>Signup</Header>

        <TextField
          style={{ marginTop: 50 }}
          placeholder="Your First Name"
          value={firstName}
          setValue={setFirstName}
          error={error.firstName}
        />

        <TextField
          placeholder="Your Last Name"
          value={lastName}
          setValue={setLastName}
          error={error.lastName}
        />

        <TextField
          placeholder="Your Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          keyboardType={"phone-pad"}
          error={error.phoneNumber}
        />

        <TextField
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
        <View>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 10,
              marginHorizontal: 10,
            }}
          >
            By signing up you agree to our{" "}
            <Text style={{ fontSize: 16 }}>Terms & Conditions</Text> and{" "}
            <Text style={{ fontSize: 16 }}>Privacy Policy.*</Text>
          </Text>
          {error?.errorMsg && (
            <Text
              style={{
                color: "orange",
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {error?.errorMsg}
            </Text>
          )}
        </View>

        <View style={{ flex: 1, width: "90%" }}>
          <CustomButton
            text="Continue"
            loading={loading}
            disabled={loading}
            onPress={onSignup}
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
            Already signed up ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text
              style={{
                fontFamily: "SemiBold",
                color: "#B4AAF2",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default Signup;
