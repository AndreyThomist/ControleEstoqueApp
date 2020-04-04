import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'

const ItemDetailScreen = (props) => {


    const id = props.navigation.getParam('id')

    const item = useSelector(state => state.items.items.find(element => element.id == id))

    return <View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri:item.imageUrl}}></Image>
        </View>
    </View>
}


const styles = StyleSheet.create({
    detail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        height:'100%',
        width:'100%'
    },
    image:{
        width:'95%',
        height:250
    }
})


ItemDetailScreen.navigationOptions = props => {
    const title = props.navigation.getParam('title')
    return {
        headerTitle: title
    }
}

export default ItemDetailScreen;