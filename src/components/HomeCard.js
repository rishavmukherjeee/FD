import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import icons from "../../assets/icons";
import TimeLimitComponent from "../screens/TimeLimitComponent";
import FadeView from "./fadeView";

const HomeCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <FadeView>
      <View key={item._id} style={styles.cardContainer}>
        <Pressable
          onPress={() => navigation.navigate("donorPage", { user: item })}
        >
          <Image
            source={{ uri: item?.imageUrls?.[0] } || icons.fixedHeight}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </Pressable>
        <Text style={styles.cardDescription}>{item?.caption}</Text>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainerProfile}>
            <Image
              source={{ uri: item?.photo } || icons.profile}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={{ fontFamily: "SemiBold", fontSize: 16 }}>
              {item?.userName}
            </Text>
            <Text style={styles.profileText}>{item?.postCategoryName}</Text>
            {/* <Text style={styles.roleText}>
            {item?.role?.replace(/^./, item?.role[0].toUpperCase())}
          </Text> */}
          </View>
        </View>
        {item?.role === "donor" && (
          <View style={styles.contentCard}>
            <View style={styles.cardItemsContainer}>
              <View style={styles.textItem1}>
                <Image source={icons.time} />
                <Text>
                  <TimeLimitComponent
                    key={item?._id}
                    previousTime={item?.updatedAt}
                    countTime={item?.expiredTime}
                  ></TimeLimitComponent>
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </FadeView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
    paddingHorizontal: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 5,
  },
  contentCard: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  cardDescription: {
    fontSize: 16,
    color: "#888888",
    marginTop: 15,
    paddingHorizontal: 15,
  },
  cardItemsContainer: {
    flexDirection: "row",
  },
  textItem1: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    fontSize: 12,
    marginRight: 16,
    backgroundColor: "#F4A099",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 25,
  },
  textItem2: {
    fontSize: 14,
    marginRight: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 10,
  },
  imageContainerProfile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16,
  },
  profileTextContainer: {
    // alignSelf: "center",
    // flexDirection: "column",
  },
  profileText: {
    fontSize: 14,
    // marginTop: 8,
  },
  profileImage: {
    flex: 1,
    width: null,
    height: null,
  },
  roleText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default HomeCard;
