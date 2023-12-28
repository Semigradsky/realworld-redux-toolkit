/* eslint-disable @typescript-eslint/no-explicit-any */
import { operations } from '@/config/swagger/api'

export type PathParameters<Operation extends operations[keyof operations]> =
	Operation extends {
		parameters: any
	}
		? Operation['parameters']['path']
		: void

export type RequestBody<Operation extends operations[keyof operations]> =
	Operation extends {
		requestBody: any
	}
		? Operation['requestBody']['content']['application/json']
		: void

export type Response<Operation extends operations[keyof operations]> =
	Operation['responses'] extends {
		'200': any
	}
		? Operation['responses']['200']['content']['application/json']
		: Operation['responses'] extends { '201': any }
			? Operation['responses']['201']['content']['application/json']
			: void

type Request<T extends keyof operations> = {
	PathParameters: PathParameters<operations[T]>
	RequestBody: RequestBody<operations[T]>
	Response: Response<operations[T]>
}

export type Requests = {
	[K in keyof operations]: Request<K>
}
