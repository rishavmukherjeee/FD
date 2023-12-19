import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  get,
} from "firebase/database";
import { Marker, MapView } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/FontAwesome";
import { encryptMessage, decryptMessage } from "./Encrypt";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { auth, userContext } from "../context/Provider";
import leftArrow from "../../assets/icons/backbutton.png";
import useFetchData from "../hook/useFetchData";
import send from "../../assets/icons/send.png";
import TextField from "../components/TextField";
import CustomButton from "../components/CustomButton";
const db = getDatabase();

function Message({ item }) {
  const { user } = userContext();
  const decryptedText = decryptMessage(item.text);
  //console.log(user)
  const isCurrentUser = item.user === user.displayName || item.user === user.email;

  return (
    <View
      style={[styles.message, isCurrentUser ? styles.currentUserMessage : null]}
    >
      <Text style={[styles.user1]}>{item.user}</Text>
      <Text
        style={[styles.text, isCurrentUser ? styles.currentUserText : null]}
      >
        {decryptedText}
      </Text>
      <Text
        style={[styles.date, isCurrentUser ? styles.currentUserDate : null]}
      >
        {new Date(item.createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );
}

const SecuredChat = () => {
  const navigation = useNavigation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = userContext();
  const route = useRoute();
  const { userchatId } = route.params;
  const { user: ouser } = route.params;
  const { emaill } = route.params; //opponent user email

  const id = (email1, email2) => {
    return [email1, email2].sort().join();
  };
  const chatId = id(user.email, emaill);

  function deleteChat() {
    set(ref(db, `rooms/${userchatId}`), null);

    const pushTokenRef = ref(db, `${user.email.replace(/[@.]/g, "")}`);
    get(pushTokenRef).then((snapshot) => {
      const data = snapshot.val();
      const newData = {};
      Object.keys(data).forEach((key) => {
        if (data[key].chatid !== chatId) {
          newData[key] = data[key];
        }
      });

      set(pushTokenRef, newData);
    });

    const pushTokenRef2 = ref(db, `${emaill.replace(/[@.]/g, "")}`);
    get(pushTokenRef2).then((snapshot) => {
      const data = snapshot.val();
      const newData = {};
      Object.keys(data).forEach((key) => {
        if (data[key].chatid !== chatId) {
          newData[key] = data[key];
        }
      });

      set(pushTokenRef2, newData);
    });

    /*pushTokenRef.orderByChild('chatid').equalTo(chatId).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const pushToken = childSnapshot.val().pushToken;
            console.log(pushToken); // Display the push token
            // Or use it in your desired way
        });
    });*/

    navigation.goBack();
  }
  useEffect(() => {
    onValue(ref(db, `rooms/${userchatId}/messages`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, []);
  const emailll = user?.email;
  function handleYes() {
    push(ref(getDatabase(), "FoodDelivery"), {
      email: emailll,
      Delivered: "Yes",
    });
    Alert.alert(
      "Thank You",
      "By clicking 'Yes,' you are confirming that you no longer need this chat and it will be deleted.",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteChat();
          },
        },
        {
          text: "No",
          style: "cancel",
          onPress: () => {
            Alert.alert("Food not yet Delivered");
          },
        },
      ]
    );
  }
  function handleNo() {
    push(ref(getDatabase(), "FoodDelivery"), {
      email: emailll,
      Delivered: "No",
    });
    Alert.alert("Food Not delivered ? \n  We will look into this matter");
  }
  function sendMessage() {
   
      const encryptedMessage = encryptMessage(message.trim());
      const newMessage = {
        id: Date.now().toString(),
        text: encryptedMessage,
        user: user?.displayName || user.email,
        createdAt: new Date().toISOString(),
      };

    push(ref(db, `rooms/${userchatId}/messages`), newMessage);
  }

  function renderItem({ item }) {
    return <Message item={item} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50 }}>
        <TouchableOpacity>
          <Text
            style={{
              position: "absolute",
              padding: 10,
              top: 10,
              left: 100,
              zIndex: 1,
              fontSize: 25,
            }}
          >
            {ouser}
          </Text>
        </TouchableOpacity>

        <View style={{ position: "absolute", top: 60, right: 10 }}>
          <CustomButton
            text="Map"
            type="primary"
            onPress={() =>
              navigation.navigate("Routes", { userchatId, emaill })
            }
          ></CustomButton>
        </View>
      </View>
      <View style={{ paddingTop: 20, paddingLeft: 10 }}>
        <TouchableOpacity>
          <Text
            style={{
              position: "absolute",
              padding: 10,
              top: 50,
              left: 10,
              zIndex: 1,
              fontSize: 18,
            }}
          >
            Is food delivered?
          </Text>
          <TouchableOpacity onPress={handleYes}>
            <Text
              style={{
                color: "green",
                position: "absolute",
                padding: 10,
                top: 50,
                left: 180,
                zIndex: 1,
                fontSize: 18,
              }}
            >
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNo}>
            <Text
              style={{
                color: "red",
                position: "absolute",
                padding: 10,
                top: 50,
                left: 220,
                zIndex: 1,
                fontSize: 18,
              }}
            >
              No
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <FlatList
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
        style={styles.messagesContainer}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon
            name="camera"
            size={25}
            color="#999"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Image
            style={{ width: 30, height: 30, marginHorizontal: 5 }}
            source={send}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SecuredChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  messagesContainer: {
    flex: 1,
    marginTop: 90,
    marginHorizontal: 10,
  },
  message: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingRight: 20,
  },
  text: {
    fontSize: 16,
  },
  date: {
    fontSize: 8,
    color: "#666",
    marginLeft: 5,
    alignSelf: "flex-end",
  },
  currentUserMessage: {
    backgroundColor: "#B4AAF2",
    alignSelf: "flex-end",
  },
  currentUserText: {
    color: "#000",
  },
  currentUserDate: {
    color: "#444",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
    marginBottom: 80,
  },
  cameraIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    bottom: 0,
  },
  sendButton: {
    color: "blue",
  },
  user1: {
    fontSize: 12,
    color: "green",
  },
});
