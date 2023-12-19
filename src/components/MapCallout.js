import React from "react";
import { Image, Platform, View } from "react-native";
import { WebView } from "react-native-webview";

const MapCallout = ({ user }) => {
  const isAndroid = Platform.OS === "android";
  return (
    <View style={{ padding: 10, maxWidth: 120, alignItems: "center" }}>
      {isAndroid ? (
        <WebView
          source={{
            uri: user?.image?.[0] || user?.imageUrls?.[0],
          }}
          style={{ borderRadius: 10, width: 120, height: 100 }}
        />
      ) : (
        <Image
          source={{
            uri: user?.image?.[0] || user?.imageUrls?.[0],
          }}
          style={{ borderRadius: 10, width: 120, height: 100 }}
        />
      )}
    </View>
  );
};

export default MapCallout;
