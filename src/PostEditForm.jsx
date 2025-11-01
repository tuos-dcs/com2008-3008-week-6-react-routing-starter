import { useEffect, useRef, useState } from "react";

import { Button, Form, Stack } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "lodash";

const PostEditForm = ({ client }) => {
  const { postId } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    client.getPost(postId)
      .then(({ data }) => setPost(data))
  }, []);

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const body = bodyRef.current.value;

    client.updatePost({ title, body }, postId)
  };

  const deleteHandler = () => {
    client.deletePost(postId)
  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <h1>Edit Post</h1>
      <p>Back to <Link to={"/"}>posts</Link>.</p>
      {!isEmpty(post) && (
        <>
          <Form.Group controlId="title">
            <Form.Label>Post Title</Form.Label>
            <Form.Control defaultValue={post.title} ref={titleRef} type="text"/>
          </Form.Group>
          <Form.Group controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control defaultValue={post.body} ref={bodyRef} type="textbox"/>
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="mt-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={deleteHandler} variant="primary">Delete Post</Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default PostEditForm;