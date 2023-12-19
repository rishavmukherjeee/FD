import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import icons from "../../assets/icons";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Settings = () => {
  const { allData, user, loading, signOutUser } = userContext();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    if (user?.email) {
      await signOutUser();
      navigation.navigate("initial");
    } else {
      navigation.navigate("login");
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>Settings</Header>
      <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            {allData?.guestData ? (
              <Image
                style={{ height: 40, width: 40, borderRadius: 50 }}
                source={icons.profile}
              />
            ) : (
              <Image
                style={{ height: 40, width: 40, borderRadius: 50 }}
                source={{ uri: allData?.userData?.photo }}
              />
            )}
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "SemiBold", fontSize: 18 }}>
                {allData?.userData?.name || allData?.guestData}
              </Text>
              <Text style={{ fontFamily: "Medium", fontSize: 14 }}>
                {allData?.userData?.subRole}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={handleSignOut}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{ fontFamily: "SemiBold", color: "#7A797C", marginTop: 10 }}
        >
          General
        </Text>
        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.user} />
          <Text style={styles.optionText}>Personal Profile</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.appearence} />
          <Text style={styles.optionText}>Appearance</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.ResProfile} />
          <Text style={styles.optionText}>
            {allData?.userData?.subRole} Profile
          </Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.notifications} />
          <Text style={styles.optionText}>Notifications</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.previous} />
          <Text style={styles.optionText}>Previous Donates</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <Text
          style={{ fontFamily: "SemiBold", fontSize: 14, color: "#7A797C" }}
        >
          Stay in Touch
        </Text>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.contact} />
          <Text style={styles.optionText}>Contact Us</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Image source={icons.share} />
          <Text style={styles.optionText}>Share With Peers</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("terms")}
        >
          <Feather name="file-text" size={24} color="black" />
          <Text style={styles.optionText}>Terms and Conditions</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate("dashboard")}
        >
          <FontAwesome name="dashboard" size={24} color="black" />
          <Text style={styles.optionText}>Dashboard</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  optionText: {
    fontFamily: "Medium",
    color: "#000000",
    fontSize: 14,

    marginLeft: 10,
  },
});

export default Settings;
