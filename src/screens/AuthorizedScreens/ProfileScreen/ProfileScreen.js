import React, {useEffect, useState} from 'react';
import AppWrapper from "src/components/wrapper/app-wrapper";
import {Text, View, Keyboard, StyleSheet, FlatList, TouchableOpacity, ScrollView} from 'react-native'
import Banner from "src/components/banner/banner";
import SelectBox from "src/components/select-box/select-box";
import {useDispatch, useSelector} from "react-redux";
import {setUserToken} from "src/store/actions/user_token";
import {setUserData} from "src/store/actions/user_data";
import {removeAuth} from "src/services/AsyncStorageServices/AsyncStorageServices";
import Modal from 'react-native-modal'
import AppTitle from "src/components/title/app-title";
import {globalStyles} from "src/themes/global_styles/global_styles";
import AppInput from "src/components/input/app-input";
import AppButton from "src/components/button/app-button";
import {createManager} from "src/services/API/create-manager";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import {getManagersRequest} from "../../../services/API/get-managers";
import {COLORS} from "../../../themes/constants/colors";
import {deleteManagerRequest} from "../../../services/API/delete-manager";
import {setManagersToReducer} from "../../../store/actions/managers";
import {useNavigation} from "@react-navigation/native";
import ProfileItem from "src/components/profile-item/profile-item";
import HumanLogo from "src/assets/icons/HumanLogo.svg"
import XMarkSvg from "src/assets/icons/XMarkSvg.svg"
import EditSvg from "src/assets/icons/EditSvg.svg"
import {FONTS} from "src/themes/constants/fonts";
import AddIcon from "src/assets/icons/add_manager.svg"
import MyModal from "../../../components/my-modal/my-modal";
import {handleDeleteProfile} from "../../../services/API/registration";

const ProfileScreen = () => {
    const dispatch = useDispatch()
    const userData = useSelector((store) => store.user_data.user_data)
    const tokenFromReducer = useSelector((store) => store.user_token.user_token)
    const isSubscribed = useSelector((store) => store.user_data.isSubscribed)

    const [modalVisible, setModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const navigation = useNavigation()
    const [managers, setManagers] = useState([]);
    const [managerToDelete, setManagerToDelete] = useState({});
    const [logOutModalVisible, setLogOutModalVisible] = useState(false)
    const [deleteProfileModalVisible, setDeleteProfileModalVisible] = useState(false)

    const logOut = async () => {
        dispatch(setUserToken(false))
        dispatch(setUserData(null))
        await removeAuth()
    }

    const deleteProfile = async () => {
        const data = await handleDeleteProfile(tokenFromReducer);
        setDeleteProfileModalVisible(false);
        console.log(data, 'after deleting')
        if (data?.success) {
            await logOut();
        }
    }

    const handleCreateManager = async () => {
        if (name && phoneNumber) {
            const data = {
                FullName: name,
                phone_number: phoneNumber
            }
            const res = await createManager(data, tokenFromReducer);
            if (res?.success) {
                closeModal()
                await getManagers();
            }
        }
    }

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => {
            setName('');
            setPhoneNumber('');
        }, 400)
    }

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
        setTimeout(() => {
            setManagerToDelete({});
        }, 400)
    }

    const getManagers = async () => {
        const res = await getManagersRequest(tokenFromReducer);
        if (res?.managers) {
            setManagers(res?.managers || []);
            dispatch(setManagersToReducer(res?.managers || []))
        }
    }

    const onManagerPress = val => {
        setManagerToDelete(val);
        setDeleteModalVisible(true);
    }

    const deleteManager = async () => {
        const res = await deleteManagerRequest(managerToDelete.id, tokenFromReducer);
        if (res?.success) {
            closeDeleteModal();
            getManagers().then();
        }
        console.log(res)
    }

    useEffect(() => {
        getManagers().then();
    }, [])

    const onBannerPress = () => {
        navigation.navigate('Подписка');
    }

    return (
        <AppWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Banner onPress={onBannerPress} subscribe_status={isSubscribed}/>
                <View style={styles.userDataContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <ProfileItem title={'Название организации'} subTitle={userData?.company_name}/>
                        <TouchableOpacity onPress={()=>{navigation.navigate("EditProfileScreen")}}>
                            <EditSvg/>
                        </TouchableOpacity>
                    </View>
                    <ProfileItem title={'Email'} subTitle={userData?.email}/>
                    <ProfileItem title={'Телефон'} subTitle={userData?.phone_number}/>
                    <ProfileItem title={'Почтовый индекс'} subTitle={userData?.postal_address}/>
                    <ProfileItem title={'Юридический адрес'} subTitle={userData?.legal_address}/>
                    <ProfileItem title={'ИНН'} subTitle={userData?.inn}/>
                    <ProfileItem title={'ОГРН'} subTitle={userData?.ogrn}/>
                </View>
                {!managers.length ? <View style={{alignItems: 'center', marginTop: 58, marginBottom: 24 }}>
                        <HumanLogo/>
                        <Text style={styles.manager_title}>
                            У вас пока нет менеджеров, добавьте менеджера
                        </Text>
                    </View>
                    :
                    <View style={styles.managersBox}>
                        <Text style={styles.managersBoxTitle}>
                            Список менеджеров:
                        </Text>
                        {managers.map((item) => (
                            <View style={styles.managerItemBox} key={item.id}>
                                <View>
                                    <Text style={styles.subTitle}>{item?.FullName}</Text>
                                    <Text style={styles.subTitle}>{item?.phone_number}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    onManagerPress(item)
                                }}>
                                    <XMarkSvg/>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                }
                <TouchableOpacity style={styles.add_button} onPress={()=>{setModalVisible(true)}}>
                    <AddIcon />
                    <Text style={{fontSize: 16, fontFamily: FONTS.medium, color: COLORS.text1, textDecorationLine: 'underline', marginLeft: 8}}>
                        Добавить менеджера
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setLogOutModalVisible(true)}} style={styles.logOutTitleBox}>
                    <Text style={styles.logOutTitle}>Выйти из профиля</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setDeleteProfileModalVisible(true)}} style={styles.deleteTitleBox}>
                    <Text style={styles.deleteTitle}>Удалить профиль</Text>
                </TouchableOpacity>
            </ScrollView>
            <MyModal
                isVisible={deleteModalVisible}
                closeFunction={closeDeleteModal}
                leftButtonText={'Удалить'}
                rightButtonText={'Отмена'}
                onLeftButtonPress={deleteManager}
                onRightButtonPress={closeDeleteModal}
                label={'Вы уверены, что хотите удалить менеджера?'}
                selectedLabel={managerToDelete.FullName}
            />

            <MyModal
                isVisible={modalVisible}
                closeFunction={closeModal}
                leftButtonText={'Отмена'}
                rightButtonText={'Создать'}
                onLeftButtonPress={closeModal}
                onRightButtonPress={handleCreateManager}
                rightButtonDisabled={!name || !phoneNumber}
                label={'Введите имя и номер менеджера, чтобы добавить его в список'}>
                <View style={{marginTop: 20}}>
                    <AppInput
                        value={name}
                        onChangeText={setName}
                        placeholder={'Имя...'}
                    />
                    <AppInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder={'Номер телефона...'}
                        keyboardType={'phone-pad'}
                    />
                </View>
            </MyModal>


            <MyModal
                isVisible={logOutModalVisible}
                closeFunction={() => setLogOutModalVisible(false)}
                leftButtonText={'Выйти'}
                rightButtonText={'Отмена'}
                onLeftButtonPress={logOut}
                onRightButtonPress={() => setLogOutModalVisible(false)}
                label={'Вы уверены, что хотите выйти из профиля?'}
            />
            <MyModal
                isVisible={deleteProfileModalVisible}
                closeFunction={() => setDeleteProfileModalVisible(false)}
                leftButtonText={'Удалить'}
                rightButtonText={'Отмена'}
                onLeftButtonPress={deleteProfile}
                onRightButtonPress={() => setDeleteProfileModalVisible(false)}
                label={'Вы уверены, что хотите удалить ваш профиль?'}
                selectedLabel={'Все данные будут безвозвратно удалены'}
            />
        </AppWrapper>
    );
};

export default ProfileScreen;
const styles = StyleSheet.create({
    review_modal: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        maxHeight: 400
    },
    managerItem: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: '#858585',

        flexDirection: 'row'
    },
    managerName: {
        marginRight: 10,
        color: COLORS.globalBlue
    },
    userDataContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 8,
        paddingHorizontal: 22,
        paddingVertical: 18,
    },
    manager_title: {
        textAlign: 'center',
        width: 252,
        fontSize: 16,
        color: COLORS.text1,
        marginTop: 12,
        marginBottom: 32,
        fontWeight: '400',
        fontFamily: FONTS.regular
    },
    add_manager_title: {
        color: COLORS.text1,
        fontSize: 16,
        fontWeight: '500',
        fontFamily: FONTS.regular
    },
    managersBox: {
        marginTop: 24
    },
    managersBoxTitle: {
        fontSize: 16,
        fontFamily: FONTS.medium,
        color: COLORS.text1,
        marginBottom: 10
    },
    managerItemBox: {
        width: '100%',
        height: 64,
        backgroundColor: '#F5FAFF',
        borderWidth: 1,
        borderColor: COLORS.blue,
        marginBottom: 10,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subTitle: {
        color: COLORS.text1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 20,
        fontFamily: FONTS.regular
    },
    logOutTitleBox:{
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        width: 140,
        alignSelf: 'center',
    },
    deleteTitleBox:{
        alignItems: 'center',
        marginBottom: 12,
        width: 140,
        alignSelf: 'center',
    },
    logOutTitle:{
        borderBottomColor: COLORS.text1,
        fontFamily: FONTS.regular,
    },
    deleteTitle:{
        fontFamily: FONTS.regular,
        color: COLORS.red
    },
    add_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        marginTop: 20
    }
})


//
//     <View style={{flex: 1}}>
// <SelectBox
// onPress={() => {
//     navigation.navigate("EditProfileScreen")
// }}
// title={'Редактировать свои данные'}
// subtitle={userData?.company_name + ' / ' + userData?.email}
// />
// <SelectBox
//     onPress={() => {
//         setModalVisible(true)
//     }}
//     title={'Добавить менеджера'}
//     subtitle={'Менеджер может создавать заказы'}
// />
//
// <FlatList
//     ListHeaderComponent={<Text>Список менеджеров:</Text>}
//     data={managers}
//     renderItem={renderManagerItem}/>
//
// {/*<SelectBox title={'Помощь'} subtitle={'Получить ответы на вапросы'}/>*/}
// </View>
// <View style={{marginBottom: 40}}>
//     <SelectBox
//         onPress={() => {
//             logOut()
//         }}
//         title={"Выйти"} subtitle={'Выйти из профиля'}/>
// </View>

