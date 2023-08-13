import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // The Login function refers to the query function in the userApiSlice.
    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // The login is from the login mutation within the userApiSlice file.
            const res = await login({ email, password }).unwrap();
            // This will dispatch the setCredential action from the autSlice file.
            dispatch(setCredentials({ ...res }));
            // After everything is checked, user will be navigated back to the Home Screen.
            navigate("/");
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        };
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>

                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register</Link>
                    </Col>
                </Row>

            </Form>
        </FormContainer>
    )
};

export default LoginScreen;