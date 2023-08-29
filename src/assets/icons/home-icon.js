import React from 'react';
import Svg, { Path } from "react-native-svg"

const HomeIcon = (props) => {
    return (
        <Svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M27 29H5V17H3.235c-1.138 0-1.669-1.419-.812-2.168L14.131 3.745a2.716 2.716 0 013.737 0l11.707 11.087c.858.748.327 2.168-.812 2.168H27v12z"
                fill="none"
                stroke='#A7A7A7'
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1}
            />
            <Path
                d="M20 29h-8v-6a4 4 0 014-4h0a4 4 0 014 4v6z"
                fill="none"
                stroke='#A7A7A7'
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1}
            />
        </Svg>
    );
};

export default HomeIcon;
