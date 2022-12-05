import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ThemeProvider } from "styled-components";

import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import { darkTheme } from "./utils/Theme";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";

const Container = styled.div`
    display: flex;
    max-height: 100vh; ////caused many problems
    width: 100%;
    background-color: ${({ theme }) => theme.bg};

    border: 20px solid ${({ theme }) => theme.bg};
`;

const App = () => {
    const currentUser = useContext(AuthContext);
    /////////////////////////////////////////////////////////////////////
    //important use it in all the apps
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/" />;
        }
        return children;
    };
    /////////////////////////////////////////////////////////////////////
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <Container>
                    <Routes>
                        <Route path="/">
                            <Route index element={<SignIn />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route
                                path="main"
                                element={
                                    <ProtectedRoute>
                                        <Main />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
