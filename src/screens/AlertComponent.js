import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomAlert from '../components/CustomAlert';

const AlertComponent = () => {
  
  return (
    <ScrollView style={{ marginTop: 40 }}>
      <CustomAlert type="success" />
      <CustomAlert type="error" />
    </ScrollView>
  )
}

export default AlertComponent;





// import React from 'react';
// import {
//   View,
//   StyleSheet,
//   Button,
//   Modal,
//   Image,
//   Text,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';

// const ModalPopUp = ({ visible, children }) => {
//   const [showModal, setShowModal] = React.useState(visible);
//   // const [errorShowModal, setErrorShowModal] = React.useState(visible);
//   const scaleValue = React.useRef(new Animated.Value(0)).current;

//   React.useEffect(() => {
//     toggleModal();
//   }, [visible]);

//   const toggleModal = () => {
//     if (visible) {
//       setShowModal(true);
//       Animated.spring(scaleValue, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       setTimeout(() => setShowModal(false), 200);
//       Animated.timing(scaleValue, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };
//   return (
//     <Modal transparent visible={showModal}>
//       <View style={styles.modalBackGround}>
//         <Animated.View
//           style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
//           {children}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const AlertComponent = () => {

//   const [visible, setVisible] = React.useState(false);
//   const [errorVisible, setErrorVisible] = React.useState(false);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ModalPopUp visible={visible}>
//         <View style={{ alignItems: 'center' }}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => setVisible(false)}>
//               <Image
//                 source={require("./../../assets/x.png")}
//                 // source={require('./assets/x.png')}
//                 style={{ height: 30, width: 30 }}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={{ alignItems: 'center' }}>
//           <Image
//             source={require('./../../assets/success.png')}
//             style={{ height: 150, width: 150, marginVertical: 10 }}
//           />
//         </View>

//         <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
//           Congratulations registration was successful
//         </Text>
//       </ModalPopUp>
//       <Button title="Open success Modal" onPress={() => setVisible(true)} />


//       {/* error */}

//       <View style={{ marginTop: 40 }}>
//         <ModalPopUp visible={errorVisible}>
//           <View style={{ alignItems: 'center' }}>
//             <View style={styles.header}>
//               <TouchableOpacity onPress={() => setErrorVisible(false)}>
//                 <Image
//                   source={require("./../../assets/x.png")}
//                   style={{ height: 30, width: 30 }}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <View style={{ alignItems: 'center' }}>
//             <Image
//               source={require('./../../assets/error.png')}
//               style={{ height: 150, width: 150, marginVertical: 10 }}
//             />
//           </View>

//           <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
//             Please check your all requirements.
//           </Text>
//         </ModalPopUp>
//         <Button title="Open error Modal" onPress={() => setErrorVisible(true)} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackGround: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     borderRadius: 20,
//     elevation: 20,
//   },
//   header: {
//     width: '100%',
//     height: 40,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
// });

// export default AlertComponent;


// // import CustomAlert from "../components/CustomAlert";
// // import React from 'react';
// // import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// // const AlertComponent = () => {
// //     const [showAlert, setShowAlert] = React.useState(false);
// //     const [alertType, setAlertType] = React.useState('');

// //     const handleShowAlert = (type) => {
// //         setShowAlert(true);
// //         setAlertType(type);
// //     };

// //     const handleCloseAlert = () => {
// //         setShowAlert(false);
//     };

//     return (
//         <View>
//             <Button title="Show Cancel Alert" onPress={() => handleShowAlert('cancel')} />
//             <Button title="Show Success Alert" onPress={() => handleShowAlert('success')} />
//             <Button title="Show Danger Alert" onPress={() => handleShowAlert('danger')} />

//             <CustomAlert
//                 visible={showAlert}
//                 type={alertType}
//                 title="Alert Title"
//                 message="Alert Message"
//                 onClose={handleCloseAlert}
//             />
//         </View>
//     );
// };
// export default AlertComponent;
