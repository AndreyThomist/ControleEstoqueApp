import React, { useCallback } from 'react'
import { View, Button, SafeAreaView, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';
import * as AuthActions from '../store/actions/auth'
import { useDispatch } from 'react-redux';

const DrawerButton = (props) => {
    const dispatch = useDispatch();
    const logoutHandler = useCallback(async () => {
        await dispatch(AuthActions.logout());
        props.navigation.navigate('Login')
    }, [dispatch])

    return <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
        <View style={{ ...styles.container, ...props.styles }}>
            <DrawerItems {...props} />
            <View style={styles.buttonContainer}>
                <Button title={props.title} color="blue" onPress={logoutHandler} />
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        width: '90%',
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginTop: 5
    }
})

export default DrawerButton;