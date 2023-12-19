import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";

import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddImages from "../components/AddImages";
import ConfettiModal from "../components/ConfettiModal";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import TextField from "../components/TextField";
import Container from "../components/container";
import Label from "../components/label";
import { userContext } from "../context/Provider";
import useImagePicker from "../hook/useImagePicker";

const CommunityPost = () => {
  const { loading: imageLoading, imageUrls, takePhoto } = useImagePicker();
  const [closeModal, setCloseModal] = useState(false);

  const { allData, setRefetch } = userContext();
  const { role, subRole, email, photo } = allData.userData;
  const navigation = useNavigation();
  const [yourName, setYourName] = useState("");
  const [organization, setOrganization] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [noOfItem, setNoOfItem] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setSelectedDate(currentDate.toDateString());
      }
    } else {
      toggleDatePicker();
    }
  };
  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const formattedValue = value.replace(/[^0-9]/g, "");
    setNoOfItem(formattedValue);
  };
  const onClicked = async () => {
    if (
      imageUrls.length === 0 ||
      !yourName ||
      !organization ||
      !address ||
      !description ||
      !noOfItem ||
      isNaN(noOfItem) ||
      !date
    ) {
      return setError("Required");
    }
    setLoading(true);
    const body = {
      name: yourName,
      location: address,
      description,
      noOfItem,
      date,
      organization,
      imageUrls,
      role,
      subRole,
      email,
      photo,
    };

    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/community/create`,
        body
      );
      if (res.data.status === "success") {
        setRefetch((prev) => !prev);
        setCloseModal(true);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (imageLoading) {
    return <Loading />;
  }

  const onClose = () => {
    setCloseModal(false);
    navigation.navigate("Community");
  };

  return (
    <Container>
      {closeModal && (
        <ConfettiCannon
          count={200}
          autoStart={true}
          origin={{ x: -10, y: 0 }}
          fadeOut={true}
        />
      )}
      <ConfettiModal visible={closeModal} onClose={onClose}>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 30,
            fontWeight: 600,
            color: "#B4AAF2",
          }}
        >
          🎉Congratulations!🎉
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 30,
            textAlign: "center",
            fontWeight: 500,
            color: "#B4AAF2",
          }}
        >
          Your Campaign has been successfully posted.
        </Text>
        {/* <Button title="Close Modal" onPress={onClose} />
         */}
        <CustomButton text="OKAY" onPress={onClose} type="primary" />
      </ConfettiModal>
      <Header>Community Post</Header>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Label>Your Name</Label>
          <CustomInput
            placeholder="Your Name"
            value={yourName}
            setValue={setYourName}
          /> */}

          <TextField
            placeholder="Your Name"
            value={yourName}
            setValue={setYourName}
            error={error}
          />

          {/* <Label>Organization</Label>
          <CustomInput
            placeholder="Organization"
            value={organization}
            setValue={setOrganization}
          /> */}

          <TextField
            placeholder="Organization"
            value={organization}
            setValue={setOrganization}
            error={error}
          />

          {/* <Label>Location</Label>
          <CustomInput
            placeholder="Event Location"
            value={address}
            setValue={setAddress}
          /> */}

          <TextField
            placeholder="Event Location"
            value={address}
            setValue={setAddress}
            error={error}
          />

          {/* <Label>Description</Label>
          <CustomInput
            placeholder="Description of event"
            value={description}
            setValue={setDescription}
            numberOfLines={10}
          /> */}

          <TextField
            placeholder="Description of event"
            value={description}
            setValue={setDescription}
            numberOfLines={10}
            error={error}
          />

          {/* <Label>No of Items</Label>
          <CustomInput
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={setNoOfItem}
          /> */}

          <TextField
            placeholder="No of Items"
            keyboardType="numeric"
            value={noOfItem}
            setValue={handleNumberChange}
            error={error}
          />

          <Label>Date of Donation</Label>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChange}
            />
          )}
          {!showPicker && (
            <Pressable
              style={{ width: "100%", marginLeft: 35 }}
              onPress={toggleDatePicker}
            >
              {/* <CustomInput
                placeholder={date.toDateString()}
                value={selectedDate}
                editable={false}
              /> */}
              <TextField
                placeholder={date.toDateString()}
                value={selectedDate}
                editable={false}
              />
            </Pressable>
          )}
          <AddImages
            imageUrls={imageUrls}
            takePhoto={takePhoto}
            error={error}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignSelf: "center",
            width: "90%",
          }}
        >
          <CustomButton
            text="Continue"
            loading={loading}
            disabled={loading}
            onPress={onClicked}
            type="primary"
          />
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default CommunityPost;
