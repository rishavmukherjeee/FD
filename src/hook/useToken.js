// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { userContext } from "../context/Provider";
// const useToken = (email) => {
//   const { setLoading } = userContext();
//   const [token, setToken] = useState("");
//   useEffect(() => {
//     if (email) {
//       const fetchData = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `https://food-donation-backend.vercel.app/api/v1/users/jwt?email=${email}`
//           );

//           if (response.data.jwtToken) {
//             setToken(response.data.jwtToken);
//             await AsyncStorage.setItem("jwtToken", response.data.jwtToken);
//           }
//         } catch (error) {
//           console.error("Error fetching token:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchData();
//     }
//   }, [email]);
//   return [token];
// };

// export default useToken;
