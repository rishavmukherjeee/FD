import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, onValue, off, ref } from "firebase/database";
import { userContext } from "../context/Provider";
import SecuredChat from "./SecuredChat";
import RoutesMap from "./RoutesMap";

export function RandomNumber() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
}

const Users = () => {
  const [users, setUsers] = useState([
    {
      chatid: 1,
      name: "Global",
      message: "Welcome to global Chat",
      profileImage: require("../../assets/icons/profile.png"),
    },
  ]);
  const [messages, setMessages] = useState([]);

  const { user } = userContext();

  useEffect(() => {
    const databaseRef = ref(getDatabase(), user?.email.replace(/[@.]/g, ""));
  
    const handleSnapshot = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedUsers = Object.values(data);
        
        // Check for duplicate chatids
        const uniqueUsers = fetchedUsers.reduce((acc, curr) => {
          const existingUser = acc.find(user => user.chatid === curr.chatid);
          if (!existingUser) {
            return [...acc, curr];
          }
          return acc;
        }, []);
  
        setUsers(uniqueUsers);
  
     
      }
    };
  
    onValue(databaseRef, handleSnapshot);
  
    return () => {
      off(databaseRef, handleSnapshot);
    };
  }, [user]);

// console.log(user.chatid)
//   useEffect(() => {
//     const databaseRef = ref(getDatabase(), `rooms/${user.chatid}/messages`);
//     const handleSnapshot = (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const fetchedMessages = Object.values(data);
//         setMessages(fetchedMessages);
//         console.log(fetchedMessages);
//       }
//     };
//     onValue(databaseRef, handleSnapshot);
    
//   }, [user]);

  


  

  const navigation = useNavigation();

  const handleUserPress = (userchatId, user, emaill) => {
    navigation.navigate("SecuredChat", { userchatId, user, emaill });
  };
  return (
    <View style={{ marginTop: 30, marginBottom: 50 }}>
      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity
            key={user.chatid}
            onPress={() =>
              handleUserPress(
                user.chatid.replace(/[@.]/g, ""),
                user.name,
                user.mail
              )
            }
          >
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                alignItems: "center",
              }}
            >
              <Image
           source={
            typeof user.profileImage === 'string'
      ? { uri: user.profileImage }
      : user.profileImage
  
  }
  style={{ width: 60, height: 60, borderRadius: 30 }}
/>



              <View>
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", paddingLeft: 20 }}
                >
                  {user.name}
                </Text>
                <Text style={{ fontSize: 15, paddingLeft: 20 }}>
                  {user.message}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const exportUserChatId = () => {
  const route = useRoute();
  return route.params?.userchatId;
};

const Stack = createNativeStackNavigator();

const Chat = () => {
  const userchatId = exportUserChatId();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen
        name="SecuredChat"
        component={SecuredChat}
        initialParams={{ userchatId }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Routes"
        component={RoutesMap}
        initialParams={{ userchatId }}
      />
    </Stack.Navigator>
  );
};

export default Chat;

const styles = StyleSheet.create({
  // Your styles here
});
