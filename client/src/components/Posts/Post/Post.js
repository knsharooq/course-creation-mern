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
import { deletePost, updatePost } from "../../../actions/posts";
import { useDispatch } from "react-redux";
import {
  Alert,
  Button,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { useState } from "react";
import Select from "react-select";
import { admissionOptions, affiliationOptions, documentOptions, entranceOptions, intakeDurationOptions, intakeMonthOptions, serviceOptions, specializationOptions, tagOptions } from "../../componentConstants";

export const PostCard = ({ post, setEditId = () => {} }) => {
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [admission, setAdmission] = useState(post?.details?.admission);
  const [service, setservice] = useState(post?.details?.service);
  const [affiliation, setAffiliation] = useState(post?.details?.affiliation);
  const [entrance, setEntrance] = useState(post?.details?.entrance);
  const [documents, setDocuments] = useState(post?.details?.documents);
  const [specialization, setSpecialization] = useState(post?.details?.specialization);
  const [intakeMonth, setIntakeMonth] = useState(post?.details?.intakeMonth);
  const [intakeDuration, setIntakeDuration] = useState(post?.details?.intakeDuration);
  const [tagName, setTagName] = useState(post?.details?.tagName);
  const [tagDesc, setTagDesc] = useState(post?.details?.tagDesc);
  const [isMainEmpty, setIsMainEmpty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const onDeleteConfirm = () => {
    dispatch(deletePost(post._id));
    setIsConfirmModalOpen(!isConfirmModalOpen);
  };

  const getConfirmModal = () => {
    return (
      <Modal
        isOpen={isConfirmModalOpen}
        toggle={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
      >
        <ModalBody>
          <b>Are you sure you want to delete this profile ?</b>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => setIsConfirmModalOpen(!isConfirmModalOpen)}
            className="mx-3"
          >
            Cancel
          </Button>
          <Button color="danger" onClick={() => onDeleteConfirm()}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const onSaveInfo = () => {
    setIsMainEmpty(false); 
    if(!admission || !service || !documents || !specialization || !intakeMonth || !intakeDuration){
    setIsMainEmpty(true); 
    return;
    }
    const newPost = {
      ...post,
      details: { ...(post?.details || {}), admission , service, affiliation: affiliation || [], entrance: entrance || [] , documents, specialization, intakeMonth, intakeDuration, tagName: tagName || {}, tagDesc: tagDesc || "" },
    };
    dispatch(updatePost(post._id, newPost));
    setIsSaved(true);
  };

  const getInfoModal = () => {
    return (
      <Modal
        isOpen={isInfoModalOpen}
        toggle={() => setIsInfoModalOpen(!isInfoModalOpen)}
        size="lg"
      >
        <ModalHeader>Additional Information</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col md={6}>
                <Label id="admission-label" for="admission-input" className="mb-1">Admission<span className="text-danger">*</span></Label>
                <Select id="admission-input" options={admissionOptions} value={admission} isClearable onChange={val => setAdmission(val)} placeholder="Select Admission"/>
              </Col>
              <Col md={6}>
                <Label id="service-label" for="service-input" className="mb-1">Service<span className="text-danger">*</span></Label>
                <Select id="service-input" options={serviceOptions} value={service} isClearable onChange={val => setservice(val)} placeholder="Select service"/>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Label id="affiliation-label" for="affiliation-input" className="mb-1">Course Affiliation</Label>
                <Select id="affiliation-input" options={affiliationOptions} isMulti value={affiliation} onChange={val => setAffiliation(val)} placeholder="Select Course Affiliation"/>
              </Col>
              <Col md={6}>
                <Label id="entrance-label" for="entrance-input" className="mb-1">Entrance Required</Label>
                <Select id="entrance-input" options={entranceOptions} isMulti value={entrance} onChange={val => setEntrance(val)} placeholder="Select Entrance"/>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Label id="documents-label" for="documents-input" className="mb-1">Documents Required<span className="text-danger">*</span></Label>
                <Select id="documents-input" options={documentOptions} isMulti value={documents} onChange={val => setDocuments(val)} placeholder="Select Documents"/>
              </Col>
              <Col md={6}>
                <Label id="specialization-label" for="specialization-input" className="mb-1">Specialization<span className="text-danger">*</span></Label>
                <Select id="specialization-input" options={specializationOptions} isMulti value={specialization} onChange={val => setSpecialization(val)} placeholder="Select Specialization"/>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12}>
              <h6>Intake Details:</h6>
              </Col>
              <Col md={6}>
                <Label id="intakeMonth-label" for="intakeMonth-input" className="mb-1">Intake<span className="text-danger">*</span></Label>
                <Select id="intakeMonth-input" options={intakeMonthOptions} isClearable value={intakeMonth} onChange={val => setIntakeMonth(val)} placeholder="Select Intake Month"/>
              </Col>
              <Col md={6}>
                <Label id="intakeDuration-label" for="intakeDuration-input" className="mb-1">Duration<span className="text-danger">*</span></Label>
                <Select id="intakeDuration-input" options={intakeDurationOptions} isMulti value={intakeDuration} onChange={val => setIntakeDuration(val)} placeholder="Select Intake Durations"/>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12}>
              <h6>Course Tag:</h6>
              </Col>
              <Col md={6}>
                <Label id="tagName-label" for="tagName-input" className="mb-1">Tag</Label>
                <Select id="tagName-input" options={tagOptions} isClearable value={tagName} onChange={val => setTagName(val)} placeholder="Select Tag"/>
              </Col>
              <Col md={6}>
                <Label id="desc-label" for="desc-input" className="mb-1">Description</Label>
                <Input id="desc-input" isClearable value={tagDesc} onChange={e => setTagDesc(e.target.value)} placeholder="Enter Description"/>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between px-4">
          <div>
          {isMainEmpty && <Alert color="danger" className="py-1 m-0 px-2">Fill all the fields with *</Alert>}
          {isSaved && <Alert color="success" className="py-1 m-0 px-2">Saved successfully!</Alert>}
          </div>
          <div>
          <Button
            color="danger"
            onClick={() => setIsInfoModalOpen(!isInfoModalOpen)}
            className="mx-4"
          >
            Close
          </Button>
          <Button color="success" onClick={() => onSaveInfo()}>
            Save
          </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  };

  const postComment = () => {
    const newCommentsList = [...(post?.details?.comments || [])];
    newCommentsList.push(comment);
    const newPost = {
      ...post,
      details: { ...(post?.details || {}), comments: newCommentsList },
    };
    dispatch(updatePost(post._id, newPost));
    setComment("");
  };

  const getCommentsModal = () => {
    return (
      <Modal
        isOpen={isCommentsModalOpen}
        toggle={() => setIsCommentsModalOpen(!isCommentsModalOpen)}
        size="lg"
      >
        <ModalHeader>Comments</ModalHeader>
        <ModalBody className="modal-body-scroll d-flex flex-column justify-content-between">
          <div>
            {post?.details?.comments?.length ? (
              post?.details?.comments?.map((item) => {
                return <p className="p-3 comment">{item}</p>;
              })
            ) : (
              <p className="text-danger">No Comments Yet</p>
            )}
          </div>
          <div>
            <Label for="cooment-input">Add Comment:</Label>
            <Input
              type="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="my-1"
            />
            <Button
              color="success"
              onClick={() => postComment()}
              disabled={!comment}
              className="my-1 py-1 px-3"
            >
              Post
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => setIsCommentsModalOpen(!isCommentsModalOpen)}
            className="py-1 px-3"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <div className="post-card p-3 d-flex flex-column justify-content-between">
      <div className="d-flex align-items-center">
        <FontAwesomeIcon icon={faUserAlt} size="2x" />
        <span className="name mx-3">{post.name}</span>
      </div>
      <div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faPhoneAlt} />
          <span className="info mx-3">{post.phone}</span>
        </div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faEnvelopeOpen} />
          <span className="info mx-3">{post.mail}</span>
        </div>
        <div className="d-flex my-3 align-items-center">
          <FontAwesomeIcon icon={faGraduationCap} />
          <span className="info mx-2 px-1">{post.course}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="bg-transparent border-0 button p-0"
          onClick={() => setIsInfoModalOpen(true)}
        >
          <span className="text-decoration-underline ">Details</span>
        </button>
        <button
          className="bg-transparent border-0 button p-0"
          onClick={() => setIsCommentsModalOpen(true)}
        >
          <span className="text-decoration-underline">Comments</span>
        </button>
        <button
          className="bg-transparent border-0 p-0"
          onClick={() => setEditId(post._id)}
        >
          <FontAwesomeIcon icon={faPencilAlt} className="text-success mx-2" />
        </button>
        <button
          className="bg-transparent border-0 p-0"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          <FontAwesomeIcon icon={faTrash} className="text-danger" />
        </button>
      </div>
      {getInfoModal()}
      {getCommentsModal()}
      {getConfirmModal()}
    </div>
  );
};
