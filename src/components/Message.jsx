import { Check } from "@mui/icons-material";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";
import Image from "../photos/image1.png";

const Container = styled.div``;

const MessageDiv = styled.div`
    width: 95%;
    margin: 0 auto;
    display: flex;

    flex-direction: ${({ owner }) => (owner ? "row-reverse" : "row")};
`;

const TextDiv = styled.div`
    border-radius: ${({ owner }) =>
        owner ? "15px 0 15px 15px" : " 0 15px 15px 15px"};

    background-color: ${({ owner }) => (owner ? "#075e54" : "#111b21")};
    color: ${({ theme }) => theme.primaryTitle};
    padding: 10px;
    max-width: 80%;
`;

const Text = styled.p`
    font-size: 0.8rem;
`;

const TimeDiv = styled.div`
    font-size: 0.7rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: ${true && "#34b7f1"};
`;

const Time = styled.p`
    color: #ffffff97;
`;

const ImageDiv = styled.div`
    width: 300px;
    height: 200px;
    background-color: #0000007c;
    margin-top: 10px;
`;

const ImageSend = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Message = ({ message }) => {
    const currentUser = useContext(AuthContext);
    const owner = currentUser.uid === message.senderId ? true : false;
    return (
        <Container>
            {!message.img ? (
                <MessageDiv owner={owner}>
                    <TextDiv owner={owner}>
                        <Text>{message.text}</Text>
                        <TimeDiv>
                            <Time>14:03</Time>
                            <Check style={{ fontSize: "0.8rem" }} />
                            <Check
                                style={{
                                    fontSize: "0.8rem",
                                    marginLeft: "-8px",
                                    visibility: "visible",
                                }}
                            />
                        </TimeDiv>
                    </TextDiv>
                </MessageDiv>
            ) : (
                <>
                    {" "}
                    <MessageDiv owner={owner}>
                        <ImageDiv>
                            <ImageSend src={message.img} />
                            <TimeDiv>
                                <Time>14:03</Time>
                                <Check style={{ fontSize: "0.8rem" }} />
                                <Check
                                    style={{
                                        fontSize: "0.8rem",
                                        marginLeft: "-8px",
                                        visibility: "visible",
                                    }}
                                />
                            </TimeDiv>
                        </ImageDiv>
                    </MessageDiv>
                    <MessageDiv owner={owner}>
                        <TextDiv owner={owner}>
                            <Text>{message.text}</Text>
                            <TimeDiv>
                                <Time>14:03</Time>
                                <Check style={{ fontSize: "0.8rem" }} />
                                <Check
                                    style={{
                                        fontSize: "0.8rem",
                                        marginLeft: "-8px",
                                        visibility: "visible",
                                    }}
                                />
                            </TimeDiv>
                        </TextDiv>
                    </MessageDiv>
                </>
            )}
        </Container>
    );
};

export default Message;
