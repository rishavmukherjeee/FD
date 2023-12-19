import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { userContext } from "../context/Provider";
import useFetchData from "../hook/useFetchData";
import CustomAlert from "./CustomAlert";
import Loading from "./Loading";
import MapCallout from "./MapCallout";
import SearchHeader from "./SearchHeader";
const origin = { latitude: 11.70484, longitude: 92.715733 };
const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const UserMap = () => {
  const navigation = useNavigation();
  const [serach, setSearch] = useState(0);

  const [errorMessage, setError] = useState("");

  const { user, setAllData } = userContext();

  const { loading, error, data } = useFetchData(`users?email=${user?.email}`);

  const [data2, setData] = useState(null);
  const [loading2, setLoading] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://food-donation-backend.vercel.app/api/v1/users/map?latitude=${data?.location?.latitude}&longitude=${data?.location?.longitude}&role=${data?.role}`
        );
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError2(error);
        setLoading(false);
      }
    };
    if (data?.role) {
      fetchData();
    }
  }, [data?.location?.latitude, data?.location?.longitude, data?.role]);

  const setLoadingState = async (value) => {
    try {
      await AsyncStorage.setItem("loadingState", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data && data2) {
      setAllData((prev) => ({
        ...prev,
        userData: data,
        data2: [...data2],
      }));
    }
  }, [data, data2, setAllData]);
  if (loading || loading2) {
    setLoadingState(1);
    return <Loading />;
  }
  setLoadingState(0);
  if (error) return setError(error.message);
  return (
    <View style={styles.mapContainer}>
      <View style={{ marginHorizontal: 10 }}>
        <SearchHeader />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: 30,
          columnGap: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location" size={20} color="red" />
          <Text>
            {data?.role?.charAt(0)?.toUpperCase() + data?.role?.slice(1)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location" size={20} color="yellow" />
          <Text>{data?.role === "needy" ? "Donor" : "Needy"}</Text>
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          ...data?.location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          pinColor="red"
          coordinate={{
            ...data?.location,
          }}
        >
          <Callout
          // onPress={() => navigation.navigate("donorPage", { user: data })}
          >
            <MapCallout user={data} />
          </Callout>
        </Marker>

        {data2?.map((user, i) => (
          <Marker
            key={i}
            pinColor="yellow"
            coordinate={{
              ...user?.location,
            }}
          >
            <Callout onPress={() => navigation.navigate("donorPage", { user })}>
              {errorMessage && (
                <CustomAlert type="error" value={errorMessage} />
              )}

              <MapCallout user={user} key={i}></MapCallout>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 100,
    marginBottom: 50,
    marginHorizontal: 15,
  },
});

export default UserMap;
