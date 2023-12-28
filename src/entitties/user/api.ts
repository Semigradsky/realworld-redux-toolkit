import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { RootState } from '@/app/store'
import { mutation, query } from '@/shared/react-query'

const baseUrl = 'https://api.realworld.io/api'

const getCurrentUser = query('/user', 'get')
const loginUser = mutation('/users/login', 'post')
const registerUser = mutation('/users', 'post')

const updateArticle = mutation('/articles/{slug}', 'put')

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token
			if (token) {
				headers.set('authentication', `Bearer ${token}`)
			}
			return headers
		},
	}),
	endpoints: (builder) => ({
		me: builder.query<
			(typeof getCurrentUser)['ResultType'],
			(typeof getCurrentUser)['QueryArg']
		>({
			query: getCurrentUser,
		}),

		login: builder.mutation<
			(typeof loginUser)['ResultType'],
			(typeof loginUser)['QueryArg']
		>({
			query: loginUser.onlyBodyQuery,
		}),

		register: builder.mutation<
			(typeof registerUser)['ResultType'],
			(typeof registerUser)['QueryArg']
		>({
			query: registerUser.onlyBodyQuery,
		}),

		update: builder.mutation<
			(typeof updateArticle)['ResultType'],
			(typeof updateArticle)['QueryArg']
		>({
			query: ({ slug, ...body }) => ({
				url: updateArticle.url({ slug }),
				method: updateArticle.method,
				body: updateArticle.body(body),
			}),
		}),
	}),
	tagTypes: [''],
})

export const { useLoginMutation, useRegisterMutation } = userApi
