import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpen,
  faGraduationCap,
  faPencilAlt,
  faPhoneAlt,
  faTrash,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { deletePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
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
      <div className="d-flex">
        <FontAwesomeIcon icon={faUserAlt} size="2x" color="gray" />
        <span className="name mx-3">{post.name}</span>
      </div>
      <div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faPhoneAlt} color="gray" />
          <span className="info mx-2">{post.phone}</span>
        </div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faEnvelopeOpen} color="gray" />
          <span className="info mx-2">{post.mail}</span>
        </div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faGraduationCap} color="gray" />
          <span className="info mx-2">{post.course}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
          <button
            className="bg-transparent border-0 button"
            onClick={() =>{}}
          >
            <span className="text-dark text-decoration-underline ">More Info</span>
          </button>
          <button
            className="bg-transparent border-0 button"
            onClick={() =>{}}
          >
            <span className="text-dark text-decoration-underline">Comments</span>
          </button>
            <button
              className="bg-transparent border-0"
              onClick={() => setEditId(post._id)}
            >
              <FontAwesomeIcon icon={faPencilAlt} color="gray" />
            </button>
            <button
              className="bg-transparent border-0"
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faTrash} color="gray" />
            </button>
        </div>
      {getModal()}
    </div>
  );
};
