import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import ConfettiModal from "../components/ConfettiModal";
import CustomButton from "../components/CustomButton";
// import CustomInput from "../components/CustomInput";
import { getDatabase, ref, set } from "@firebase/database";
import Header from "../components/Header";
import TextField from "../components/TextField";
import Container from "../components/container";
import { AuthContext } from "../context/Provider";
const DonateMeal = () => {
  const route = useRoute();
  // const numbers = 2;

  // const restData = null;
  const numbers = route.params.number;

  const restData = route.params.resData;

  const navigation = useNavigation();
  const [listItems, setListItems] = useState([]);

  const [closeModal, setCloseModal] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mealOptions = [
    // { id: 1, label: "Non-Veg or Veg" },
    { id: 2, label: "Veg" },
    { id: 3, label: "Non-Veg" },
  ];

  React.useEffect(() => {
    const items = [];
    for (let i = 1; i <= numbers; i++) {
      items.push({
        id: i,
        value: "",
        qType: mealOptions[0].label,
        quantityType: quantityTypes[0].label,
        quantity: null,
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

  // const [expired, setExpired] = useState({});
  const [expired, setExpired] = useState({
    time: null,
    type: "min",
  });
  let expiredTime = 0;

  if (expired.type === "hrs" && expired.time) {
    expiredTime += expired.time * 60;
  } else if (expired.type === "days" && expired.time) {
    expiredTime += expired.time * 24 * 60;
  } else if (expired.time) {
    expiredTime = expired.time;
  }

  const quantityTypes = [
    { quantityId: 1, label: "Gram " },
    { quantityId: 2, label: "Kg" },
    { quantityId: 3, label: "ml " },
    { quantityId: 3, label: "L" },
    { quantityId: 4, label: "Pcs " },
  ];

  const orderOptions = [
    // { id: 1, label: "Drop or Pickup" },
    { id: 2, label: "Drop" },
    { id: 3, label: "Pickup" },
  ];
  const [orderType, setOrderType] = useState(orderOptions[0]?.label);
  const expiredOptions = [
    { id: 1, label: "min" },
    { id: 2, label: "hrs" },
    { id: 3, label: "days" },
  ];
  if (orderType === "Drop") {
    set(ref(getDatabase(), `${restData.email.replace(/[@.]/g, "")}/pickup`), {
      role: restData.role,
      pickup: "Drop",
    });
  } else if (orderType === "Pickup") {
    set(ref(getDatabase(), `${restData.email.replace(/[@.]/g, "")}/pickup`), {
      role: restData.role,
      pickup: "Pickup",
    });
  }
  const { loading, setLoading } = useContext(AuthContext);
  // if (loading) {
  //   return <Loading />;
  // }
  // setTimeout(() => {
  //   setCloseModal(true);
  // }, 5000);

  const onDonateMeal = async () => {
    if (restData?.role === "donor") {
      if (expiredTime <= 0 || isNaN(expiredTime)) {
        return setError("Required");
      }
    }
    for (const item of listItems) {
      if (
        !item.value ||
        !item.qType ||
        !item.quantity ||
        !item.quantityType ||
        isNaN(item.quantity)
      ) {
        return setError("Required");
      }
    }
    setLoading(true);
    const body = { listItems, expiredTime, orderType, ...restData };
    try {
      const res = await axios.post(
        `https://food-donation-backend.vercel.app/api/v1/posts/createPost`,
        body
      );
      if (res.data.status === "success") {
        // setSuccess("Submitted");
        setCloseModal(true);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: DonateMeal.js:145 ~ onDonateMeal ~ error:",
        error
      );
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    setCloseModal(false);
    navigation.navigate("user");
  };

  return (
    <>
      <Container>
        {closeModal && (
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 50 }}
            autoStart={closeModal}
            fadeOut={true}
          />
        )}
        <ConfettiModal visible={closeModal}>
          <Text
            style={{
              fontSize: 30,
              marginBottom: 30,
              fontWeight: 600,
              color: "#B4AAF2",
            }}
          >
            🎉Congratulations!🎉
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 30,
              textAlign: "center",
              fontWeight: 500,
              color: "#B4AAF2",
            }}
          >
            Thanks for the Donation
          </Text>
          {/* <Button title="Close Modal" onPress={onClose} />
           */}
          <CustomButton text="OKAY" onPress={onClose} type="primary" />
        </ConfettiModal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>{restData?.role === "donor" ? "Donate" : "Help"}</Header>
          <View style={{ marginBottom: 20 }}>
            {listItems.map((item, index) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  marginBottom: 5,
                  borderColor: "#B4AAF2",
                  borderWidth: 2,
                  borderRadius: 8,
                }}
              >
                <View style={{ alignSelf: "flex-start" }}>
                  <Text
                    style={{
                      fontFamily: "SemiBold",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Item {item.id}
                  </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "48%" }}>
                    {/* <Text style={styles.label}>Item {item.id}</Text> */}
                    {/* <CustomInput
                      placeholder={"Item Name"}
                      // placeholder={`Item ${item.id}`}
                      value={item.value}
                      setValue={(text) =>
                        handleValueChange(text, index, "value")
                      }
                    /> */}
                    <TextField
                      placeholder={"Item Name"}
                      // placeholder={`Item ${item.id}`}
                      value={item.value}
                      error={error}
                      setValue={(text) =>
                        handleValueChange(text, index, "value")
                      }
                    />
                  </View>
                  <View style={{ width: "48%" }}>
                    {/* <Text style={styles.label}>Meal Type</Text> */}

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
                <View style={{ flexDirection: "row", gap: 20 }}>
                  <View style={{ width: 150 }}></View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "48%" }}>
                    {/* <Text style={styles.label}>Item Quantity</Text> */}
                    {/* <CustomInput
                      placeholder="Quantity"
                      value={item.quantity}
                      setValue={(text) =>
                        handleValueChange(text, index, "quantity")
                      }
                      keyboardType="numeric"
                    /> */}
                    <TextField
                      placeholder="Quantity"
                      value={item.quantity}
                      error={error}
                      setValue={(text) =>
                        handleValueChange(text, index, "quantity")
                      }
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={{ width: "48%" }}>
                    {/* <Text style={styles.label}>Quantity Type</Text> */}
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

          <View
            style={{
              alignSelf: "center",
              width: "96%",
              bottom: 15,
            }}
          >
            {/* expired */}
            {restData?.role === "donor" && (
              // {1 && (
              <>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ width: "50%" }}>
                    {/* <Text style={styles.label}>Expired Time</Text>
                    <CustomInput
                      placeholder={expired.time || "0"}
                      value={expired.time}
                      setValue={(number) =>
                        setExpired((prev) => ({ ...prev, time: number }))
                      }
                      keyboardType="numeric"
                    /> */}
                    <Text style={styles.label}>Expired Time</Text>
                    <TextField
                      placeholder={expired.time || "0"}
                      value={expired.time}
                      error={error}
                      setValue={(number) =>
                        setExpired((prev) => ({ ...prev, time: number }))
                      }
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text style={styles.label}>Expired Type</Text>
                    <View style={styles.inputText}>
                      <Picker
                        selectedValue={expired.type}
                        onValueChange={(text) =>
                          setExpired((prev) => ({ ...prev, type: text }))
                        }
                        mode="dropdown"
                      >
                        {expiredOptions.map((option) => (
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
                <Text style={styles.label}>Order</Text>
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
              </>
            )}

            {/* {error && <CustomAlert type="error" value={error} />} */}
            {/* {success && <CustomAlert type="success" value={success} />} */}

            {/* Order */}

            <CustomButton
              text="Continue"
              onPress={onDonateMeal}
              type="primary"
              disabled={loading}
              loading={loading}
            />
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  inputText: {
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    justifyContent: "center",
    height: 50,
    marginTop: 15,
  },
  label: {
    fontFamily: "SemiBold",
    fontSize: 14,
  },
});

export default DonateMeal;
