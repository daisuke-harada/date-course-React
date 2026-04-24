import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import currentDateCourseReducer from './currentDateCourseSlice';
import loginReducer from './loginSlice';
import storage from 'redux-persist/lib/storage';

// key: 'root' は、永続化された状態のキーを指定します。
// storage は、使用するストレージエンジンを指定します（ここではlocalStorage）。
// whitelist は、永続化するreducerのリストを指定します（ここでは'session'のみ）。
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'currentDateCourse']
};

// reducerをまとめます
const rootReducer = combineReducers({
  session: loginReducer,
  currentDateCourse: currentDateCourseReducer
});

// すべてのreducerの中からwhitelistで指定されたものだけ永続化するようにする
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // persist/PERSIST と persist/REHYDRATE はredux-persistが使用するため除外
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // DateSpotData の createdAt / updatedAt / openingTime / closingTime は Date オブジェクトのため除外
      ignoredPaths: [
        'currentDateCourse.managementCourse.dateSpots',
        'session.currentUser',
      ]
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;
