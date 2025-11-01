import { useRef, useState } from "react";

import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { isEmpty } from "lodash";

const RegisterForm = ({ client }) => {

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({})

  const submitHandler = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    client.signup({ username, password })
      .catch((errors) => setErrors(errors))
  }

  return (
    <Form className="mt-2" onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <p>Already have an account? Click <Link to={"/"}>here</Link> to login</p>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          isInvalid={!isEmpty(errors.username)}
          ref={usernameRef}
          type="text"
          placeholder="Enter your new username"
        />
        {!isEmpty(errors?.username) && (
          <Form.Control.Feedback type="invalid">
            {errors.username.join(", ")}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          isInvalid={!isEmpty(errors.password)}
          ref={passwordRef}
          type="password"
          placeholder="Enter a strong password"
        />
        {!isEmpty(errors?.password) && (
          <Form.Control.Feedback type="invalid">
            {errors.password.join(", ")}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button className="mt-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default RegisterForm;