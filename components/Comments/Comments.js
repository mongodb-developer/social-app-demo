import React from "react";
import { Comment } from "./Comment";

const Comments = ({ comments, setComments }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment._id}>
          <Comment comment={comment} setComments={setComments} />
        </div>
      ))}
    </>
  );
};

export default Comments;
