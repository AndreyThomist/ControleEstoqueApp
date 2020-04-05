import React, { useEffect, useCallback, useState } from 'react'
import { View, FlatList, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import ItemComponent from '../components/layout/Item'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/ui/HeaderButton'
import * as ItemsActions from '../store/actions/items'
import * as ProvidersActions from '../store/actions/provider'

const ItemOverView = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const items = useSelector(state => state.items.items)
    useEffect(() => {
        setIsLoading(true);
        fetchItems();
        fetchProviders().then(res => {
            setIsLoading(false);
        });
    }, [fetchItems])


    const fetchItems = useCallback(async () => {
        await dispatch(ItemsActions.fecthItems());
    }, [dispatch, setIsLoading])

    const fetchProviders = useCallback(async () => {
        await dispatch(ProvidersActions.fetchProviders());
    },[dispatch])

    if (isLoading) {
        return <View style={styles.spinner}>
            <ActivityIndicator color="blue" size="large" />
        </View>
    }

    return <FlatList keyExtractor={(item) => item.id.toString()} data={items} renderItem={({ item }) => {
        return <ItemComponent navigation={props.navigation} id={item.id} name={item.name} quantity={item.quantity} imageUrl={item.imageUrl} />
    }} />
}

ItemOverView.navigationOptions = nav => {
    return {
        headerTitle: "List of items",
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="toggle" color="white" iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'} onPress={() => {
                    nav.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        }
    }
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ItemOverView;