import { AttachFile, KeyboardVoice, Mood, Send } from "@mui/icons-material";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { database, storage } from "../utils/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Container = styled.div`
    min-height: 60px;

    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;

    padding: 5px 10px;

    color: white;
    background-color: ${({ theme }) => theme.bgLighter};

    border: none;
    outline: none;
`;

const Left = styled.div`
    display: flex;
    gap: 5px;
`;
const Right = styled.div`
    display: flex;
    gap: 5px;
`;

const InputElem = styled.input`
    flex: 1;
    border-radius: 10px;
    outline: none;
    padding: 10px;
    border: none;
    background: transparent;
    background-color: black;
    color: white;
`;

const InputFile = styled.input`
    display: none;
`;

const AttachLabel = styled.label`
    cursor: pointer;
`;

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    const currentUser = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSendClick = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    // console.log("error");
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {
                            await updateDoc(
                                doc(database, "chats", data.chatId),
                                {
                                    messages: arrayUnion({
                                        id: uuid(),
                                        text: text,
                                        senderId: currentUser.uid,
                                        date: Timestamp.now(),
                                        img: downloadURL,
                                    }),
                                }
                            );
                        })
                        .catch((error) => console.log(error));
                }
            );
        } else {
            await updateDoc(doc(database, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(database, "userChat", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(database, "userChat", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setImg(null);
        setText("");
    };

    return (
        <Container>
            <Left>
                <Mood style={{ cursor: "pointer", color: "#676f73" }} />
                <InputFile
                    placeholder="file"
                    type="file"
                    id="file"
                    onChange={(event) => setImg(event.target.files[0])}
                />
                <AttachLabel htmlFor="file">
                    <AttachFile style={{ color: "#676f73" }} />
                </AttachLabel>
            </Left>
            <InputElem
                placeholder="Type a message"
                onChange={(event) => setText(event.target.value)}
                value={text}
            />
            <Right>
                {text !== "" || img ? (
                    <Send
                        style={{ color: "#676f73", cursor: "pointer" }}
                        onClick={handleSendClick}
                    />
                ) : (
                    <KeyboardVoice
                        style={{ color: "#676f73", cursor: "pointer" }}
                    />
                )}
            </Right>
        </Container>
    );
};

export default Input;
