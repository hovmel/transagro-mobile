import React from 'react';
import Svg, {Path} from "react-native-svg";

const ClockIcon = (props) => {
    return (
        <Svg
            width={19}
            height={18}
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M9.533.137C4.816.137.979 3.974.979 8.691c0 4.717 3.837 8.554 8.554 8.554 4.716 0 8.554-3.837 8.554-8.554 0-4.717-3.838-8.554-8.554-8.554zM13.6 13.115a.71.71 0 01-1.008 0L9.029 9.551a.71.71 0 01-.209-.503V4.414a.713.713 0 111.426 0v4.338l3.355 3.355a.712.712 0 010 1.008z"
                fill="#478CC8"
            />
        </Svg>
    );
};

export default ClockIcon;
