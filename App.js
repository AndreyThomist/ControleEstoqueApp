import React, { useState } from 'react';
import ItemReducer from './store/reducers/ItemReducer'
import { combineReducers, createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation'
import {AppLoading}  from 'expo'
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk'
import ProviderReducer from './store/reducers/providerReducer'

const combinedReducers = combineReducers({
  items: ItemReducer,
  providers:ProviderReducer
})

const store = createStore(combinedReducers,applyMiddleware(ReduxThunk))

const fetchFonts = () => {
    return Font.loadAsync({
      'exo2-bold':require('./assets/fonts/Exo2-BoldItalic.ttf'),
      'exo2-italic':require('./assets/fonts/Exo2-Italic.ttf')
    })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

