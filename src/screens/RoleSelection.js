import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import icons from "../../assets/icons";
import CustomButton from "../components/CustomButton";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Container from "../components/container";

const RoleSelection = () => {
  const navigation = useNavigation();
  const [update, setUpdate] = useState("");
  const [updatecategory, setUpdatecategory] = useState("");
  const [n, setn] = useState(0);
  // const { user } = userContext();

  const [loading, setLoading] = useState(false);
  const [donaropen, setDonaropen] = useState(false);
  const [transporteropen, setTransporteropen] = useState(false);
  const [foodneederopen, setFoodneederopen] = useState(false);

  const AniDonar = useRef(new Animated.Value(1500)).current;
  const Anitransporter = useRef(new Animated.Value(1500)).current;
  const Anifoodneeder = useRef(new Animated.Value(1500)).current;

  function DonarAni() {
    Animated.timing(AniDonar, {
      toValue: !donaropen ? -20 : 1500,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  function transporterAni() {
    Animated.timing(Anitransporter, {
      toValue: !transporteropen ? -20 : 1500,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  function foodneederAni() {
    Animated.timing(Anifoodneeder, {
      toValue: !foodneederopen ? -20 : 1500,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }

  const toggle = (n) => {
    if (!foodneederopen && !transporteropen && n === 1) {
      setDonaropen((prev) => !prev);
      DonarAni();
    } else if (!donaropen && !foodneederopen && n === 2) {
      setTransporteropen((prev) => !prev);
      transporterAni();
    } else if (!donaropen && !transporteropen && n === 3) {
      setFoodneederopen((prev) => !prev);
      foodneederAni();
    }
  };

  function Check() {
    console.warn("clicked");
  }

  if (loading) return <Loading />;
  return (
    <Container>
      <Header style={{ color: "#B4AAF2" }}>Welcome,</Header>
      <Header>Choose Your Role</Header>

      <View style={styles.boxContainer}>
        <Pressable
          style={[styles.box, update === "donor" && styles.selectedBox]}
          onPress={() => {
            setUpdate("donor"), toggle(1);
          }}
        >
          <Text style={styles.title}>Donor</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who donates the food
          </Text>
        </Pressable>

        <Pressable
          style={[styles.box, update === "transporter" && styles.selectedBox]}
          onPress={() => {
            setUpdate("transporter"), toggle(2);
          }}
        >
          <Text style={styles.title}>Transporter</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who helps Transporting the food
          </Text>
        </Pressable>

        <Pressable
          style={[styles.box, update === "needy" && styles.selectedBox]}
          onPress={() => {
            setUpdate("needy"), toggle(3);
          }}
        >
          <Text style={styles.title}>Food Needy</Text>
          <Text style={styles.subTitle}>
            Person or an Organization who needs the food
          </Text>
        </Pressable>
      </View>
      {/* <View style={styles.btnContainer}>
        <CustomButton
          text="Continue"
          onPress={() => {
            toggle();
          }}
          type="primary"
        />
      </View> */}
      {/* //////////////////////////////////1111 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: AniDonar }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}> Donor,</Header>
          <Pressable
            style={{ padding: 10 }}
            onPress={() => {
              toggle(1);
            }}
          >
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "Restaurant" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Restaurant")}
          >
            <Text style={styles.title}>Restaurant</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Catering Service" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Catering Service")}
          >
            <Text style={styles.title}>Catering Service</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Grocery Store" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Grocery Store")}
          >
            <Text style={styles.title}>Grocery Store</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Normal People" && styles.selectedBox,
            ]}
            onPress={() => {
              setUpdatecategory("Normal People");
            }}
          >
            <Text style={styles.title}>Normal people</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who donates the food
            </Text>
          </Pressable>
        </View>
        <View style={{ flex: 1, alignSelf: "center", width: "95%" }}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
      {/* //////////////////////////////////222 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: Anitransporter }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}> Transporter,</Header>

          <Pressable
            style={{ padding: 10 }}
            onPress={() => {
              toggle(2);
            }}
          >
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "Non Profit" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Non Profit")}
          >
            <Text style={styles.title}>Non profit Organization</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who helps Transporting the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Food Banks" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Food Banks")}
          >
            <Text style={styles.title}>Food Bank</Text>
            <Text style={styles.subTitle}>
              Food Bank here helps in transporting the food
            </Text>
          </Pressable>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
      {/* /////////////////////////////3333 */}
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          height: 500,
          backgroundColor: "#fff",
          top: 30,
          paddingHorizontal: 10,
          paddingVertical: 20,
          transform: [{ translateY: Anifoodneeder }],
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Header style={{ color: "#B4AAF2" }}>Food Needy,</Header>

          <Pressable
            style={{ padding: 10 }}
            onPress={() => {
              toggle(3);
            }}
          >
            <Image style={{ width: 20, height: 20 }} source={icons.close} />
          </Pressable>
        </View>
        {/* <Header>Choose Your Role</Header> */}
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Pressable
            style={[
              styles.box,
              updatecategory === "Non Profit" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Non Profit")}
          >
            <Text style={styles.title}>Non profit Organization</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Orphanage" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Orphanage")}
          >
            <Text style={styles.title}>Orphanage</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.box,
              updatecategory === "Food Banks" && styles.selectedBox,
            ]}
            onPress={() => setUpdatecategory("Food Banks")}
          >
            <Text style={styles.title}>Food Bank</Text>
            <Text style={styles.subTitle}>
              Person or an Organization who needs the food
            </Text>
          </Pressable>
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            text="Continue"
            onPress={() =>
              navigation.navigate("addRestaurant", {
                role: update,
                subRole: updatecategory,
              })
            }
            type="primary"
          />
        </View>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    // flex: 1,
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "#252525",
  },
  subTitle: {
    fontFamily: "Medium",
    fontSize: 13,
    color: "#667085",
    paddingVertical: 8,
  },
  btnContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
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
  },
  selectedBox: {
    backgroundColor: "#efedf8",
    borderWidth: 1,
    borderColor: "#B4AAF2",
    borderRadius: 6,
  },
  Modalbox: {
    width: "100%",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 20,
    marginVertical: 5,
    alignItems: "flex-start",
    borderRadius: 10,
    backgroundColor: "#F5F6F7",
    borderColor: "#F5F6F7",
  },
});
export default RoleSelection;
