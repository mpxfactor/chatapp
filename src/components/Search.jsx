import { FilterList } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
    doc,
} from "firebase/firestore";
import { database } from "../utils/firebase";
import Contact from "./Contact";
import Contacts from "./Contacts";
import SearchContact from "./SearchContact";
import { AuthContext } from "../Context/AuthContext";

const Container = styled.div`
    display: flex;
    gap: 10px;
    height: 60px;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-between;
    /* padding: 0 10px; */
    background-color: ${({ theme }) => theme.bg};
`;

const SearchWrapper = styled.div`
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: white;

    border-radius: 10px;
    padding: 0 5px;
    background: #000000ec;

    color: ${({ theme }) => theme.secondaryLighter};
`;

const SearchBar = styled.input`
    width: 100%;
    height: 40px;
    outline: none;
    border: none;

    font-size: 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.secondaryLighter};
`;

const FoundUsers = styled.div`
    display: flex;
    flex-direction: column;

    height: 100px;
    overflow-y: scroll;

    background: black;

    display: block;
    margin-right: 20px;
`;

const Search = () => {
    const currentUser = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [error, setError] = useState(false);
    const [user, setUser] = useState({});

    const handleSearch = async () => {
        const q = query(
            collection(database, "user"),
            where("name", "==", userName)
        );
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length === 0) {
                setError(true);
            } else {
                setError(false);
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setUser(doc.data());
            });
        } catch (err) {
            // setUser({});
            // setError(true);
        }
    };

    const handleKey = (event) => {
        event.code === "Enter" && handleSearch();
    };

    const handleUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleClick = async () => {
        //check whether the group already exists in firestore
        const combinedId =
            currentUser.uid > user.uid
                ? currentUser.uid + user.uid
                : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(database, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(database, "chats", combinedId), {
                    messages: [],
                });
                //create chat
                await updateDoc(doc(database, "userChat", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.name,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
                await updateDoc(doc(database, "userChat", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
            }
        } catch (error) {
            // console.log(error);
        }
        setUser({});
        setUserName("");

        //create new user chats
    };
    return (
        <>
            <Container>
                <SearchWrapper>
                    <SearchIcon onClick={handleKey} />
                    <SearchBar
                        placeholder="Search or start new Chat"
                        onChange={handleUserName}
                        onKeyDown={handleKey}
                        value={userName}
                    />
                </SearchWrapper>
                <FilterList style={{ color: "#667781" }} />
            </Container>

            {/* <FoundUsers> */}
            {user.uid && (
                <SearchContact user={user} handleClick={handleClick} />
            )}
            {/* </FoundUsers> */}
        </>
    );
};

export default Search;
