import React, { useCallback, useRef } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";

const Container = styled.div`
    min-width: 100%;
    height: 100%;
    background-color: orange;
    position: relative;
`;

const Wrapper = styled.div`
    background-color: coral;
    position: absolute;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 70px;
    height: 70px;

    border-radius: 50%;
    border: 5px solid gray;
    font-size: 0.7rem;
    background-color: #891010;
    color: white;
    padding: 5px;

    &:active {
        background-color: red;
    }
`;

const Camera = () => {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user",
    };

    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
    }, [webcamRef]);

    return (
        <Container>
            <Wrapper>
                <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                />
                <Button onClick={capture}>Capture photo</Button>
            </Wrapper>
        </Container>
    );
};

export default Camera;
