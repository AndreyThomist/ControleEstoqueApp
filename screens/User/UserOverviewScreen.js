import React, { useEffect, useState, useCallback } from 'react'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import { View, Text, StyleSheet,FlatList,ActivityIndicator, Platform } from 'react-native'
import ItemComponent from '../../components/layout/Item'
import * as itemActions from '../../store/actions/items'
import HeaderButton from '../../components/ui/HeaderButton'
import { useDispatch, useSelector } from 'react-redux'

const UserOverviewScreen = (props) => {
    const items = useSelector(state => state.items.usersItems)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('willFocus', fetchUserItems);
        return () => {
            unsubscribe.remove();
       }
      },[fetchUserItems]);

    useEffect(() => {
        setIsLoading(true);
        fetchUserItems().then(res => {
            setIsLoading(false);
        });
    }, [fetchUserItems])
    const fetchUserItems = useCallback(async () => {
        await dispatch(itemActions.fetchItemsUser())
    }, [dispatch])


    const refreshHandler = useCallback(async () => {
        setIsRefreshing(true);
        await fetchUserItems();
        setIsRefreshing(false);
    },[setIsRefreshing,fetchUserItems])

    if (isLoading) {
        return <View style={styles.spinner}>
            <ActivityIndicator color="blue" size="large" />
        </View>
    }

    if (items == 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Items Found</Text>
        </View>
    }

    return <FlatList refreshing={isRefreshing} onRefresh={refreshHandler} keyExtractor={(item) => item.id.toString()} data={items} renderItem={({ item }) => {
        return <ItemComponent navigation={props.navigation} id={item.id} name={item.name} quantity={item.quantity} imageUrl={item.imageUrl} />
    }} />
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
UserOverviewScreen.navigationOptions = props => {
    return {
        headerTitle: 'Admin - Overview Screen',
        headerLeft: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton} >
                <Item title="toggle" onPress={() => {
                    props.navigation.toggleDrawer();
                }} color="white" iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"} ></Item>
            </HeaderButtons>
        },
        headerRight: () => {
            return <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item onPress={() => {
                    props.navigation.navigate('addItem')
                }} title="add" color="white" iconName={Platform.OS === "android" ? "md-add" : "ios-add"} />
            </HeaderButtons>
        }
    }
}

export default UserOverviewScreen;
