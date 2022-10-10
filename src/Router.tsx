import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth } from 'navigation/RequireAuth';
import { PersistLogin } from 'navigation/PersistLogin';
import { PublicOnlyRoute } from 'navigation/PublicOnlyRoute';

import {
	Account,
	Login,
	SignUp,
	ForgotPassword,
	ResetPassword,
	Logout,
	Dashboard,
	ErrorPage,
	Contacts,
	ContactProfile,
} from './pages';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicOnlyRoute>
							<Login />
						</PublicOnlyRoute>
					}
				/>
				<Route
					path="/sign-up"
					element={
						<PublicOnlyRoute>
							<SignUp />
						</PublicOnlyRoute>
					}
				/>

				<Route
					path="/forgot-password"
					element={
						<PublicOnlyRoute>
							<ForgotPassword />
						</PublicOnlyRoute>
					}
				/>
				<Route
					path="/users/password/edit"
					element={
						<PublicOnlyRoute>
							<ResetPassword />
						</PublicOnlyRoute>
					}
				/>

				<Route element={<PersistLogin />}>
					<Route
						path="/dashboard"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="/dashboard/contacts/:id"
						element={
							<RequireAuth>
								<ContactProfile />
							</RequireAuth>
						}
					/>
					<Route
						path="/dashboard/contacts"
						element={
							<RequireAuth>
								<Contacts />
							</RequireAuth>
						}
					/>

					<Route
						path="/dashboard/account"
						element={
							<RequireAuth>
								<Account />
							</RequireAuth>
						}
					/>
				</Route>

				<Route path="/logout" element={<Logout />} />
				<Route path="/" element={<Navigate to="/dashboard" />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
