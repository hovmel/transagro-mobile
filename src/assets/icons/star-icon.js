import React from 'react';
import Svg, { Path } from "react-native-svg"

const StarIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            fill={'#A7A7A7'}
            viewBox="0 0 612 612"
            xmlSpace="preserve"
            enableBackground="new 0 0 612 612"
            {...props}
        >
            <Path d="M387.674 238.179L305.583 0l-84.428 236.26L0 238.179l181.82 150.942L116.475 612l189.108-135.308L494.69 612l-65.372-221.433L612 238.179H387.674zm65.29 317.879L305.583 434.659l-147.38 121.398 55.664-173.475L69.545 265.664l172.139-2.142 63.898-180.401 62.007 182.543h174.864L395.24 382.556l57.724 173.502z" />
        </Svg>
    );
};

export default StarIcon;
