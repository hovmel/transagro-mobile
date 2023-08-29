import React from 'react';
import Svg, { Path } from "react-native-svg"

const LocationIcon = (props) => {
    return (
        <Svg
            width={17}
            height={22}
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8.586.907C4.392.907.98 4.344.98 8.569c0 6.004 6.892 12.203 7.186 12.463a.633.633 0 00.843.001c.294-.261 7.186-6.46 7.186-12.464 0-4.225-3.413-7.662-7.608-7.662zm0 11.833A4.231 4.231 0 014.36 8.514a4.231 4.231 0 014.226-4.226 4.231 4.231 0 014.227 4.226 4.231 4.231 0 01-4.227 4.226z"
                fill="#478CC8"
            />
        </Svg>
    );
};

export default LocationIcon;
