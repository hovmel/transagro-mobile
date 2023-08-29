import React from 'react';
import Svg, { G, Path } from "react-native-svg"

const ProfileIcon = (props) => {
    return (
        <Svg
            width={20}
            height={20}
            fill={'#A7A7A7'}
            data-name="Layer 1"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M25 1a24 24 0 1024 24A24 24 0 0025 1zm0 46a22 22 0 1122-22 22 22 0 01-22 22z" />
            <Path d="M25 25.41a13 13 0 00-13 13 1 1 0 002 0 11 11 0 1122 0 1 1 0 002 0 13 13 0 00-13-13zM25 23.71a7 7 0 006.81-7.2A7 7 0 0025 9.3a7 7 0 00-6.81 7.21 7 7 0 006.81 7.2zm0-12.41a5 5 0 014.81 5.21 5 5 0 01-4.81 5.2 5 5 0 01-4.81-5.2A5 5 0 0125 11.3z" />
        </Svg>
    );
};

export default ProfileIcon;
