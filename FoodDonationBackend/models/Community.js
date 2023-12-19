const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    subRole: {
      type: String,
      required: false,
    },
    organization: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    imageUrls: {
      type: [String],
      required: false,
    },
    noOfItem: {
      type: Number,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const Community = mongoose.model("CommunityCollection", communitySchema);

module.exports = Community;
