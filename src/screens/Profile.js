import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Loading from "../components/Loading";
import TextField from "../components/TextField";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";

const Profile = () => {
  const route = useRoute();
  const role = route.params?.role;
  const body = route.params?.body;
  const subRole = route.params?.subRole;

  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();

  const [bio, setBio] = useState("");
  const [designation, setDesignation] = useState("");

  const [error, setError] = useState("");

  const navigation = useNavigation();
  const { user, loading, setLoading } = userContext();

  const onBioSetup = async () => {
    let notifications = {};
    setError("");

    if (role === "needy") {
      notifications.needyNotification = false;
    } else if (role === "donor") {
      notifications.donorNotification = false;
    } else if (role === "transporter") {
      notifications.transporterNotification = false;
    }
    if (!imageUrls.length || !bio || !designation) return setError("Required");

    const bodyData = {
      bio,
      photo: imageUrls[0],
      email: user?.email,
      role,
      subRole,
      designation,
      ...body,
      ...notifications,
    };
    setLoading(true);
    try {
      const result = await axios.patch(
        `https://food-donation-backend.vercel.app/api/v1/users/update-role?email=${user?.email}`,
        bodyData
      );
      if (result.data.status === "success") {
        setError("");
        navigation.navigate("user");
      }
    } catch (error) {
      if (error.code === "This-restaurant-already-in-use") {
        setError("The Restaurant is already in use");
      } else {
        setError("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (imageLoading) return <Loading />;

  return (
    <Container>
      <ScrollView>
        <View style={{ flex: 1, marginBottom: 60 }}>
          <View>
            <View style={{ alignItems: "center", marginBottom: 30 }}>
              <Header> Your Profile</Header>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {!imageUrls.length ? (
                <>
                  <TouchableOpacity
                    onPress={takePhoto}
                    style={{ width: "100%", height: "30%", borderColor: "red" }}
                  >
                    {loading ? (
                      <>
                        <View style={{}}>
                          <ActivityIndicator style={{ color: "yellow" }} />
                        </View>
                      </>
                    ) : (
                      <View
                        style={{
                          height: "auto",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
                          Profile Picture
                        </Text>
                        <Text
                          style={{
                            fontFamily: "Bold",
                            fontSize: 10,
                            color: "red",
                            height: 80,
                          }}
                        >
                          <Image source={icons.profile} />
                        </Text>
                        <Text>Add Image+</Text>
                        {error && <Text style={{ color: "red" }}>{error}</Text>}
                      </View>
                    )}
                  </TouchableOpacity>
                </>
              ) : (
                <View style={{ height: 80 }}>
                  {imageUrls?.length && (
                    <Image
                      style={{ height: 60, width: 60, borderRadius: 50 }}
                      source={{ uri: imageUrls?.[imageUrls.length - 1] }}
                    />
                  )}
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 150,
            }}
          >
            {/* <Label>Description</Label>
            <CustomInput
              placeholder="About Yourself"
              value={bio}
              setValue={setBio}
              multiline={true}
              numberOfLines={10}
            /> */}

            <TextField
              placeholder="About Yourself"
              value={bio}
              setValue={setBio}
              multiline={true}
              numberOfLines={10}
              error={error}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: 65,
              marginTop: 10,
            }}
          >
            {/* <Label>Designation</Label>
            <CustomInput
              placeholder="Your Designation"
              value={designation}
              setValue={setDesignation}
              multiline={true}
              numberOfLines={10}
            /> */}

            <TextField
              placeholder="Your Designation"
              value={designation}
              setValue={setDesignation}
              multiline={true}
              numberOfLines={10}
              error={error}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              width: "90%",
              marginTop: 20,
            }}
          >
            <CustomButton
              text="Done"
              onPress={onBioSetup}
              loading={loading}
              disabled={loading}
              type="primary"
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});
export default Profile;
