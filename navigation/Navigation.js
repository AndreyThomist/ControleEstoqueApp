import React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ItemOverviewScreen from '../screens/ItemOverviewScreen'
import ItemDetailScreen from '../screens/ItemDetailScreen'
import UserOverviewScreen from '../screens/User/UserOverviewScreen'
import AddItemScreen from '../screens/AddItemScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import StartupScreen from '../screens/auth/StartupScreen'
import DrawerButton from './DrawerButton'

import Colors from '../helpers/Colors';

const defaultOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.secondary : Colors.primary
    },
    headerTintColor: "white"
}

const ItemStack = createStackNavigator({
    Startup: StartupScreen,
    Login: LoginScreen,
    listagemItens: ItemOverviewScreen,
    DetailScreen: ItemDetailScreen,
}, {
    defaultNavigationOptions: defaultOptions
})

const adminStack = createStackNavigator({
    Admin: UserOverviewScreen,
    addItem: AddItemScreen
}, {
    defaultNavigationOptions: defaultOptions
})

const drawerStack = createDrawerNavigator({
    Items: {
        screen: ItemStack,
        navigationOptions: {
            drawerIcon: () => {
                return <Ionicons name={Platform.OS === "android" ? "md-list" : "ios-list"} size={24} color={"black"} />
            }
        },
    },
    Admin: {
        screen: adminStack,
        navigationOptions: {
            drawerIcon: () => {
                return <Ionicons name={Platform.OS === "android" ? "md-person" : "ios-person"} size={24} color={"black"} />
            },

        }
    }
},
    {
        defaultNavigationOptions: defaultOptions,
        contentComponent:(props) => {
             return <DrawerButton title="LOG OUT" {...props}></DrawerButton>
        }
    });

export default createAppContainer(drawerStack);
