import AsyncStorage from "@react-native-async-storage/async-storage";
export const getAuth = async () =>{
    const token = await AsyncStorage.getItem('token')
    return {token}
}
export const removeAuth = async () =>{
    const token = await AsyncStorage.removeItem('token')
}

// token vercnely const {token} = await getAuth()

