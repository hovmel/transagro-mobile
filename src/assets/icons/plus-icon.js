import React from 'react';
import Svg, { Path } from "react-native-svg"
import {COLORS} from "src/themes/constants/colors";

const PlusIcon = (props) => {
    return (
        <Svg
            width={30}
            height={30}
            fill={'#000'}
            viewBox="0 0 15 15"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 15 15"
            {...props}
        >
            <Path d="M7.5 0C3.364 0 0 3.364 0 7.5S3.364 15 7.5 15 15 11.636 15 7.5 11.636 0 7.5 0zm0 14C3.916 14 1 11.084 1 7.5S3.916 1 7.5 1 14 3.916 14 7.5 11.084 14 7.5 14z" />
            <Path d="M8 3.5L7 3.5 7 7 3.5 7 3.5 8 7 8 7 11.5 8 11.5 8 8 11.5 8 11.5 7 8 7z" />
        </Svg>
    );
};

export default PlusIcon;
