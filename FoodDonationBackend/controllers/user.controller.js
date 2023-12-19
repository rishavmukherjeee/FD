const User = require("../models/User");
const { updateUserServices } = require("../services/users.service");
const { generateToken } = require("../utils/token");

// get users within 100 km radius
exports.getMap = async (req, res) => {
  const { latitude, longitude, role } = req.query;
  const radius = 100; // 100km radius
  let query = {};

  if (role === "needy") {
    query = { role: "donor" };
  } else if (role === "transporter") {
    query = { role: "needy" };
  } else if (role === "donor") {
    query = { role: "needy" };
  }
  try {
    const user = await User.find(query);

    const mapUsers = user.filter((user) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        user.location.latitude,
        user.location.longitude
      );
      return distance <= radius;
    });
    if (mapUsers) {
      res.status(200).json({
        status: "success",
        data: mapUsers,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getTransporter = async (req, res) => {
  const { latitude, longitude } = req.query;
  const radius = 10; // 10km radius
  try {
    const user = await User.find({ role: "transporter" });

    const mapUsers = user.filter((user) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        user.location.latitude,
        user.location.longitude
      );
      return distance <= radius;
    });
    if (mapUsers) {
      res.status(200).json({
        status: "success",
        data: mapUsers,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// Calculate Distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).json({
        status: "success",
        data: users,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getToken = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (user) {
      const jwtToken = generateToken(user);
      res.status(200).json({
        status: "success",
        jwtToken,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const body = req.body;
    let notifications = {};

    if (body.role === "needy") {
      notifications.needyNotification = false;
    } else if (body.role === "donor") {
      notifications.donorNotification = false;
    } else if (body.role === "transporter") {
      notifications.transporterNotification = false;
    }

    const user = await User.create({ ...body, ...notifications });

    if (user) {
      return res.status(201).json({
        status: "success",
        data: user,
      });
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email } = req.query;
    const body = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: body,
      },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        status: "success",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
