const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      validate: {
        validator: function (email) {
          return this.constructor
            .findOne({ email })
            .exec()
            .then((user) => {
              if (user) {
                return false;
              }
              return true;
            });
        },
        message: "Email is already taken",
      },
    },
    isAdmin: Boolean,
    phone: {
      type: String,
      // required: false,
      // unique: false, //we will change it later
      // trim: true,
      // validate: {
      //   validator: function (phone) {
      //     return this.constructor
      //       .findOne({ phone })
      //       .exec()
      //       .then((user) => {
      //         if (user) {
      //           return false;
      //         }
      //         return true;
      //       });
      //   },
      //   message: "Phone number is already taken",
      // },
    },
    role: {
      type: String,
      enum: ["admin", "needy", "donor", "transporter"],
    },
    subRole: {
      type: String,

      required: false,
    },
    categoryName: {
      type: String,
      required: false,
    },
    image: {
      type: [String],
      required: false,
    },
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },
    fssaiLicense: {
      type: String,
      required: false,
    },
    panNumber: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
    notifyToken: {
      type: String,
    },
    donorNotification: {
      type: Boolean,
    },
    needyNotification: {
      type: Boolean,
    },
    transporterNotification: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("UserCollection", userSchema);

module.exports = User;
