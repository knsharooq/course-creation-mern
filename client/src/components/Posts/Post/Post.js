import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faThumbsUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost, likePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import moment from "moment";

export const PostCard = ({ post, setEditId = () => {} }) => {
  const dispatch = useDispatch();
  return (
    <div className="mx-3 mb-5 post-card p-3 d-flex flex-column justify-content-between">
      <div className="mb-2">
        <p className="title mb-0">{post.title}</p>
        <div className="message">{post.message}</div>
      </div>
      <div>
        <p className="sign mb-0">Created by {post.creator}</p>
        <p className="sign mb-0">{moment(post.createdAt).fromNow()}</p>
        <div className="d-flex justify-content-between mb-1 mt-2">
          <button
            className="bg-transparent border-0 icon"
            onClick={() => dispatch(likePost(post._id))}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span className="mx-1">{post.likeCount}</span>
          </button>
          <div className="mx-1">
            <button
              className="bg-transparent border-0 icon"
              onClick={() => setEditId(post._id)}
            >
              <FontAwesomeIcon className="mx-3" icon={faPencilAlt} />
            </button>
            <button
              className="bg-transparent border-0 icon"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
