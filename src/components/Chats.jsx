import { HistoryToggleOff, MoreVert, Search } from "@mui/icons-material";
import React, { useContext } from "react";
import styled from "styled-components";
import Input from "./Input";
import Messages from "./Messages";

import Image from "../photos/image1.png";
import { ChatContext } from "../Context/ChatContext";

const Container = styled.div`
    flex: 4;
    min-width: 200px;

    border-left: 2px solid black;
    display: flex;
    flex-direction: column;
`;

const Top = styled.div`
    max-height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 5px 10px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.primaryTitle};
`;

const Left = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`;
const AvatarDiv = styled.div`
    position: relative;
`;
const Avatar = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background-color: orange;
    cursor: pointer;
    position: relative;

    object-fit: cover;
    background-position: center;
`;

const Name = styled.h1`
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 500;
`;

const Right = styled.div`
    display: flex;
    gap: 20px;
    margin-right: 20px;
`;

const Chats = () => {
    const { data } = useContext(ChatContext);
    return (
        <Container>
            <Top>
                <Left>
                    <AvatarDiv>
                        <Avatar src={data.user.photoURL} />
                        <HistoryToggleOff
                            style={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                background: "black",
                                borderRadius: "100%",
                                color: "#676f73",
                                fontSize: "1.1rem",
                            }}
                        />
                    </AvatarDiv>
                    <Name>{data.user.displayName}</Name>
                </Left>
                <Right>
                    <Search />
                    <MoreVert />
                </Right>
            </Top>
            <Messages />
            <Input />
        </Container>
    );
};

export default Chats;
