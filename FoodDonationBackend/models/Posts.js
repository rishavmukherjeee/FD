const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    postCategoryName: {
      type: String,
      required: [true, "Post category not found"],
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
    subRole: {
      type: String,
    },
    phone: {
      type: String,
    },
    photo: {
      type: String,
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    imageUrls: {
      type: [String],

      // validate: {
      //   validator: function (value) {
      //     return value.length === 4;
      //   },
      //   message: "Image array must contain exactly 4 images",
      // },
    },
    caption: {
      type: String,
    },
    noOfItem: {
      type: Number,
    },
    listItems: [
      {
        id: {
          type: Number,
        },
        qType: {
          type: String,
        },
        value: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        quantityType: {
          type: String,
        },
      },
    ],

    // comments: {
    //   type: "object",
    //   properties: {
    //     commentId: { type: "number" },
    //     userName: { type: "string" },
    //     comment: { type: "string" },
    //   },
    // },

    orderType: String,
    expiredTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("PostsCollection", postsSchema);

module.exports = Posts;
