import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import useUpdateUser from "../hook/useUpdateSubRoleUser";
import CustomAlert from "../components/CustomAlert";

const Donor = () => {
  const [update, setUpdate] = useState("");
  const [errorMessage, setError] = useState("");

  const { user } = userContext();
  const { loading, error, updateUserRole } = useUpdateUser();

  const onRoleSelect = async () => {
    updateUserRole(update, user?.email, "addRestaurant");
  };

  if (error) return setError(error);

  // if (loading) return <Loading />;
  return (
    <Container>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          alignSelf: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "SemiBold",
            fontSize: 20,
            color: "#B4AAF2",
          }}
        >
          Donor,
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          bottom: 130,
        }}
      >
        <Header>Choose Your Role</Header>
      </View>
      <View style={styles.boxContainer}>
        <Pressable
          style={[
            styles.box,
            update === "Restaurant Owner" && styles.selectedBox,
          ]}
          onPress={() => setUpdate("Restaurant Owner")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Restaurant
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who donates the food
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.box,
            update === "Catering Services" && styles.selectedBox,
          ]}
          onPress={() => setUpdate("Catering Services")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Catering Services
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>
        <Pressable
          style={[styles.box, update === "Grocery Store" && styles.selectedBox]}
          onPress={() => setUpdate("Grocery Store")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Grocery Store
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Grocery Store
          </Text>
        </Pressable>
        <Pressable
          style={[styles.box, update === "Normal People" && styles.selectedBox]}
          onPress={() => setUpdate("Normal People")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Volunteer
          </Text>
          <Text
            style={{
              fontFamily: "Medium",
              fontSize: 13,
              color: "#667085",
              paddingVertical: 8,
            }}
          >
            Person or an Organization who needs the food
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          width: "90%",
          alignItems: "center",
          marginTop: 20,
          bottom: 80,
        }}
      >
        {errorMessage && <CustomAlert type="error" value={errorMessage} />}
        <CustomButton text="Continue" onPress={onRoleSelect} 
        loading={loading}
        disabled={loading}
        type="primary" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    bottom: 30,
  },
  box: {
    width: 340,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
    bottom: 80,
  },
  selectedBox: {
    backgroundColor: "#efedf8",
    borderWidth: 1,
    borderColor: "#B4AAF2",
    borderRadius: 6,
  },
});

export default Donor;
