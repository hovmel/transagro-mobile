import React from 'react';
import Svg, { Defs, Path } from "react-native-svg"
import {COLORS} from "src/themes/constants/colors";

const PackIcon = (props) => {
    return (
        <Svg
            width={160}
            height={160}
            fill={COLORS.globalBlue}
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            {...props}
        >
            <Defs></Defs>
            <Path
                className="cls-1"
                d="M100 175.69a5 5 0 01-2.23-.53l-70.69-35.27a5 5 0 01-2.77-4.48V64.86a5 5 0 012.77-4.47l70.69-35.28a5 5 0 014.46 0l70.69 35.28a5 5 0 012.77 4.47v70.55a5 5 0 01-2.77 4.48l-70.69 35.27a5 5 0 01-2.23.53zm-65.69-43.37L100 165.1l65.69-32.78V68L100 35.17 34.31 68zm136.38 3.09z"
            />
            <Path
                className="cls-1"
                d="M100 105a5 5 0 01-2.23-.52L27.09 69.34a5 5 0 114.45-9l68.46 34 68.46-34a5 5 0 114.45 9l-70.68 35.14a5 5 0 01-2.23.52z"
            />
            <Path
                className="cls-1"
                d="M135.34 87.43a5 5 0 01-2.22-.52L62.43 51.77a5 5 0 114.45-9L137.57 78a5 5 0 01-2.23 9.48zM100 175.69a5 5 0 01-5-5V100a5 5 0 0110 0v70.69a5 5 0 01-5 5z"
            />
        </Svg>
    );
};

export default PackIcon;
