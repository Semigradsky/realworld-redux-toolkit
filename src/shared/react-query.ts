import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { operations, paths } from '@/config/swagger/api'

import type { PathParameters, RequestBody, Response } from './swagger'

export type ResultType<
	Path extends keyof paths,
	Method extends keyof paths[Path],
> = paths[Path][Method] extends operations[keyof operations]
	? Response<paths[Path][Method]>
	: never

export type QueryArg<
	Path extends keyof paths,
	Method extends keyof paths[Path],
> = paths[Path][Method] extends operations[keyof operations]
	? PathParameters<paths[Path][Method]> extends void
		? RequestBody<paths[Path][Method]>
		: PathParameters<paths[Path][Method]> & RequestBody<paths[Path][Method]>
	: never

interface Query<
	Path extends keyof paths,
	Method extends keyof paths[Path],
	Operation extends paths[Path][Method],
> {
	(
		pathParameter: Operation extends operations[keyof operations]
			? PathParameters<Operation>
			: never,
	): string
}

interface ReturnQuery<
	Path extends keyof paths,
	Method extends keyof paths[Path],
	Operation extends paths[Path][Method],
> extends Query<Path, Method, Operation> {
	ResultType: ResultType<Path, Method>
	QueryArg: QueryArg<Path, Method>
}

export const query = <
	Path extends keyof paths,
	Method extends keyof paths[Path],
	Operation extends paths[Path][Method],
>(
	templatePath: Path,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_method: Method,
) =>
	((pathParameter) => {
		if (!pathParameter) {
			return templatePath
		}

		let path: string = templatePath

		for (const [paramName, paramValue] of Object.entries(pathParameter)) {
			path = path.replace(new RegExp(`\\{${paramName}\\}`), String(paramValue))
		}

		return path
	}) as ReturnQuery<Path, Method, Operation>

interface ReturnMutation<
	Path extends keyof paths,
	Method extends keyof paths[Path],
	Operation extends paths[Path][Method],
> {
	onlyBodyQuery: <
		Body = Operation extends operations[keyof operations]
			? RequestBody<Operation>
			: never,
	>(
		body: Body,
	) => {
		url: Path
		method: Method
		body: Body
	}

	url: Query<Path, Method, Operation>

	method: string

	body: <
		Body = Operation extends operations[keyof operations]
			? RequestBody<Operation>
			: never,
	>(
		body: Body,
	) => Body

	ResultType: ResultType<Path, Method>
	QueryArg: QueryArg<Path, Method>
}

export const mutation = <
	Path extends keyof paths,
	Method extends keyof paths[Path],
	Operation extends paths[Path][Method],
>(
	path: Path,
	method: Method,
) =>
	({
		onlyBodyQuery: <T>(body: T) => ({
			url: path,
			method,
			body,
		}),
		url: query(path, method),
		method,
		body: <T>(x: T): T => x,
	}) as unknown as ReturnMutation<Path, Method, Operation>

export const mapReactQueryErrorsToStrings = (
	errors: FetchBaseQueryError | SerializedError | undefined,
): string[] => {
	if (!errors) {
		return []
	}

	if ('error' in errors) {
		return [errors.error]
	}

	if (
		'data' in errors &&
		typeof errors.data === 'object' &&
		errors.data !== null
	) {
		if (
			'errors' in errors.data &&
			typeof errors.data.errors === 'object' &&
			errors.data.errors !== null
		) {
			return Object.entries(errors.data.errors).flatMap(
				([fieldName, errors]) => {
					return errors.map((error: string) => `${fieldName} ${error}`)
				},
			)
		}
	}

	return ['Unknown error']
}
