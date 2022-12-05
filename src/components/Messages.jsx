import { onSnapshot, doc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ChatContext } from "../Context/ChatContext";
import ImageBg from "../photos/bgImage.png";
import { database } from "../utils/firebase";

import Message from "./Message";

const Container = styled.div`
    height: calc(100% - 120px);
    padding: 20px 10px;
    overflow: scroll;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    /* background-image: url(${ImageBg}),
        linear-gradient(to bottom, #023030 0%, #2f0047 100%); */

    background-color: #00000076;

    /* background-repeat: repeat;
    background-position: center;
    background-blend-mode: saturation;
    background-size: contain; */
    position: relative;
`;

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(database, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    return (
        <Container>
            {messages.length !== 0 &&
                messages.map((m) => <Message key={m.id} message={m} />)}
        </Container>
    );
};

export default Messages;
