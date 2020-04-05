import React from 'react'
import {Item,HeaderButtons} from 'react-navigation-header-buttons'
import { View, Text, StyleSheet, Platform} from 'react-native'
import HeaderButton from '../../components/ui/HeaderButton'

const UserOverviewScreen = (props) => {
  return <View style={styles.container}>
        <Text>User Item Screen</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

UserOverviewScreen.navigationOptions = props => {
     return {
         headerTitle:'Admin - Overview Screen',
         headerLeft:() => {
             return <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="toggle" onPress={() => {
                        props.navigation.toggleDrawer();
                }} color="white" iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"} ></Item>
             </HeaderButtons>
         },
         headerRight:() => {
             return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item onPress={() => {
                        props.navigation.navigate('addItem')
                    }} title="add" color="white" iconName={Platform.OS === "android" ? "md-add" : "ios-add"} />
             </HeaderButtons>
         }
     }
}

export default UserOverviewScreen;
