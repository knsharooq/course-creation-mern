import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Col, Input, Label, Row } from "reactstrap";
import { createPost, updatePost } from "../../actions/posts";
import "./Form.css";

export const AddOrEditForm = ({ editId, setEditId = () => {} }) => {
  const [formData, setFormData] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    editId ? state.posts.find((item) => item._id === editId) : null
  );

  useEffect(() => {
    if (post) setFormData(post);
  }, [post]);

  useEffect(() => {
    if (isAdded) {
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  }, [isAdded]);

  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        setIsUpdated(false);
      }, 2000);
    }
  }, [isUpdated]);

  useEffect(() => {
    if (isEmpty) {
      setTimeout(() => {
        setIsEmpty(false);
      }, 2000);
    }
  }, [isEmpty]);

  const clearFields = () => {
    setEditId(0);
    setFormData({});
  };

  const onSubmitPost = () => {
    setIsEmpty(false);
    if (
      !formData?.name ||
      !formData?.phone ||
      !formData?.mail ||
      !formData?.course
    ) {
      setIsEmpty(true);
      return;
    }
    if (editId) {
      dispatch(updatePost(editId, formData));
      setIsUpdated(true);
    } else {
      dispatch(createPost(formData));
      setIsAdded(true);
    }
    clearFields();
  };

  return (
    <>
      <Row className="form py-3">
        <Col sm={12} className="text-center">
          <h3>{`${editId ? "Edit" : "Add"} Profile`}</h3>
        </Col>
        <Col sm={12} className="mt-3">
          <Label>Name:</Label>
          <Input
            className="mt-1"
            placeholder="Enter Full Name"
            value={formData?.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Col>
        <Col sm={12} className="mt-3">
          <Label>Phone:</Label>
          <Input
            type="number"
            className="mt-1"
            placeholder="Enter Contact Number"
            value={formData?.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </Col>
        <Col sm={12} className="mt-3">
          <Label>Email:</Label>
          <Input
            className="mt-1"
            placeholder="Enter Email Id"
            value={formData?.mail || ""}
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
          />
        </Col>
        <Col sm={12} className="mt-3">
          <Label>Course:</Label>
          <Input
            className="mt-1"
            placeholder="Enter Course Name"
            value={formData?.course || ""}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
          />
        </Col>
        <Col sm={12} className="mt-4 text-center">
          <Button color="success" className="mx-3" onClick={onSubmitPost}>
            Save
          </Button>
          {editId !== 0 && (
            <Button
              className="bg-transparent border-success text-success"
              onClick={clearFields}
            >
              Clear
            </Button>
          )}
        </Col>
      </Row>

      {isEmpty && editId === 0 && (
        <Col sm={12} className="mt-4 text-center">
          <Alert color="danger">Please fill all the fields!</Alert>
        </Col>
      )}
      {isAdded && (
        <Col sm={12} className="mt-4 text-center">
          <Alert color="success">Profile Added!</Alert>
        </Col>
      )}
      {isUpdated && (
        <Col sm={12} className="mt-4 text-center">
          <Alert color="success">Profile Updated!</Alert>
        </Col>
      )}
    </>
  );
};
