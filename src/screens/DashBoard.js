import axios from "axios";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "../components/Loading";
import InitContainer from "../components/initContainer";

const DashBoard = () => {
  const [count, setCount] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://food-donation-backend.vercel.app/api/v1/dashboard/getCount"
      );
      if (res.data) setCount(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <Loading />;
  return (
    <InitContainer>
      <Text
        style={{
          marginTop: 40,
          color: "white",
          fontFamily: "Bold",
          fontSize: 28,
        }}
      >
        Dashboard
      </Text>

      <View style={styles.topContainer}></View>
      <View style={styles.subContainer}>
        <View style={{ marginTop: 30 }}>
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Total Users</Text>
              <Text style={styles.textCount}>{count?.users}</Text>
            </View>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Total Donor</Text>
              <Text style={styles.textCount}>{count?.donor}</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Total Needy</Text>
              <Text style={styles.textCount}>{count?.needy}</Text>
            </View>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Total Transporter</Text>
              <Text style={styles.textCount}>{count?.transporter}</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Total Posts</Text>
              <Text style={styles.textCount}>{count?.posts}</Text>
            </View>
            <View style={[styles.card, styles.shadow]}>
              <Text style={styles.text}>Community Posts</Text>
              <Text style={styles.textCount}>{count?.community}</Text>
            </View>
          </View>
        </View>
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "SemiBold",
  },
  textCount: {
    fontFamily: "Bold",
    fontSize: 24,
    color: "red",
  },
  topContainer: {
    flex: 0.4,
  },
  subContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,

    // maxHeight: 00,
    // justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "45%",
    height: 150,
    marginVertical: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 10,
  },
});

export default DashBoard;
