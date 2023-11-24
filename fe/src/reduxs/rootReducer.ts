import { combineReducers } from '@reduxjs/toolkit'
import { accountReducer } from './accounts/account.reducers';
import modalReducer from './modals/modal.slices';
import dungeonReducer from './dungeons/dungeon.slice';
import sacrificeReducer from './sacrifices/sacrifice.slice';
import marketplaceReducer from './markets/market.slice';
import { api } from '@/services/api';

export const combineReducer = combineReducers({
    account: accountReducer,
    modal: modalReducer,
    dungeon: dungeonReducer,
    sacrifice: sacrificeReducer,
    marketplace: marketplaceReducer, 
    api: api.reducer
})