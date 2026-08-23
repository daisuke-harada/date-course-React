import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PersistConfig, createTransform, persistReducer, persistStore } from 'redux-persist';

import { CurrentDateCourseState } from 'types/managementCourses/management';
import { LoginState } from 'types/users/session';
import currentDateCourseReducer from './currentDateCourseSlice';
import { initialCourseInfo } from 'defaults/dateCourseDefaults';
import loginReducer from './loginSlice';
import storage from 'redux-persist/lib/storage';

// 未ログイン・未編集の初期値まで localStorage に書き込むと、
// ユーザーが手動で消しても中身が空のレコードが再生成され続けてしまう。
// redux-persist は inbound が undefined を返したキーを保存対象から外すため、
// 「まだ何も起きていない状態」は undefined を返して書き込み自体をスキップする。

// ログインしていなければ session を保存しない
const skipEmptySession = createTransform<LoginState, LoginState | undefined>(
  (inboundState) => (
    inboundState.loginStatus === false && inboundState.token === ''
      ? undefined
      : inboundState
  ),
  (outboundState) => outboundState as LoginState,
  { whitelist: ['session'] }
);

// スポットが1件も選ばれておらず、かつ移動手段・公開設定も初期値のままなら保存しない
// （dateSpots の初期値は id: 0 のダミー1件なので、id で実データかどうかを判定する）
const skipEmptyDateCourse = createTransform<CurrentDateCourseState, CurrentDateCourseState | undefined>(
  (inboundState) => {
    const hasSelectedSpot = inboundState.managementCourse.dateSpots.some(dateSpot => dateSpot.id !== 0);
    const isDefaultCourseInfo = inboundState.courseInfo.travelMode === initialCourseInfo.travelMode
      && inboundState.courseInfo.authority === initialCourseInfo.authority;

    return !hasSelectedSpot && isDefaultCourseInfo ? undefined : inboundState;
  },
  (outboundState) => outboundState as CurrentDateCourseState,
  { whitelist: ['currentDateCourse'] }
);

// reducerをまとめます
const rootReducer = combineReducers({
  session: loginReducer,
  currentDateCourse: currentDateCourseReducer
});

// key: 'root' は、永続化された状態のキーを指定します。
// storage は、使用するストレージエンジンを指定します（ここではlocalStorage）。
// whitelist は、永続化するreducerのリストを指定します（ここでは'session'のみ）。
// transforms は、永続化する直前・復元した直後に state を加工する処理を指定します。
// 型引数を明示しないと transforms から state の型が推論され、RootState の各キーが optional になってしまう。
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  whitelist: ['session', 'currentDateCourse'],
  transforms: [skipEmptySession, skipEmptyDateCourse]
};

// すべてのreducerの中からwhitelistで指定されたものだけ永続化するようにする
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // persist/PERSIST と persist/REHYDRATE はredux-persistが使用するため除外
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // DateSpotData の createdAt / updatedAt は Date オブジェクトのため除外
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
