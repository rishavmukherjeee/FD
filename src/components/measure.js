import { StyleSheet, Text, View } from "react-native";
import useFetchData from "../hook/useFetchData";
import Loading from "./Loading";

const Measure = ({ email }) => {
  // const [quantity, setQuantity] = useState(0);

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };
  const { error, loading, data } = useFetchData(
    `posts/getPostByEmail?email=${email}`
  );

  if (loading) return <Loading />;
  // if (!data?.listItems?.length) return alert("No Post Found");
  return (
    <View
      style={{
        backgroundColor: "#EFEDF8",
        borderColor: "#B4AAF2",
        borderRadius: 5,
        padding: 10,
        gap: 5,
        marginTop: 10,
      }}
    >
      <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
        {data?.role === "needy" ? "Food Needed" : "Food Availability"}
      </Text>
      {!data?.listItems?.length && <Text>No Post Found</Text>}
      {data?.listItems?.map((item) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Medium", fontSize: 13 }}>
            {item.value}
          </Text>
          <View style={styles.footer}>
            {/* <Feather
            onPress={decreaseQuantity}
            name="minus-circle"
            size={18}
            color="gray"
          /> */}
            <Text style={styles.quantity}>
              {item.quantity}/{item.quantityType}
            </Text>
            {/* <Feather
            onPress={increaseQuantity}
            name="plus-circle"
            size={18}
            color="gray"
          /> */}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderColor: "#B4AAF2",
    borderRadius: 7,
    borderWidth: 1,
    padding: 2,
    paddingHorizontal: 10,
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
});
export default Measure;
