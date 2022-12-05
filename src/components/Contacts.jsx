import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";
import Contact from "./Contact";
import { database } from "../utils/firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;

    height: calc(100% - 120px);
    overflow-y: scroll;

    background: ${({ theme }) => theme.bg};
`;

const EndText = styled.p`
    color: ${({ theme }) => theme.primaryTitle};
    font-size: 0.7rem;
    text-align: center;
    padding: 10px;
    padding-top: 20px;
`;

const Span = styled.span`
    color: ${({ theme }) => theme.blue};
`;

const Contacts = () => {
    const currentUser = useContext(AuthContext);

    const [chats, setChats] = useState([]);

    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(
                doc(database, "userChat", currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    // console.log(Object.entries(chats));
    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <Container>
            {/* /////////////////////////////////////////////////////// */}
            {Object.entries(chats)
                ?.sort((a, b) => a[1].date - b[1].date)
                .map((chat) => (
                    <Contact
                        key={chat[0]}
                        chat={chat}
                        handleSelect={handleSelect}
                    />
                ))}

            <EndText>
                Your personal messages are <Span>end-to-end encrypted</Span>
            </EndText>
        </Container>
    );
};

export default Contacts;
