import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const ItemOverView = (props) => {
    return <View style={styles.container}>
               <Text>Listagem de produtos</Text>
           </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

ItemOverView.navigationOptions = nav => {
    return {
        headerTitle:"Listagem de itens"
    }
}

export default ItemOverView;