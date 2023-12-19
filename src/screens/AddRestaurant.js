import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
import Loading from "../components/Loading";

import Container from "../components/container";

import AddImages from "../components/AddImages";
import TextField from "../components/TextField";
import useImagePicker from "../hook/useImagePicker";

const AddRestaurant = () => {
  const route = useRoute();
  const role = route.params.role;
  const subRole = route.params.subRole;

  const navigation = useNavigation();
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();
  const [categoryName, setCategoryName] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  const [fssaiLicense, setFSSAILicense] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [error, setError] = useState({});

  const onAddRestaurant = () => {
    setError({});
    if (!imageUrls.length)
      return setError((prev) => ({ ...prev, errorImg: "Required" }));
    else if (!categoryName)
      return setError((prev) => ({ ...prev, errorName: "Required" }));
    else if (!location?.latitude || !location?.longitude)
      return setError((prev) => ({ ...prev, errorLocation: "Required" }));
    else if (!fssaiLicense)
      return setError((prev) => ({ ...prev, errorLicense: "Required" }));
    else if (!panNumber)
      return setError((prev) => ({ ...prev, errorPan: "Required" }));
    else {
      const body = {
        categoryName,
        location: location,
        fssaiLicense,
        panNumber,
        image: imageUrls,
      };
      navigation.navigate("profile", { role, subRole, body });
    }
  };

  if (imageLoading) {
    return <Loading />;
  }

  const onPressAddress = (data, details) => {
    const latitude = details.geometry.location.lat;
    const longitude = details.geometry.location.lng;

    setLocation((prev) => ({ ...prev, latitude, longitude }));
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container style={{ justifyContent: "center" }}>
        <Header>{`Add ${subRole}`.toString()}</Header>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextField
            placeholder={`${subRole} Name`}
            value={categoryName}
            setValue={setCategoryName}
            error={error.errorName}
          />
        </View>

        {/* Image add part */}

        <AddImages
          imageUrls={imageUrls}
          takePhoto={takePhoto}
          error={error.errorImg}
        />

        {/* Location */}
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontFamily: "SemiBold",
              fontSize: 14,
            }}
          >
            Location
          </Text>
          {error?.errorLocation && (
            <Text style={{ color: "red" }}>{error.errorLocation}</Text>
          )}
          {/* <Label></Label> */}
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Location"
            onPress={onPressAddress}
            query={{
              key: "AIzaSyDnSNNGQQ8AhLEmcsXJbmz1_MVrbOz55rM",
              language: "en",
            }}
            styles={{
              textInputContainer: styles.containerStyle,
              textInput: styles.textInputStyle,
            }}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TextField
            placeholder="FSSAI License"
            value={fssaiLicense}
            setValue={setFSSAILicense}
            error={error.errorLicense}
          />

          <TextField
            placeholder="PAN Number"
            value={panNumber}
            setValue={setPanNumber}
            secureTextEntry={true}
            error={error.errorPan}
          />
        </View>

        <View style={{ flex: 1, alignSelf: "center", width: "90%" }}>
          <CustomButton
            text="Continue"
            onPress={onAddRestaurant}
            type="primary"
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  stretch: {
    width: 60,
    height: 60,
    resizeMode: "stretch",
    backgroundColor: "black",
    borderRadius: 8,
  },
  containerStyle: {
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 2,
    marginVertical: 5,
  },
  textInputStyle: {
    // fontSize: 16,
  },
});

export default AddRestaurant;
