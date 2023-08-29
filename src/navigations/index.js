import {NavigationContainer} from '@react-navigation/native';
import SignInNavigations from "../../src/navigations/SignInNavigations";
import {useDispatch, useSelector} from "react-redux";
import {AuthorizedNavigations} from "src/navigations/AuthorizedNavigations";
import {getAuth, removeAuth} from "src/services/AsyncStorageServices/AsyncStorageServices";
import {useEffect, useState} from "react";
import {setUserToken} from "src/store/actions/user_token";
import {handleGetUserData} from "src/services/API/get-user-data";
import {setInfoModalText, setUserData} from "src/store/actions/user_data";
import {getManagersRequest} from "../services/API/get-managers";
import {setManagersToReducer} from "../store/actions/managers";
import {getFavorites} from "../services/API/favorites_api";
import {setFavorites} from "../store/actions/favorites";
import * as SplashScreen from "expo-splash-screen";
import {subscriptionOverText} from "../services/helpers/constants";
import InfoModal from "../components/InfoModal";
import {changeSubscribeMessageStatus} from "../services/API/registration";
import moment from "moment";

export const Navigations = () => {
    const dispatch = useDispatch()
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const userData = useSelector((store) => store.user_data.user_data)


    useEffect(() => {
        (async () => {
            const token = await getAuth()
            if (token) {
                dispatch(setUserToken(token.token))
                const favorites = await getFavorites(token.token);
                if (favorites.success) {
                    dispatch(setFavorites(favorites));
                } else {
                    if (favorites.message === 'Unauthorized') {
                        dispatch(setUserToken(false))
                        dispatch(setUserData(null))
                        await removeAuth()
                    }
                }
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            if (tokenFromReducer) {
                handleGetUserData(tokenFromReducer).then(r => {
                    dispatch(setUserData(r.user))
                })
                getManagersRequest(tokenFromReducer).then(res => {
                    dispatch(setManagersToReducer(res?.managers))
                })
            }
        })();
    }, [tokenFromReducer])

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync()
        }, 1000)
    }, []);

    useEffect(() => {
        if (userData) {
            if (!userData.valid_until || moment(userData.valid_until, 'YYYY-MM-DD HH:mm:ss') > moment()) {
                return;
            }
            console.log({userData});
            if (userData.subscribe_message_status === '0') {
                dispatch(setInfoModalText(subscriptionOverText));
                changeSubscribeMessageStatus(tokenFromReducer).then();
            }
        }
    }, [userData])

    return (
        <NavigationContainer>
            {!tokenFromReducer ?
                <SignInNavigations/>
                :
                <AuthorizedNavigations/>
            }

            <InfoModal />
        </NavigationContainer>
    );
};
