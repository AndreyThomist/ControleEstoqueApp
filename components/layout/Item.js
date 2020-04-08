import React,{useCallback} from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import Colors from '../../helpers/Colors'
import Card from '../ui/Card'
const Item = (props) => {
  const { navigation } = props;

  const detailScreenHandler = () => {
      navigation.navigate('DetailScreen', {
        name: props.name,
        imageUrl:props.imageUrl,
        quantity:props.quantity,
        id: props.id
      })
  }

  return (
    <Card style={styles.product} key={props.id} >
      <TouchableOpacity style={styles.touchable} onPress={detailScreenHandler}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.quantity}><Text>Quantidade:</Text>{props.quantity}</Text>
        </View>
        <View style={styles.actions}>
          <Button title="Ver" onPress={detailScreenHandler} color={Colors.secondary} />
        </View>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 250,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 5
  },
  name: {
    fontSize: 17,
    fontFamily: 'exo2-bold',
    marginVertical: 2
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  quantity: {
    fontFamily: 'exo2-italic'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  actions: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default Item;