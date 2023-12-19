// import { useNavigation, useRoute } from "@react-navigation/native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import firebase from "firebase/compat/app";
// import React, { useRef, useState } from "react";
// import { ScrollView, StyleSheet, View } from "react-native"; // Import the Text component
// import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
// import Header from "../components/Header";
// import Container from "../components/container";
// import Label from "../components/label";

// import axios from "axios";
// import Loading from "../components/Loading";
// import { userContext } from "../context/Provider";
// import { firebaseConfig } from "../firebase/firebase.config";

const Otp = () => {
  // const navigation = useNavigation();
  // const route = useRoute();
  // const { body } = route.params;
  // const { phone, email, name, password } = body;
  // const { createUser, setLoading, loading } = userContext();
  // const [phoneNumber, setPhoneNumber] = useState(false);
  // const [code, setCode] = useState("");
  // const [verificationId, setVerificationId] = useState(null);
  // const recaptchaVerifier = useRef(null);
  // const sendVerification = () => {
  //   const phoneProvider = new firebase.auth.PhoneAuthProvider();
  //   phoneProvider
  //     .verifyPhoneNumber(phone, recaptchaVerifier.current)
  //     .then(setVerificationId)
  //     .catch((error) => {
  //       console.error("Error sending verification code:", error);
  //     });
  //   setPhoneNumber(true);
  // };

  // const confirmCode = async () => {
  //   setLoading(true);
  //   try {
  //     const credential = firebase.auth.PhoneAuthProvider.credential(
  //       verificationId,
  //       code
  //     );
  //     await firebase.auth().signInWithCredential(credential);
  //     await createUser(email, password);
  //     const res = await axios.post(
  //       "https://food-donation-backend.vercel.app/api/v1/users/create",
  //       {
  //         name,
  //         email,
  //         phone,
  //       }
  //     );
  //     if (res.status === 201) return navigation.navigate("roleSelection");
  //     setCode("");
  //   } catch (error) {
  //     let errorMessage = "An error occurred during login.";

  //     if (error.code === "auth/invalid-verification-code") {
  //       errorMessage = "Invalid verification code. Please try again.";
  //     } else if (error.code === "auth/session-expired") {
  //       ("The verification session has expired. Please try again.");
  //     } else if (error.code === "auth/unknown") {
  //       errorMessage = "An unknown error occurred. Please try again later.";
  //     } else if (error.code === "auth/email-already-in-use") {
  //       errorMessage =
  //         "The email address is already in use. Please try a different email.";
  //     } else if (error.code === "auth/weak-password") {
  //       errorMessage =
  //         "The password is too weak. Please choose a stronger password.";
  //     } else {
  //       errorMessage = error.message;
  //     }

  //     alert(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const onLogin = () => {
  //   navigation.navigate("login");
  // };
  // if (loading) return <Loading />;
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <Container>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        /> */}
      {/* <Header>Signup</Header> */}
      {/* {!phoneNumber ? (
          <>
            <Label>Phone Number</Label>
            <CustomInput placeholder={phone} value={phone} />
            <View style={{ flex: 1, width: "90%" }}>
              <CustomButton
                text="Send OTP"
                onPress={sendVerification}
                type="primary"
              />
            </View>
          </>
        ) : (
          <>
            <Label>OTP</Label>
            <CustomInput
              placeholder="Your OTP Number"
              value={code}
              setValue={setCode}
            />
            <View style={{ flex: 1, width: "90%" }}>
              <CustomButton
                text="Verify OTP"
                onPress={confirmCode}
                type="primary"
              />
            </View>
          </>
        )} */}

      {/* <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <Text style={styles.loginText}>
            Retry?{" "}
            <CustomButton
              text="Login"
              onPress={sendVerification}
              type="tertiary"
            />
          </Text>
        </View> */}
      {/* </Container> */}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   loginText: {
//     fontFamily: "SemiBold",
//     fontSize: 12,
//     textAlign: "center",
//     bottom: 20,
//   },
// });

export default Otp;
