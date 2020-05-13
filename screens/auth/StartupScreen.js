import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, AsyncStorage, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import * as Yup from 'yup'

import * as AuthActions from '../../store/actions/auth'


const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email  is Required'),
    password: Yup.string()
        .required('Password  is required'),
});

const StartupScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setError] = useState(null)
    const dispatch = useDispatch();

    
    const loginHandler = useCallback(async (values) => {
        setIsLoading(true);
        try{
            await dispatch(AuthActions.login(values.email, values.password))
        } catch (e) {
            setError(e.message);
            showAlert();
        }
        setIsLoading(false);
        props.navigation.navigate('listagemItens');
    }, [dispatch, setIsLoading,AuthActions])
    const fetchUserDataStorage = useCallback(async () => {
        setIsLoading(true)
        const data = await AsyncStorage.getItem('userData');
        const auth = JSON.parse(data)
        if (auth == null || !auth.token) {
            return;
        } else {
            const expires = auth.expiresIn;
            const now = new Date().getTime();
            if (now < expires) {
                dispatch(AuthActions.authenticate(data))
                props.navigation.navigate('listagemItens')
            } else {
                return;
            }
        }
        setIsLoading(false);
    }, [dispatch])
    const showAlert = () => {
        Alert.alert('Error', hasError, [{ text: 'OK', style: 'destructive' }])
    }
 

    useEffect(() => {
        setIsLoading(true);
        fetchUserDataStorage();
        setIsLoading(false)
    }, [setIsLoading, fetchUserDataStorage]);

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    }
    return <View style={styles.container}><Formik validationSchema={SignupSchema} onSubmit={loginHandler} initialValues={{ email: '', password: '' }}>
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => {
            return (
                <View style={{ flex: 1, width: '95%', marginTop: '15%' }}>
                    <Input errorMessage={errors.email} selectedValue={values.email} touched={touched.email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} estilo={{ width: '100%' }} label="Email" />
                    <Input secureTextEntry={true} errorMessage={errors.password} selectedValue={values.password} touched={touched.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} estilo={{ width: '100%' }} label="Password" />
                    <View style={styles.actions}>
                        <Button title="Log in" onPress={handleSubmit} />
                    </View>
                </View>
            );
        }}
    </Formik></View>
}

StartupScreen.navigationOptions = props => {
    return {
        headerTitle: 'Login',
        headerTitleAlign: 'center'
    }
}


const styles = StyleSheet.create({
    actions: {
        marginTop: 25,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    spinner: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default StartupScreen;