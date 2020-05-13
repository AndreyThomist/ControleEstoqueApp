import React, { useState, useCallback } from 'react'
import { View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Formik } from 'formik';
import Input from '../components/ui/Input'
import PickerComponent from '../components/ui/Picker'
import { useSelector, useDispatch } from 'react-redux'
import * as ActionsItems from '../store/actions/items'
import * as Yup from 'yup';

const AddItemScreen = (props) => {

    const dispatch = useDispatch();
    const providers = useSelector(state => state.providers.providers)
    const id = props.navigation.getParam('id')
    let itemEdit  = useSelector(state => state.items.items.filter(element => element != null && element.id === id))[0];
    const createItemHandler = useCallback(async (values) => {
        if (itemEdit) {
            console.log('ediçãoi')
            values.id = id;
            await dispatch(ActionsItems.editItem(values))
        } else {
            await dispatch(ActionsItems.createItem(values))
        }
       props.navigation.navigate('listagemItens')
    }, [dispatch,itemEdit])

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .required('Campo Nome é obrigatório'),
        imageUrl: Yup.string()
            .required('Campo Imagem é obrigatório'),
        provider: Yup.string()
            .required('Campo Provider é obrigatório'),
        quantity: Yup.string().required('Campo Quantity é obrigatório')
    });
    return (
        <Formik validationSchema={SignupSchema} onSubmit={createItemHandler} initialValues={{ name: itemEdit != null ? itemEdit.name : '', provider: itemEdit != null ? itemEdit.provider : '0', imageUrl: itemEdit != null ? itemEdit.imageUrl : '', quantity: itemEdit != null ? itemEdit.quantity : '' }}>
            {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => {
                return <TouchableWithoutFeedback onPressOut={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.formContainer}>
                        <Input onBlur={handleBlur('name')} errorMessage={errors.name} touched={touched.name} onChangeText={handleChange('name')} label={"Name"} value={values.name} />
                        <Input onBlur={handleBlur('imageUrl')} errorMessage={errors.imageUrl} touched={touched.imageUrl} onChangeText={handleChange('imageUrl')} label={"Image Url"} value={values.imageUrl} />
                        <PickerComponent errorMessage={errors.provider} onValueChange={handleChange('provider')} label={"Provider"} selectedValue={values.provider} items={providers} />
                        <Input onBlur={handleBlur('quantity')} errorMessage={errors.quantity} onChangeText={handleChange('quantity')} touched={touched.quantity} keyboardType={'number-pad'} label={"Quantity"} value={values.quantity} />
                        <View style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} title={itemEdit ? "Edit Item" : "Create Item"} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }}
        </Formik>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginVertical: 10,
        flex: 1,
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        width: '85%'
    }
})

AddItemScreen.navigationOptions = props => {
    return {
        headerTitle: 'Add Item '
    }
}


export default AddItemScreen;