import React from 'react'
import { View, Button, SafeAreaView, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer';

const DrawerButton = (props) => {

    const logoutHandler = () => {
        
    }

    return <SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
        <View style={{ ...styles.container, ...props.styles }}>
            <DrawerItems {...props} />
            <View style={styles.buttonContainer}>
                <Button title={props.title} color="blue" onPress={logoutHandler} />
            </View>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer:{
        width:'90%',
        flexDirection:'column',
        paddingHorizontal:10,
        marginTop:5
    }
})

export default DrawerButton;