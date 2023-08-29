import React from 'react';
import Svg, { Path } from "react-native-svg"

const XMark = (props) => {
    return (
        <Svg
            width={18}
            height={18}
            fill={'#000'}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 52.001 52.001"
            xmlSpace="preserve"
            enableBackground="new 0 0 52.001 52.001"
            {...props}
        >
            <Path
                d="M47.743 41.758L33.955 26.001l13.788-15.758a6.001 6.001 0 00-8.486-8.485L26 16.91 12.743 1.758a6.001 6.001 0 00-8.486 8.485l13.788 15.758L4.257 41.758a6 6 0 108.486 8.485L26 35.091l13.257 15.152a6 6 0 108.486-8.485z"
                fill="#030104"
            />
        </Svg>
    );
};

export default XMark;
