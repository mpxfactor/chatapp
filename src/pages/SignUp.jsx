import {
    Google,
    Image,
    Instagram,
    LinkedIn,
    Telegram,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
// import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authentication, database, storage } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    color: white;
    width: 100%;

    overflow-x: scroll;
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

const SocialLogin = styled.div`
    display: flex;
    gap: 10px;
`;

const Text = styled.p`
    color: #a49f9f;
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

const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    cursor: pointer;
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

const VisButton = styled.div`
    border: none;
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.4rem;
    border: 1px solid #cec6c6;
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

const SignUp = () => {
    const [visibility1, setVisibility1] = useState(false);
    const [visibility2, setVisibility2] = useState(false);
    const passVisibilitySetFunc1 = () => {
        setVisibility1(!visibility1);
    };

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    //use it everywhere instead of using useState hook
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target[0].value;
        const email = event.target[1].value;
        const password = event.target[2].value;
        const avatarFile = event.target[3].files[0];
        // console.log(name, "-", email, "-", password, "-", avatarFile);

        try {
            const res = await createUserWithEmailAndPassword(
                authentication,
                email,
                password
            );
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, avatarFile);

            uploadTask.on(
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            await updateProfile(res.user, {
                                displayName: name,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(database, "user", res.user.uid), {
                                uid: res.user.uid,
                                name,
                                email,
                                photoURL: downloadURL,
                            });

                            await setDoc(
                                doc(database, "userChat", res.user.uid),
                                {}
                            );
                            navigate("/main");
                        })
                        .catch((error) => console.log(error));
                }
            );
        } catch (error) {
            setError(true);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>Create Account</Title>

                <Text>Or use your email for registration</Text>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Name" type="text" />
                    <Input placeholder="Email" type="email" />

                    <Password>
                        <Input
                            placeholder="Password"
                            type={visibility1 ? "text" : "password"}
                        />
                        <VisButton
                            type="button"
                            onClick={passVisibilitySetFunc1}
                        >
                            {visibility1 ? (
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

                    {/* /////////////////////////////////////////////////////// */}

                    <Input
                        type="file"
                        style={{ display: "none" }}
                        id="uploadAvatar"
                        placeholder="image"
                    />
                    <Label htmlFor="uploadAvatar">
                        <Image /> Upload a Avatar.
                    </Label>

                    {/* /////////////////////////////////////////////////////// */}
                    <Button>Sign Up</Button>
                </Form>
                <Text>
                    Already have an account ?{" "}
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "#f212dc",
                            fontWeight: "bold",
                        }}
                    >
                        Log in
                    </Link>
                </Text>
            </Wrapper>
            {error ? <span>Something went wrong</span> : ""}
        </Container>
    );
};

export default SignUp;
