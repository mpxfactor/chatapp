import { Check, HistoryToggleOff } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import Image from "../photos/image1.png";

const Container = styled.div``;

const ContactItem = styled.div`
    width: 100%;
    padding: 15px 5px;
    max-height: 100%;

    display: flex;
    gap: 10px;
    color: ${({ theme }) => theme.primaryTitle};
    cursor: pointer;
    background-color: #e986ffe0;

    &:hover {
        background-color: #6b6b6b82;
    }
    &:active {
        background-color: #6b6b6b82;
    }
`;

const AvatarDiv = styled.div`
    position: relative;
`;
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: orange;
    position: relative;
    object-fit: cover;
`;

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1px;

    cursor: pointer;
`;

const Name = styled.h1`
    font-size: 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 400;
`;

const TimeAgo = styled.p`
    font-weight: 400;
    font-size: 0.7rem;
    margin-right: 5px;
`;
const TextDiv = styled.div`
    font-size: 0.8rem;
    display: flex;
    align-items: flex-end;
`;

const Text = styled.p``;

const Hr = styled.hr`
    margin: 0 0 0 60px;
    border: none;
    border-bottom: 1px solid #353131;
`;
const SearchContact = ({ user, handleClick }) => {
    return user ? (
        <Container onClick={handleClick}>
            <ContactItem>
                <AvatarDiv>
                    <Avatar src={user.photoURL} />
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

                <Details>
                    <Name>
                        {user.name} <TimeAgo>08:39</TimeAgo>
                    </Name>
                    <TextDiv>
                        <Check style={{ fontSize: "1rem" }} />
                        <Check
                            style={{
                                fontSize: "1rem",
                                marginLeft: "-11px",
                                visibility: "visible",
                            }}
                        />
                        <Text>Lorem, ipsum dolor.</Text>
                    </TextDiv>
                </Details>
            </ContactItem>
            <Hr />
        </Container>
    ) : (
        ""
    );
};

export default SearchContact;
