import React from 'react';
import Svg, { Circle, Path } from "react-native-svg"

const CreateAccountIcon = (props) => {
    return (
        <Svg
            width={114}
            height={114}
            viewBox="0 0 114 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Circle
                cx={57}
                cy={56.8914}
                r={56.75}
                fill="#64B82A"
                fillOpacity={0.07}
            />
            <Path
                d="M39.07 52.141h-9.5v-9.5h-6.334v9.5h-9.5v6.334h9.5v9.5h6.334v-9.5h9.5V52.14zm31.667 3.167c5.383 0 9.5-4.117 9.5-9.5s-4.117-9.5-9.5-9.5c-.95 0-1.9.317-2.85.317 1.9 2.85 2.85 5.7 2.85 9.183 0 3.483-.95 6.333-2.85 9.183.95 0 1.9.317 2.85.317zm-15.834 0c5.383 0 9.5-4.117 9.5-9.5s-4.117-9.5-9.5-9.5-9.5 4.117-9.5 9.5 4.117 9.5 9.5 9.5zm20.9 6.967c2.533 2.216 4.434 5.383 4.434 8.866v6.334h9.5V71.14c0-4.75-7.6-7.916-13.934-8.866zm-20.9-.634c-6.333 0-19 3.167-19 9.5v6.334h38V71.14c0-6.333-12.667-9.5-19-9.5z"
                fill="#64B82A"
            />
        </Svg>
    );
};

export default CreateAccountIcon;
