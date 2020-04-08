import React, { useState, useCallback } from 'react'
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native'
import Input from '../../components/ui/Input'
import { Card } from 'react-native-elements'
import { Formik } from 'formik';
import * as Yup from 'yup'
import * as authActions from '../../store/actions/auth'
import { useDispatch } from 'react-redux';

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email  is Required'),
    password: Yup.string()
        .required('Password  is required'),
});

const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const loginHandler = useCallback( async (values) => {
        setIsLoading(true);
        await dispatch(authActions.login(values.email,values.password))
        setIsLoading(false);
        props.navigation.navigate('Startup');
    },[dispatch,setIsLoading])
    if (isLoading) {
        return <View style={styles.spinner}>
            <ActivityIndicator size={"large"} color="blue" />
        </View>
    }
    return <Formik validationSchema={SignupSchema} onSubmit={loginHandler} initialValues={{ email: '', password: '' }}>
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => {
            return (
                <Card>
                    <Input errorMessage={errors.email} selectedValue={values.email} touched={touched.email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} estilo={{ width: '100%' }} label="Email" />
                    <Input secureTextEntry={true} errorMessage={errors.password} selectedValue={values.password} touched={touched.password} onBlur={handleBlur('password')} onChangeText={handleChange('password')} estilo={{ width: '100%' }} label="Password" />
                    <View style={styles.actions}>
                        <Button title="Log in" onPress={handleSubmit} />
                    </View>
                </Card>
            );
        }}
    </Formik>

}

const styles = StyleSheet.create({
    actions: {
        marginTop: 25
    },
    spinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})


LoginScreen.navigationOptions = props => {
    return {
        headerTitleAlign: "center"
    }
}


export default LoginScreen;