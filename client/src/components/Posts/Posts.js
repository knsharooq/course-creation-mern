import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { PostCard } from "./Post/Post";
import "./Posts.css";

export const Posts = ({ setEditId = () => {} }) => {
  const postsList = useSelector((state) => state.posts);
  return (
    <Row className="d-flex justify-content-center posts">
      <Col sm={12} className="text-center mb-0 heading">
        <p>Course Profiles</p>
      </Col>
      {!postsList.length ? (
        <Col sm={12} className="mt-3">
          Displaying Profiles ...
        </Col>
      ) : (
        <Col sm={12} className="posts-container px-4">
          <Row>
            {postsList.map((post) => {
              return (
                <Col
                  sm={4}
                  key={post._id}
                  className="m-0 p-0 d-flex justify-content-center"
                >
                  <PostCard post={post} setEditId={setEditId} />
                </Col>
              );
            })}
          </Row>
        </Col>
      )}
    </Row>
  );
};
