import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Chat from "../screens/Chat";
import Donor from "../screens/Donor";
import FoodNeedier from "../screens/FoodNeedier";
import Home from "../screens/Home";
import InitialPage from "../screens/InitialPage";
import Intro from "../screens/Intro";
import Login from "../screens/Login";
import Otp from "../screens/Otp";
import RoleSelection from "../screens/RoleSelection";

import AddRestaurant from "../screens/AddRestaurant";
import Donate from "../screens/Donate";
import DonateMeal from "../screens/DonateMeal";
import DonorPage from "../screens/DonorPage";
import Profile from "../screens/Profile";

import AnimatedButton from "../components/AnimatedButton";
import Onboarding from "../components/Carousel/Onboarding";
import CustomField from "../components/CustomField";
import CustomModal from "../components/CustomModal";
import CustomTouch from "../components/CustomTouch";
import DropDown from "../components/DropDown";
import TextField from "../components/TextField";
import BackgroundFetchScreen from "../screens/BackgroundFetchScreen";
import CommunityPost from "../screens/CommunityPost";
import DashBoard from "../screens/DashBoard";
import Settings from "../screens/Settings";
import Signup from "../screens/Signup";
import TermsAndConditions from "../screens/TermsAndConditions";
import Transporter from "../screens/Transporter";
import BottomNav from "./BottomNav";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"initial"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="initial" component={InitialPage} />

        <Stack.Screen name="input" component={CustomField} />
        <Stack.Screen name="TextField" component={TextField} />
        <Stack.Screen name="touch" component={CustomTouch} />
        <Stack.Screen name="modal" component={CustomModal} />
        <Stack.Screen name="DropDown" component={DropDown} />
        {/* <Stack.Screen name="community" component={Community} /> */}
        <Stack.Screen name="communityPost" component={CommunityPost} />
        <Stack.Screen name="onBoarding" component={Onboarding} />
        <Stack.Screen name="aniBtn" component={AnimatedButton} />
        {/* <Stack.Screen name="communityItem" component={CommunityItem} /> */}

        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="roleSelection" component={RoleSelection} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="otp" component={Otp} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="terms" component={TermsAndConditions} />
        <Stack.Screen name="background" component={BackgroundFetchScreen} />

        <Stack.Screen name="needy" component={FoodNeedier} />
        <Stack.Screen name="transporter" component={Transporter} />
        <Stack.Screen name="donor" component={Donor} />
        <Stack.Screen name="donorPage" component={DonorPage} />
        <Stack.Screen name="addRestaurant" component={AddRestaurant} />
        <Stack.Screen name="DonateMeal" component={DonateMeal} />
        <Stack.Screen name="donate" component={Donate} />
        <Stack.Screen name="dashboard" component={DashBoard} />

        {/* <Stack.Screen name="profile" component={Profile} /> */}
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="home" component={Home} />
        {/* <Stack.Screen name="Notify" component={Notify} /> */}
        <Stack.Screen name="user">
          {() => (
            <Stack.Navigator
              initialRouteName="User"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="User" component={BottomNav} />
            </Stack.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
