import React from 'react'
import { Picker, View, StyleSheet, Text } from 'react-native'

const PickerComponent = (props) => {
    return <View style={styles.container}>
        <Text>{props.label}</Text>
        <Picker  {...props} >
            {props.items.map(item => {
               return <Picker.Item key={item.id} label={item.name} value={item.id} />
            })}
        </Picker>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        width:'85%'
    }
})

export default PickerComponent;