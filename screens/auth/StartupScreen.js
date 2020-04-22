import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as AuthActions from '../../store/actions/auth'

const StartupScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const fetchUserDataStorage = useCallback(async () => {
        setIsLoading(true)
        const data = await AsyncStorage.getItem('userData');
        const auth = JSON.parse(data)
        if (auth == null || !auth.token) {
            props.navigation.reset('Login')
        } else {
            const expires = auth.expiresIn;
            const now = new Date().getTime();
            if (now < expires) {
                dispatch(AuthActions.authenticate(data))
                props.navigation.navigate('listagemItens')
            } else {
                props.navigation.reset('Login')
            }
        }
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true);
        fetchUserDataStorage();
        setIsLoading(false)
    }, []);
    
    if (isLoading) {
        return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    }
    return <View>

    </View>
}

StartupScreen.navigationOptions = props => {
    return {
        headerShown:false
    }
}

export default StartupScreen;