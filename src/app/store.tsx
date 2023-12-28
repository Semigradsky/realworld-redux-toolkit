import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction,
} from '@reduxjs/toolkit'

import { userApi } from '@/entitties/user/api'
import { authReducer } from '@/features/auth/authSlice'

export const store = configureStore({
	reducer: combineReducers({
		[userApi.reducerPath]: userApi.reducer,
		auth: authReducer,
	}),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(userApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
