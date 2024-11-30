import { combineReducers, configureStore }  from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import jobSlice from "./jobSlice"
import {
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companySlice from "./companySlice"
import applicationSlice from "./applicationSlice"
import filterSlice from "./filterSlice"

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
}

const rootReducer = combineReducers({
   auth: authSlice.reducer,
   jobs: jobSlice.reducer,
   companies: companySlice.reducer,
   application:applicationSlice.reducer,
   filters: filterSlice.reducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => {
     return getDefaultMiddleware({
          serializableCheck:{
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         }
      })
   }
})


export default store