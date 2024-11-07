const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { post } = require("axios");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "success" });
});

app.listen(4002, async () => {
  console.log("Listening on port 4002");

  try {
    const res = await axios.get("http://event-bus-service:4005/events");

    for (let event of res.data) {
      const { type, data } = event;

      console.log("Processing event:", type);

      handleEvent(type, data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
