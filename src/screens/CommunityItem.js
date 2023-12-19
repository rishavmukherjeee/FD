import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import FadeView from "../components/fadeView";

const CommunityItem = ({ item }) => {
  const date = new Date(item?.date);
  return (
    <FadeView>
      <View style={styles.cardContainer}>
        <Image
          source={{ uri: item?.imageUrls?.[0] } || icons.fixedHeight}
          style={styles.cardImage}
          resizeMode="cover"
        />

        <Text style={styles.cardDescription}>{item?.description}</Text>

        <View style={styles.imageContainerProfile}>
          <Image
            source={{ uri: item?.photo } || icons.profile}
            style={styles.profileImage}
            resizeMode="cover"
          />

          <View style={styles.profileTextContainer}>
            <Text style={{ fontFamily: "Medium", fontSize: 16, top: 6 }}>
              {item?.name}
            </Text>
            <Text style={styles.profileText}>{item?.organization}</Text>
            <Text style={styles.roleText}>
              {item?.role?.replace(/^./, item?.role[0].toUpperCase())}
            </Text>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>Event Date:</Text>
          <View style={styles.textPadding}>
            <Text style={styles.textBox}>{date.toDateString()}</Text>
          </View>
          <Text style={styles.text}>Event Location:</Text>
          <View style={styles.textPadding}>
            <Text style={styles.textBox}>{item?.location}</Text>
          </View>
        </View>

        {/* <View style={styles.dateContainer}>
          <Text style={styles.date}>Event Date: {date.toDateString()}</Text>
          <Text style={styles.date}>Event Location: {item?.location}</Text>
        </View> */}

        {/* <Button title='share' onPress={()=>onShare(item)}/> */}
      </View>
    </FadeView>
  );
};

const styles = StyleSheet.create({
  textBox: {
    backgroundColor: "#fff2e6",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 4,
    padding: 5,
  },
  text: {
    fontFamily: "SemiBold",
    fontSize: 16,
    color: "orange",
  },
  textPadding: {
    color: "#fff",
    // width: "50%",

    paddingVertical: 2,
    paddingHorizontal: 2,
    textAlign: "center",
  },
  dateContainer: {
    alignItems: "flex-start",
    marginTop: 5,
  },
  date: {
    color: "green",
    fontFamily: "SemiBold",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  // Card
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 10,
    padding: 8,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 5,
  },
  contentCard: {
    padding: 16,
  },

  cardDescription: {
    fontSize: 16,
    color: "#888888",
    marginTop: 16,
  },
  cardItemsContainer: {
    flexDirection: "row",
  },

  textItem1: {
    fontSize: 14,
    marginRight: 16,
    backgroundColor: "#F4A099",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  textItem2: {
    fontSize: 14,
    marginRight: 16,
  },
  imageContainerProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 10,
  },
  profileTextContainer: {
    // flexDirection: "column",
  },
  profileText: {
    fontSize: 16,
    marginTop: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CommunityItem;
