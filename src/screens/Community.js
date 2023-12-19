import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Loading from "../components/Loading";
import SearchHeader from "../components/SearchHeader";
import Container from "../components/container";
import { userContext } from "../context/Provider";
import CommunityItem from "./CommunityItem";

const Community = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refetch, allData } = userContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://food-donation-backend.vercel.app/api/v1/community/get`
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refetch]);

  const navigation = useNavigation();

  const onCampaign = () => {
    if (allData?.guestData === "guest")
      return alert("Please Sign up as a Donor");
    else navigation.navigate("communityPost");
  };
  if (loading) return <Loading />;

  return (
    <Container>
      <SearchHeader />
      {(allData?.userData?.role === "donor" ||
        allData?.guestData === "guest") && (
        <Text
          style={{
            textAlign: "right",
            fontFamily: "Bold",
            fontSize: 18,
            color: "#B4AAF2",
            marginRight: 10,
          }}
          onPress={onCampaign}
        >
          Run a Campaign
        </Text>
      )}
      <View style={{ flex: 1, width: "100%", marginBottom: 80 }}>
        <FlatList
          data={data.slice(0).reverse()}
          renderItem={({ item }) => (
            <CommunityItem item={item} key={item?._id} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default Community;
