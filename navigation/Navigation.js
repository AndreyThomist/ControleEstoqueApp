import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform  } from 'react-native'

import ItemOverviewScreen from  '../screens/ItemOverviewScreen'
import Colors from '../helpers/Colors';

const ItemStack = createStackNavigator({
    listagemItens:ItemOverviewScreen
},{
    defaultNavigationOptions :{
        headerStyle:{
            backgroundColor:Platform.OS === "android" ? Colors.secondary : Colors.primary
        },
        headerTintColor:"white"
    }
})

export default createAppContainer(ItemStack);
