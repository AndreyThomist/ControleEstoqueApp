import React from 'react';
import ItemReducer from './store/reducers/ItemReducer'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import Navigation from './navigation/Navigation'

console.log(ItemReducer)

const combinedReducers = combineReducers({
  itens: ItemReducer
})

const store = createStore(combinedReducers)

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

