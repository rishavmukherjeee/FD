import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { get, getDatabase, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Container from "../components/container";
import Measure from "../components/measure";
import { userContext } from "../context/Provider";

let i = 1;
const DonorPage = () => {
  const route = useRoute();
  const { user: paramUser } = route.params;

  const { allData, user } = userContext();
  const navigation = useNavigation();
  const [address, setAddress] = useState();
  const latitude = paramUser.location.latitude;
  const longitude = paramUser.location.longitude;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getAddressFromCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ`
      );

      const results = response.data.results;
      if (results.length) {
        const formattedAddress = results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        setAddress("No Location found");
      }
    } catch (error) {
      console.warn("Error:", error);
    }
  };

  useEffect(() => {
    getAddressFromCoordinates();
  }, [latitude, longitude]);

  const onAccept = async () => {
    setIsButtonDisabled(true);
    const email = user?.email;
    const body = { donorNotification: true };
    try {
      const response = await axios.patch(
        `https://food-donation-backend.vercel.app/api/v1/users/update-role?email=${email}`,
        body
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error updating user:", error);
    } finally {
      setIsButtonDisabled(false);
    }
    const createChatId = (email1, email2) => {
      return [email1, email2].sort().join();
    };

    const chatRef = ref(getDatabase(), paramUser?.email?.replace(/[@.]/g, ""));
    const newMessage = {
      mail: user?.email,
      name: user?.displayName,
      profileImage: allData?.userData?.photo || icons.user,
      chatid: createChatId(paramUser?.email, user?.email),
    };
    console.log(newMessage);

    // Check if the email already exists in the database
    get(chatRef).then((snapshot) => {
      const emails = Object.values(snapshot.val() || {}).map(
        (message) => message.mail
      );
      if (!emails.includes(paramUser?.email)) {
        // Email doesn't exist, push the new message
        push(chatRef, newMessage);
      }
    });

    const chatRef1 = ref(getDatabase(), user?.email.replace(/[@.]/g, ""));
    const newMessage1 = {
      mail: paramUser?.email,
      name: paramUser?.userName,
      profileImage: paramUser?.photo || icons.user,
      chatid: createChatId(paramUser?.email, user?.email),
    };
    console.log(newMessage1);
    // Check if the email already exists in the database
    get(chatRef1).then((snapshot) => {
      const emails = Object.values(snapshot.val() || {}).map(
        (message) => message.mail
      );
      if (!emails?.includes(user?.email)) {
        // Email doesn't exist, push the new message
        push(chatRef1, newMessage1);
      }
    }); /*
    //here location is set
    set(ref(getDatabase(), "location/" + user?.email?.replace(/[@.]/g, "")), {
      lat: allData?.userData?.location?.latitude,
      lng: allData?.userData?.location?.longitude,
    });

    set(
      ref(
        getDatabase(),
        "location/" + user?.email?.replace(/[@.]/g, "")
      ),
      { lat: paramUser?.location?.latitude, lng: paramUser?.location?.longitude }
    );

    //here is the location
    get(
      ref(getDatabase(), "location/" + paramUser?.email?.replace(/[@.]/g, ""))
    ).then((snapshot) => {
      console.log(snapshot.val());
    });
    get(
      ref(
        getDatabase(),
        "location/" + user?.email?.replace(/[@.]/g, "")
      )
    ).then((snapshot) => {
      console.log(snapshot.val());
    });
    
  set(ref(getDatabase(), "notification/" + user.email.replace(/[@.]/g, ""))), {
    title: "New Chat",
    body: "You have a new chat from " + auth.currentUser.displayName,
    data: {
      type: "chat",
      chatid: createChatId(auth.currentUser.email, user.email),
    },
  };*/
    //scedulepushnotification("title", "body", "data ");

    //ListenForChatAdd();
    navigation.navigate("Chat");
    console.warn("Accept");
  };
  const onDecline = () => {
    console.warn("Decline");
    navigation.navigate("user");
  };

  return (
    <Container key={paramUser?._id}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignSelf: "center",
          width: "90%",
        }}
      >
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 18,
          }}
        >
          {paramUser?.categoryName || paramUser?.postCategoryName}
          {/* Cafe Bilhares */}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.location} />
          <Text style={{ fontFamily: "SemiBold", fontSize: 10 }}>
            {address?.includes(",")
              ? address?.substring(address?.indexOf(",") + 1).trim()
              : address}
            {/* Rewa boda bag mp */}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 7,
          }}
        >
          <Image
            source={{ uri: paramUser?.image?.[0] || paramUser?.imageUrls?.[0] }}
            // source={require("../../assets/icons/fixedHeight.png")}
            style={{ width: "100%", height: 180, resizeMode: "stretch" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#F4A099",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>
              {paramUser?.subRole || paramUser?.role}
              {/* donar */}
            </Text>
          </View>
          {/* <View
            style={{
              backgroundColor: "#F5F6F7",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>2.2kms</Text>
          </View> */}
          {/* <View
            style={{
              backgroundColor: "#F5F6F7",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontFamily: "Medium", fontSize: 10 }}>
              5 Delivery
            </Text>
          </View> */}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              gap: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                borderColor: "red",
                borderRadius: 10,
                borderWidth: 1,
                padding: 7,
              }}
            >
              <Text>4.2</Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Medium", fontSize: 7 }}>
                Very Good 54 reviews
              </Text>
            </View>
          </View>
        </View>
        <View>
          {paramUser?.name ? (
            <Measure email={paramUser?.email} />
          ) : (
            <View
              style={{
                backgroundColor: "#EFEDF8",
                borderColor: "#B4AAF2",
                borderRadius: 5,
                padding: 10,
                gap: 5,
                marginTop: 10,
              }}
            >
              <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                {paramUser?.role === "needy"
                  ? "Food Needed"
                  : "Food Availability"}
              </Text>
              {paramUser?.listItems?.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontFamily: "Medium", fontSize: 13 }}>
                    {item.value}
                  </Text>
                  <View style={styles.footer}>
                    <Text style={styles.quantity}>
                      {item.quantity}/{item.quantityType}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {/* user.email */}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            // marginVertical: 10,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <Image
            source={
              {
                uri: paramUser?.photo,
              } || icons.profile
            }
            // source={require("../../assets/icons/profile.png")}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <View>
            <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
              {paramUser?.userName || paramUser?.name}
              {/* Sourav Paul */}
            </Text>
            <Text style={{ fontFamily: "Medium", fontSize: 12 }}>
              {paramUser?.role}
              {/* Restaurent owner */}
            </Text>
          </View>
        </View>
        {/* paramUser?.role === "donor" */}
        <View style={{ flex: 1, alignItems: "center", gap: 10, marginTop: 10 }}>
          {allData?.guestData !== "guest" ? (
            <>
              <CustomButton
                onPress={() => {
                  onAccept();
                }}
                text="Accept"
                type="primary"
                disabled={isButtonDisabled}
                loading={isButtonDisabled}
              />
              <CustomButton onPress={onDecline} text="Decline" type="primary" />
            </>
          ) : (
            <>
              <CustomButton
                onPress={() => navigation.navigate("home")}
                text="Back to home"
                type="primary"
              />
            </>
          )}
        </View>
      </View>
    </Container>
  );
};

export default DonorPage;
const styles = StyleSheet.create({
  footer: {
    borderColor: "#B4AAF2",
    borderRadius: 7,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
});
