import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { userApi } from '@/entitties/user/api'
import { User } from '@/entitties/user/model'

type AuthState = {
	user: User | null
	token: string | null
}

const initialState: AuthState = {
	user: null,
	token: null,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.register.matchFulfilled,
			(state, { payload }) => {
				const { token, ...user } = payload.user
				state.user = user
				state.token = token
			},
		)

		builder.addMatcher(
			userApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				const { token, ...user } = payload.user
				state.user = user
				state.token = token
			},
		)
	},
})

export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
