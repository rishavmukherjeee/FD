import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
// import Loading from "../components/Loading";
// import { AuthContext } from "../context/Provider";
// import CustomInput from "../components/CustomInput";
import TextField from "./TextField";
// import Meal from "../components/Meal";
const Meal = ({ routeName }) => {
  const route = useRoute();
  const numbers = route.params.number;
  const resData = route.params.resData;
  const [loading, setLoading] = useState(false);
  const [listItems, setListItems] = useState([]);

  const mealOptions = [
    { id: 1, label: "Vegetarian" },
    { id: 2, label: "Non-Vegetarian" },
    // { id: 3, label: "Meal3" },
  ];

  React.useEffect(() => {
    const items = [];
    for (let i = 1; i <= numbers; i++) {
      items.push({
        id: i,
        value: "",
        qType: "",
        quantityType: "",
        quantity: "",
      });
    }
    setListItems(items);
  }, [numbers]);

  const handleValueChange = (text, index, property) => {
    const updatedItems = [...listItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [property]: text,
    };
    setListItems(updatedItems);
  };

  const [orderType, setOrderType] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const quantityTypes = [
    { quantityId: 1, label: "Gram " },
    { quantityId: 2, label: "Kg" },
    { quantityId: 3, label: "ml " },
    { quantityId: 3, label: "L" },
    { quantityId: 4, label: "Pcs " },
  ];

  const orderOptions = [
    { id: 1, label: "Drop or Pickup" },
    { id: 2, label: "Drop" },
    { id: 3, label: "Pickup" },
  ];

  const onDonateMeal = async () => {
    const body = { listItems, orderType, ...resData };
    setLoading(true);
    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/posts/createPost`,
        body
      );
      if (res.data.status === "success") {
        setSuccess("Submitted");
        // alert("Submitted");
      }
    } catch (error) {
      setError(error.message);
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 30, bottom: 10 }}>
          {routeName}
        </Text>
      </View>
      {/*  item list */}
      <View style={{ flex: 1 }}>
        <View>
          {/*  item list */}
          <View>
            {listItems.map((item, index) => (
              <View key={index}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <View style={{ width: 150 }}>
                    {/* <Text
                      style={{
                        fontFamily: "SemiBold",
                        fontSize: 14,
                      }}
                    >
                      Item {item.id}
                    </Text> */}
                    {/* <CustomInput
                      style={styles.inputText}
                      value={item.value}
                      onChangeText={(text) =>
                        handleValueChange(text, index, "value")
                      }
                      placeholder={`Item ${item.id}`}
                    /> */}
                    <TextField
                      style={styles.inputText}
                      value={item.value}
                      onChangeText={(text) =>
                        handleValueChange(text, index, "value")
                      }
                      placeholder={`Item ${item.id}`}
                    />
                  </View>
                  {/* Meal options */}
                  <View style={{ width: 150 }}>
                    <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                      Meal Type {item.id}
                    </Text>
                    <View style={styles.inputText}>
                      <Picker
                        selectedValue={item.qType}
                        onValueChange={(text) =>
                          handleValueChange(text, index, "qType")
                        }
                        mode="dropdown"
                        multiple={true}
                      >
                        {mealOptions.map((option) => (
                          <Picker.Item
                            key={option.id}
                            label={option.label}
                            value={option.label}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 5, marginTop: 5 }}>
                  <View style={{ width: 150 }}>
                    {/* <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                      Item Quantity
                    </Text>
                    <View style={{ width: 160 }}>
                      <CustomInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        placeholder="0"
                        value={item.quantity}
                        onChangeText={(text) =>
                          handleValueChange(text, index, "quantity")
                        }
                      />
                    </View> */}
                    <View style={{ width: 160 }}>
                      <TextField
                        style={styles.inputText}
                        keyboardType="numeric"
                        placeholder="Item Quantity"
                        value={item.quantity}
                        onChangeText={(text) =>
                          handleValueChange(text, index, "quantity")
                        }
                      />
                    </View>
                  </View>

                  {/* Item Quantity */}
                  <View
                    style={{
                      width: 150,
                    }}
                  >
                    <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>
                      Quantity Type
                    </Text>
                    <View style={styles.inputText}>
                      <Picker
                        selectedValue={item.quantityType}
                        onValueChange={(text) =>
                          handleValueChange(text, index, "quantityType")
                        }
                        mode="dropdown"
                      >
                        {quantityTypes.map((option) => (
                          <Picker.Item
                            key={option.quantityId}
                            label={option.label}
                            value={option.label}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Order */}
      <View
        style={{
          width: 300,
          marginTop: 30,
        }}
      >
        {routeName === "Donate" && (
          <View>
            <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Order</Text>
            <View style={styles.inputText}>
              <Picker
                selectedValue={orderType}
                onValueChange={(value) => setOrderType(value)}
                mode="dropdown"
              >
                {orderOptions.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.label}
                    value={option.label}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}
        {/* <View>
                    <Text style={{ fontFamily: "SemiBold", fontSize: 14 }}>Order</Text>
                    <View style={styles.inputText}>
                        <Picker
                            selectedValue={orderType}
                            onValueChange={(value) => setOrderType(value)}
                            mode="dropdown"
                        >
                            {orderOptions.map((option) => (
                                <Picker.Item
                                    key={option.id}
                                    label={option.label}
                                    value={option.label}
                                />
                            ))}
                        </Picker>
                    </View>
                </View> */}
        {error && <CustomAlert type="error" value={error} />}
        {success && <CustomAlert type="success" value={success} />}

        <CustomButton
          text="Continue"
          onPress={onDonateMeal}
          type="primary"
          loading={loading}
          disabled={loading}
        />
      </View>
    </View>
  );
};

export default Meal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 200,
  },

  inputText: {
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
  },
});
