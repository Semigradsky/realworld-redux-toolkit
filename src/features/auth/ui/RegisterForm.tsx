import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { useRegisterMutation } from '@/entitties/user/api'
import { RootErrors } from '@/shared/form/RootErrors'

interface FieldValues {
	username: string
	email: string
	password: string
}

export const RegisterForm: FC = () => {
	const [registerUser, { error, isLoading }] = useRegisterMutation()

	const { register, handleSubmit } = useForm<FieldValues>({
		disabled: isLoading,
	})

	const onSubmit = handleSubmit((user) => {
		registerUser({ user })
	})

	return (
		<>
			<RootErrors error={error} />

			<form onSubmit={onSubmit}>
				<fieldset className="form-group">
					<input
						className="form-control form-control-lg"
						type="text"
						placeholder="Username"
						{...register('username')}
					/>
				</fieldset>
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
					Sign up
				</button>
			</form>
		</>
	)
}
