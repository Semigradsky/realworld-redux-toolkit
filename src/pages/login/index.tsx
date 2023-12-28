import { FC } from 'react'

import { LoginForm } from '@/features/auth/ui/LoginForm'

export const LoginPage: FC = () => {
	return (
		<div className="auth-page">
			<div className="container page">
				<div className="row">
					<div className="col-md-6 offset-md-3 col-xs-12">
						<h1 className="text-xs-center">Sign in</h1>
						<p className="text-xs-center">
							<a href="/register">Need an account?</a>
						</p>

						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	)
}
