// const User = require("../models/User");

// exports.updateUserServices = async (req) => {
//   const { email } = req.query;
//   const body = req.body;

//   const updatedUser = await User.findOneAndUpdate(
//     { email },
//     {
//       $set: body,
//     },
//     { new: true }
//   );
//   return updatedUser;
// };
