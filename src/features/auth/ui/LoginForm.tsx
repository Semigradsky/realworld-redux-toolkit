import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useLoginMutation } from '@/entitties/user/api'
import { RootErrors } from '@/shared/form/RootErrors'

interface FieldValues {
	email: string
	password: string
}

export const LoginForm: FC = () => {
	const [login, { error, isLoading }] = useLoginMutation()

	const { register, handleSubmit } = useForm<FieldValues>({
		disabled: isLoading,
	})

	const onSubmit: SubmitHandler<FieldValues> = (user) => {
		login({ user })
	}

	return (
		<>
			<RootErrors error={error} />

			<form onSubmit={handleSubmit(onSubmit)}>
				<fieldset className="form-group">
					<input
						className="form-control form-control-lg"
						type="text"
						placeholder="Email"
						{...register('email')}
					/>
				</fieldset>
				<fieldset className="form-group">
					<input
						className="form-control form-control-lg"
						type="password"
						placeholder="Password"
						{...register('password')}
					/>
				</fieldset>
				<button className="btn btn-lg btn-primary pull-xs-right" type="submit">
					Sign in
				</button>
			</form>
		</>
	)
}
