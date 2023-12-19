import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { userContext } from "../context/Provider";
import ConfettiModal from "./ConfettiModal";
import CustomButton from "./CustomButton";
import Loading from "./Loading";
import TextField from "./TextField";
const SearchHeader = () => {
  const { allData, user, loading, signOutUser } = userContext();
  const navigation = useNavigation();

  const [closeModal, setCloseModal] = useState(false);
  const [value, setValue] = useState(null);
  const handleValue = (value) => {
    const filterNumber = value.replace(/[^0-9]/g, "");
    setValue(filterNumber);
  };
  const onClose = () => {
    setCloseModal(false);
  };

  const payNow = () => {
    const email = user?.email;
    const name = user?.displayName;
    const mobile = allData?.userData?.phone;
    const userId = allData?.userData?._id;
    var options = {
      description: "Credits towards consultation",
      image: "https://i.ibb.co/89GD3cS/adaptive-icon.png",
      currency: "INR",
      key: "rzp_test_P8O8kQ18tBojQq",
      amount: value * 100,
      name: "Bhojan Mitra",
      order_id: "", //Replace this with an order_id created using Orders API.
      prefill: {
        email,
        contact: mobile,
        name,
      },
      theme: { color: "#53a20e" },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        alert(error.error.description);
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <ConfettiModal visible={closeModal}>
        <Text
          style={{ textAlign: "right", fontSize: 16, fontWeight: "bold" }}
          onPress={() => setCloseModal(false)}
        >
          X
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginBottom: 30,
            fontWeight: 600,
            color: "#B4AAF2",
          }}
        >
          Donate Now!!
        </Text>

        <TextField
          placeholder={"Enter Your Amount"}
          value={value}
          setValue={handleValue}
          width="100%"
        />

        <CustomButton
          text="Pay Now"
          onPress={() => (setCloseModal(false), payNow())}
          type="primary"
        />
      </ConfettiModal>
      <View style={styles.headerView}>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.typography}>
            <Text style={{ fontSize: 18, color: "#B4AAF2" }}> Welcome,</Text>{" "}
          </Text>
          <Text style={{ marginLeft: 10 }}>
            {allData?.userData?.name || "Guest"}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCloseModal(true)}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#B4AAF2",

              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 8,
              gap: 3,
              alignItems: "center",
            }}
          >
            <FontAwesome name="dollar" size={16} color="white" />
            <Text
              style={{
                color: "white",
                fontFamily: "Medium",
                fontSize: 16,
              }}
            >
              Donate
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="ios-settings-outline" size={30} color="#B4AAF2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 8,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchView: {
    justifyContent: "flex-end",
    marginHorizontal: 15,
  },
  typography: {
    fontFamily: "SemiBold",
    fontSize: 20,
  },
});

export default SearchHeader;
