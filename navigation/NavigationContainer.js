import React, { useEffect,useRef } from 'react'
import {View} from 'react-native'
import Navigation from './Navigation'
import { useSelector } from 'react-redux'
import {NavigationActions} from 'react-navigation'

const NavigationContainer = (props) => {
    const ref = useRef(null);
    const auth = useSelector(state => !!state.auth.token);
    useEffect(() => {
        if(!auth){
            ref.current.dispatch(NavigationActions.navigate({
                routeName:'Login'
            }))
        }
    },[auth])
    return <Navigation ref={ref} />
}

export default NavigationContainer;
