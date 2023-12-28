import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { FC, useMemo } from 'react'

import { mapReactQueryErrorsToStrings } from '../react-query'

export const RootErrors: FC<{
	error: FetchBaseQueryError | SerializedError | undefined
}> = ({ error }) => {
	const errors = useMemo(() => mapReactQueryErrorsToStrings(error), [error])

	return errors.length ? (
		<ul className="error-messages">
			{errors.map((error, i) => (
				<li key={i}>{error}</li>
			))}
		</ul>
	) : null
}
