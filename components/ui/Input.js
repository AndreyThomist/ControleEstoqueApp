import React, { useState } from 'react'
import { View,Text, StyleSheet, TextInput } from 'react-native'
const Input = (props) => {
    return (
        <View style={{ ...styles.container,...props.estilo }}>
            <Text>{props.label}</Text>
            <View style={styles.formContainer}>
            <TextInput
                {...props}
            />
            </View>
            <View style={styles.errors}>
                     {props.errorMessage && props.touched ? <Text style={{color:'red'}}>{props.errorMessage}</Text> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        width:'85%'
    },
    formContainer:{
        borderBottomColor: '#000000',
        borderBottomWidth: 1,

    },
    errors:{
        marginVertical:5
    }
})

export default Input;