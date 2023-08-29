import React, {useEffect, useState} from 'react';
import MyModal from "./my-modal/my-modal";
import {useDispatch, useSelector} from "react-redux";
import {setInfoModalText} from "../store/actions/user_data";

const InfoModal = () => {
    const dispatch = useDispatch();
    const infoModalText = useSelector(store => store.user_data.infoModalText);
    const [isVisible, setIsVisible] = useState(false);
    const isPaymentWorking = useSelector((store) => store.user_data.user_data)?.isPaymentWorking === '1';

    useEffect(() => {
        setIsVisible(Boolean(infoModalText))
    }, [infoModalText])

    const closeInfoModal = () => {
        setIsVisible(false);
        setTimeout(() => {
            dispatch(setInfoModalText(''));
        }, 400)
    }

    return (
        <MyModal
            isVisible={isVisible && isPaymentWorking}
            closeFunction={closeInfoModal}
            label={infoModalText}
            rightButtonText={'Хорошо'}
            onRightButtonPress={closeInfoModal}
            justifyContent={'center'}
        />
    );
};

export default InfoModal;
