import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import { Platform  } from 'react-native'

import ItemOverviewScreen from  '../screens/ItemOverviewScreen'

import Colors from '../helpers/Colors';


const defaultOptions = {
    headerStyle:{
        backgroundColor:Platform.OS === "android" ? Colors.secondary : Colors.primary
    },
    headerTintColor:"white"
}

const ItemStack = createStackNavigator({
    listagemItens:ItemOverviewScreen
},{
    defaultNavigationOptions :defaultOptions
})

const drawerStack = createDrawerNavigator({
    listagemItens:ItemStack
},
{
    defaultNavigationOptions:defaultOptions
});

export default createAppContainer(drawerStack);
