import { useState } from "react";
import axios from "axios";

const CommentCreate = (props) => {
  const { postId } = props;

  const [content, setContent] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="comment">New Comment</label>
          <input
            id="comment"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
