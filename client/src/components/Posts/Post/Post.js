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
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useState } from "react";

export const PostCard = ({ post, setEditId = () => {} }) => {
  const dispatch = useDispatch();
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const onDeleteConfirm = () => {
    dispatch(deletePost(post._id));
    setIsModalOpen(!isModalOpen)
  }
  const getModal = () => {
    return (
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
      <ModalBody>
        <b>Are you sure you want to delete this profile ?</b>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => setIsModalOpen(!isModalOpen)} className="mx-3">Cancel</Button>
        <Button color="danger" onClick={() => onDeleteConfirm()}>Delete</Button>
      </ModalFooter>
    </Modal>
    )
    
  }
  return (
    <div className="post-card p-3 d-flex flex-column justify-content-between w-100">
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
            <FontAwesomeIcon icon={faThumbsUp} color="gray" />
            <span className="mx-1 text-dark">{post.likeCount}</span>
          </button>
          <div className="mx-1">
            <button
              className="bg-transparent border-0 icon"
              onClick={() => setEditId(post._id)}
            >
              <FontAwesomeIcon className="mx-3" icon={faPencilAlt} color="gray" />
            </button>
            <button
              className="bg-transparent border-0 icon"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faTrash} color="gray" />
            </button>
          </div>
        </div>
      </div>
      {getModal()}
    </div>
  );
};
