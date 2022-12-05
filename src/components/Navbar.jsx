import {
    AccountCircle,
    DonutLargeTwoTone,
    Groups3,
    Message,
    MoreVert,
} from "@mui/icons-material";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Context/AuthContext";
import { authentication } from "../utils/firebase";

const Container = styled.div`
    max-height: 60px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 5px 10px;

    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.icons};
`;

const Left = styled.div``;
const Right = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.button`
    background-color: #ff0000c1;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 5px;
    cursor: pointer;

    &:hover {
        background-color: red;
        -webkit-box-shadow: 10px 10px 58px 0px rgba(255, 0, 0, 1);
        -moz-box-shadow: 10px 10px 58px 0px rgba(255, 0, 0, 1);
        box-shadow: 10px 10px 58px 0px rgba(255, 0, 0, 1);
    }
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

const Navbar = () => {
    const currentUser = useContext(AuthContext);
    // console.log(currentUser);
    return (
        <Container>
            <Left>
                {/* <AccountCircle
                    style={{
                        fontSize: "3rem",
                    }}
                /> */}

                <Avatar src={currentUser.photoURL} />
            </Left>
            <Right>
                <Groups3 style={{ fontSize: "1.4rem" }} />
                <DonutLargeTwoTone style={{ fontSize: "1.4rem" }} />
                <Message style={{ fontSize: "1.4rem" }} />
                <MoreVert style={{ fontSize: "1.4rem" }} />
                <Button onClick={() => signOut(authentication)}>Logout</Button>
            </Right>
        </Container>
    );
};

export default Navbar;
