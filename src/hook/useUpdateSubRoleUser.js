import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const updateUserRole = async (update, email, navigate) => {
    setLoading(true);

    const body = { subRole: update };

    try {
      const response = await axios.patch(
        `https://food-donation-backend.vercel.app/api/v1/users/update-role?email=${email}`,
        body
      );

      if (response.data.status === "success") {
        navigation.navigate(navigate, {
          resData: response.data,
        });
      }
    } catch (error) {
      setError(error);
      console.log("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateUserRole };
};

export default useUpdateUser;
