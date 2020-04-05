import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'


const AddItemScreen = (props) => {
    return <View style={styles.container}>

    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

AddItemScreen.navigationOptions = props => {
    return {
        headerTitle:'Add Item '
    }
}


export default AddItemScreen;