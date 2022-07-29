import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { financeReducer } from "./finance/finance-slice";
import { sessionReducer } from "./session/session-slice";
import { globalReducer } from "./global/global-slice";

const persistSession = {
  key: "session",
  storage,
  blacklist: ["error", "currentUser"],
};

const rootReducer = combineReducers({
  session: persistReducer(persistSession, sessionReducer),
  finance: financeReducer,
  global: globalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
  devTools: process.env.NODE_ENV === "development",
});

const persistedStore = persistStore(store);
export { store, persistedStore };
