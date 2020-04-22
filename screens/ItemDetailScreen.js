import React, { useCallback } from 'react'
import { View, StyleSheet, Text, Image,Button,Alert} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import * as ActionsItem from '../store/actions/items'

const ItemDetailScreen = (props) => {

    
    const id = props.navigation.getParam('id')
    const imageUrl = props.navigation.getParam('imageUrl')
    const quantity = props.navigation.getParam('quantity')
    const name = props.navigation.getParam('name')
    
    const dispatch = useDispatch();
    const confirmDeleteHandler = () => {
        Alert.alert('Confirm!','Do you really wish to delete it?',[{text:'no',style:'destructive'},{text:'yes',style:'destructive',onPress:deleteItemHandler.bind(this,id)}])
    }
    const deleteItemHandler = useCallback( async (id) => {
        await dispatch(ActionsItem.deleteItem(id));
        props.navigation.goBack();
    },[dispatch])


    const editItemHandler = useCallback((id) => {
        props.navigation.navigate('addItem',{
            id:id
        })
    },[dispatch])
   
    return <View>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }}></Image>
        </View>
        <View style={styles.detail}>
            <Text style={styles.name}>{name}</Text>   
            <Text style={styles.quantityNumber}><Text style={styles.quantity}>Quantidade:</Text>{quantity}</Text>   
        </View>
        <View style={styles.actions}>
            <Button title="EDIT" onPress={editItemHandler.bind(this,id)} />
            <Button color="red" onPress={confirmDeleteHandler} title="DELETE" />
        </View>
    </View>
}


const styles = StyleSheet.create({
    detail: {
        marginVertical:25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding:5
    },
    quantityNumber:{
        fontSize:20
    },  
    quantity:{
        fontSize:24,
    },  
    name:{
        fontFamily:'exo2-bold',
        fontSize:40
    },  
    imageContainer: {
        height: 250,
        width: '100%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions:{
        marginVertical:'10%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})


ItemDetailScreen.navigationOptions = props => {
    const name = props.navigation.getParam('name')
    return {
        headerTitle: name
    }
}

export default ItemDetailScreen;