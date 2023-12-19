import React, { useState, useRef, useEffect } from "react";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { StyleSheet, View, Button, Platform, Text } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { userContext } from "../context/Provider";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const showNotification = (title, body, data) => {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: data,
    },
    trigger: null,
  });
};

export default function BackgroundFetchScreen() {
  const { user, setAllData } = userContext();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [state, setState] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const checkForOrderStatus = async () => {
    if (user?.email != null) {
      try {
        const response = await axios.get(
          `https://food-donation-backend.vercel.app/api/v1/users?email=${user?.email}`
        );
        // console.log(
        //   user?.role + "AND856" + response.data.data.donorNotification
        // );
        if (response.data.data.donorNotification == true) {
          await schedulePushNotification(
            "Order Accepted",
            "Your order has been accepted by a volunteer",
            { data: "goes here" }
          );
          showNotification(
            "Order Accepted",
            "Your order has been accepted by a volunteer",
            "goes here"
          );
        }
      } catch (error) {
        console.log("notification not triggred", error);
      }
    }
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      checkForOrderStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [state]);

  const goToForegroundScreen = () => {
    navigation.navigate("user");
  };

  React.useEffect(() => {
    setTimeout(goToForegroundScreen, 500);
  }, []);
  return null;
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
