import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Contacts from "../components/Contacts";
import Chats from "../components/Chats";

const Left = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 400px;
`;

const Main = () => {
    return (
        <>
            <Left>
                <Navbar />
                <Search />
                <Contacts />
            </Left>
            <Chats />
        </>
    );
};

export default Main;
