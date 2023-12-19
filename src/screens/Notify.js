import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const registerForPushNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to send notifications denied');
      return;
    }
  };
  const getExpoPushToken = async () => {
    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
  };

  const Notify = async() => {

  registerForPushNotifications(); // Request permission
  const expoPushToken = await getExpoPushToken();
  console.log(expoPushToken); // Output the Expo push token
    };
export default Notify;