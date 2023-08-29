import React from 'react';
import Svg, { Path } from "react-native-svg"

const ArrowLeft = (props) => {
    return (
        <Svg
            height="24px"
            viewBox="0 0 128 128"
            width="24px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 128 128"
            {...props}
        >
            <Path
                d="M87.5 111L40.5 64"
                fill="none"
                stroke="#2f3435"
                strokeWidth={15}
                strokeLinecap="square"
                strokeMiterlimit={15}
            />
            <Path
                d="M40.5 64L87.5 17"
                fill="none"
                stroke="#2f3435"
                strokeWidth={15}
                strokeLinecap="square"
                strokeMiterlimit={15}
            />
        </Svg>
    );
};

export default ArrowLeft;
