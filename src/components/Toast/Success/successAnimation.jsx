import React from "react";
import Lottie from "react-lottie";
import Success from "@/components/Toast/Success/Success.json";

const SuccessAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Success,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
            scale: 1,
        },
    };
    return (
        <>
            <Lottie options={defaultOptions}/>
        </>
    );
};

export default SuccessAnimation;
