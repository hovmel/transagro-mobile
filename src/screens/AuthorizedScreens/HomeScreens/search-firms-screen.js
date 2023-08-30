import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Keyboard, TextInput} from "react-native";
import AppWrapper from "src/components/wrapper/app-wrapper";
import FirmsItem from "src/components/firms-item/firms-item";
import {useDispatch, useSelector} from "react-redux";
import {getFirms} from "src/services/API/get-firms";
import {useNavigation} from "@react-navigation/native";
import SearchIcon from 'src/assets/icons/SearchIcon.svg'
import MyModal from "../../../components/my-modal/my-modal";
import {
    addCompanyToFavorites,
    addGoodToFavorites,
    deleteFromFavorites,
    getFavorites
} from "../../../services/API/favorites_api";
import {setFavorites} from "../../../store/actions/favorites";


const SearchFirmsScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const favoritesIds = useSelector((store) => store.favorites.favoritesIds)

    const userData = useSelector((store) => store.user_data.user_data)
    const isPaymentWorking = useSelector((store) => store.user_data.isPaymentWorking)?.isPaymentWorking === '1';
    const isSubscribed = useSelector((store) => store.user_data.isSubscribed);

    const [firms, setFirms] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const [favoritesLoading, setFavoritesLoading] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(() => {
            getFirms(tokenFromReducer, searchValue).then((r)=>{
                setFirms(r.data)
            })
        }, 300)

        return () => clearTimeout(timer)
    },[searchValue])

    const onFirmPress = item => {
        if (isSubscribed || !isPaymentWorking) {
            navigation.navigate('FirmSingleScreen', {firmData: item})
        } else {
            setModalVisible(true)
        }
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const goToSubscriptions = () => {
        closeModal();
        navigation.navigate('Подписка')
    }

    const onFavoritesPress = async (item) => {
        try {
            setFavoritesLoading(true);

            let res;
            if (favoritesIds?.companies?.includes(item.id)) {
                res = await deleteFromFavorites(tokenFromReducer, {order_id: item.id, order_type: 'company'});
            } else {
                res = await addCompanyToFavorites(tokenFromReducer, {company_id: item.id});
            }
            if (res.success) {
                const favs = await getFavorites(tokenFromReducer);
                if (favs.success) {
                    dispatch(setFavorites(favs))
                }
            }
            console.log(res)
        } catch (e) {
            console.log(e)
        } finally {
            setFavoritesLoading(false);
        }
    }

    const renderFirms = ({item})=>{
        return(
            <FirmsItem
                onPressItem={() => onFirmPress(item)}
                onFavoritesPress={onFavoritesPress}
                favoritesLoading={favoritesLoading}
                item={item}
                isInFavorites={favoritesIds?.companies?.includes(item.id)}
            />
        )
    }

    return (
        <AppWrapper
            placeholder={"Искать фирму..."}
        >
           <FlatList
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={
               <View style={styles.input_box}>
                  <TextInput
                      placeholder={'Поиск фирмы'}
                      onChangeText={setSearchValue}
                      value={searchValue}
                      style={{width: '90%'}}
                  />
                   <View
                       style={{width: '10%'}}
                   >
                       <SearchIcon/>
                   </View>
               </View>
           }
               data={firms}
               renderItem={renderFirms}
               extraData={firms}
               showVerticalScrollIndicator={false}
           />
            <MyModal
                isVisible={modalVisible}
                closeFunction={closeModal}
                label={`Для просмотра полной информации о фирме ${isPaymentWorking ? 'оплатите подписку на нашем сайте' : 'получите подписку в нашем приложении'}`}
                leftButtonText={'Отмена'}
                rightButtonText={`${isPaymentWorking ? 'Оплатить' : 'Получить'}`}
                onLeftButtonPress={closeModal}
                onRightButtonPress={goToSubscriptions}
            />

        </AppWrapper>
    );
};

export default SearchFirmsScreen;
const styles = StyleSheet.create({
    review_modal: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        maxHeight: 400
    },
    input_box:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        height: 46,
        alignItems:'center',
        marginBottom: 12,
        borderBottomColor: '#C7D7EA'
    }
})
