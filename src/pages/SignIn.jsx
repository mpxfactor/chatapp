import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authentication } from "../utils/firebase";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    width: 100%;

    overflow: scroll;
`;

const Wrapper = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    border: none;
    border-radius: 1rem;
    -webkit-box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
    -moz-box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
    box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 900;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const Input = styled.input`
    border-radius: 0.4rem;
    font-size: 1rem;
    padding: 0.5rem;
    outline: none;
    background-color: transparent;
    color: white;
    border: 1px solid #cec6c6;
`;

const Password = styled.div`
    display: flex;
    align-items: center;
    border-radius: 0.4rem;
    gap: 5px;
    border: 1px solid #cec6c6;

    Input {
        border: none;
    }
`;

const VisButton = styled.div``;

const Button = styled.button`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid #000000;
    background: rgb(2, 0, 36);
    background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(103, 226, 76, 0.6795050783985469) 0%,
        rgba(0, 212, 255, 1) 100%
    );
    cursor: pointer;

    &:hover {
        -webkit-box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
        -moz-box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
        box-shadow: 5px 5px 19px 0px rgba(255, 255, 255, 0.4);
    }
`;
const Text = styled.p`
    color: #a49f9f;
`;

const SignIn = () => {
    const [visibility, setVisibility] = useState(false);
    const passVisibilitySetFunc = () => {
        setVisibility(!visibility);
    };

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    //use it everywhere instead of using useState hook
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;

        try {
            await signInWithEmailAndPassword(authentication, email, password);
            navigate("/main");
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Signin To Account</Title>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Email" type="email" />
                    <Password>
                        <Input
                            placeholder="Password"
                            type={visibility ? "text" : "password"}
                        />
                        <VisButton onClick={passVisibilitySetFunc}>
                            {visibility ? (
                                <Visibility
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                    }}
                                />
                            ) : (
                                <VisibilityOff
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                    }}
                                />
                            )}
                        </VisButton>
                    </Password>
                    <Button>Sign In</Button>
                </Form>
                <Text>
                    Sign up for new Account ?{" "}
                    <Link
                        to="/signup"
                        style={{
                            textDecoration: "none",
                            color: "#f212dc",
                            fontWeight: "bold",
                        }}
                    >
                        Sign Up
                    </Link>
                </Text>
            </Wrapper>
        </Container>
    );
};

export default SignIn;
