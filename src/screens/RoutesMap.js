import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { userContext } from "../context/Provider";
import { useRoute } from "@react-navigation/native";
import useFetchData from "../hook/useFetchData";
import MapViewDirections from "react-native-maps-directions";
import { getDatabase, ref, set, onValue } from "@firebase/database";
import * as Location from 'expo-location'; // Import the Location module

async function askLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  let { status: status2 } = await Location.requestBackgroundPermissionsAsync();

  let location = await Location.getCurrentPositionAsync({});
  return location;
}

const GOOGLE_MAPS_APIKEY = "AIzaSyD7TKiBE0n8EsPH_snI7QjhGFagY0Vq3FQ";

const RoutesMap = () => {
  const route = useRoute();
  

  const [otherUsers, setOtherUsers] = useState({});
  const { userchatId } = route.params;
  const { allData } = userContext();
  const { emaill } = route.params;
  const { loading, error, data } = useFetchData(`users?email=${emaill}`);
  const [directions, setDirections] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null); // State for current location
  const initialRegion = {
    latitude: allData.userData.location.latitude,
    longitude: allData.userData.location.longitude,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };
 
    const updateRealTime = async () => {
      const result = await askLocationPermission();
      if (result) {
        const { coords } = result;
        setCurrentLocation(coords); // Update current location
        set(
          ref(
            getDatabase(),
            `location/${userchatId}/` )
          ,
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
          }
        );
      }
    };
    console.log(allData.userData.role)
    const interval = setInterval(updateRealTime, 5000); // Update location every 5 seconds

    const fetchOtherUsers = () => {
      const dbRef = ref(getDatabase(), `location/${userchatId}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCurrentLocation(data);
        }
      });
    };

    const intervalId = setInterval(fetchOtherUsers, 5000);
//IF doner drops ask for doner location 
useEffect(() => {
  onValue(ref(getDatabase(), `${allData.userData.email.replace(/[@.]/g, "")}}/pickup`), (snapshot) => {
    const data = snapshot.val();
    if (data) {
     console.log(Object.values(data));
      if (Object.values(data).pickup=='Drop' && Object.values(data).role=='Donor')
      { console.log("Donor drop")
        interval;
      }
      
    }
  });
}, []);

if(allData.userData.role=='needy'){
  console.log("needy")
  intervalId;
}

//if doner pickup ask for neeedy location

  useEffect(() => {
    if (allData.userData?.location && data?.location) {
      // Calculate the shortest route between the two locations
      const origin = {
        latitude: allData.userData.location.latitude,
        longitude: allData.userData.location.longitude,
      };

      const destination = {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      };

      setDirections([{ origin, destination }]);
    }
  }, [allData, data]);

 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        
       {allData.userData?.location  &&(
          <Marker
            coordinate={{
              latitude: allData.userData.location.latitude,
              longitude: allData.userData.location.longitude,
            }}
          />
        )}
        {data?.location  &&(
          <Marker
            coordinate={{
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            }}
            pinColor="yellow" // Set marker color to yellow
          />
        )} 
        {currentLocation && ( // Check if currentLocation is available
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            pinColor="green" // Set marker color to green
          />
        )} 

        {directions.map((direction, index) => (
          <MapViewDirections
            key={index}
            origin={direction.origin}
            destination={direction.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        ))}
      </MapView>
    </View>
  );
};

export default RoutesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
