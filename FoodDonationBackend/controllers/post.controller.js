const Posts = require("../models/Posts");

exports.getAllPost = async (req, res) => {
  const { role } = req.query;

  try {
    const posts = await Posts.find({ role: { $ne: role } }).sort({
      updatedAt: -1,
    });
    if (posts) {
      res.status(200).json({
        status: "success",
        data: posts,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Post not found",
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
exports.getLatestPostByEmail = async (req, res) => {
  const { email } = req.query;
  const selectFields = req.query.fields;

  try {
    let selectQuery = {};

    if (selectFields) {
      const fieldsArray = selectFields.split(",").map((field) => field.trim());
      fieldsArray.forEach((field) => {
        selectQuery[field] = 1;
      });
    }

    const post = await Posts.findOne({ email })
      .sort({ date: -1 })
      .limit(1)
      .select(selectQuery);

    if (post) {
      res.status(200).json({
        status: "success",
        data: post,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Posts.create(req.body);

    if (post) {
      res.status(201).json({
        status: "success",
        data: post,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const update = await Posts.findByIdAndUpdate(
      _id,
      { $set: rest },
      { new: true }
    );

    if (update) {
      res.status(201).json({
        status: "success",
        data: update,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not updated",
      error: error.message,
    });
  }
};
exports.addComments = async (req, res) => {
  try {
    const { commentId, userName, comment } = req.body;

    const update = await Posts.findByIdAndUpdate(
      commentId,
      { $push: { comments: { commentId, userName, comment } } },
      { new: true }
    );

    if (update) {
      res.status(201).json({
        status: "success",
        data: update,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "comment not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "comment is not updated",
      error: error.message,
    });
  }
};
