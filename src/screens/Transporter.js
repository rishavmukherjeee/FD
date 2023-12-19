import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { userContext } from "../context/Provider";

import useUpdateUser from "../hook/useUpdateSubRoleUser";
import CustomAlert from "../components/CustomAlert";

const Transporter = () => {
  const [update, setUpdate] = useState("");

  const [errorMessage, setError] = useState("");


  const { user } = userContext();
  const { loading, error, updateUserRole } = useUpdateUser();

  const onRoleSelect = async () => {
    updateUserRole(update, user?.email, "addRestaurant");
  };

  if (error) return setError(error);

  if (loading) return <Loading />;

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
          Transporter,
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
            update === "Non-Profit Organization" && styles.selectedBox,
          ]}
          onPress={() => setUpdate("Non-Profit Organization")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Non-Profit Organization
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
          style={[styles.box, update === "Food Banks" && styles.selectedBox]}
          onPress={() => setUpdate("Food Banks")}
        >
          <Text
            style={{ fontFamily: "SemiBold", fontSize: 14, color: "#252525" }}
          >
            Food Banks
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
          bottom: 200,
        }}
      >
        {(errorMessage) && <CustomAlert type="error" value={errorMessage} />}

        <CustomButton text="Continue" onPress={onRoleSelect} type="primary" />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
    bottom: 150,
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

export default Transporter;
