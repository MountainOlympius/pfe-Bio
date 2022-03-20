import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import AuthenticatedOnly from './components/AuthenticatedOnly'
import AdminOnly from './components/AdminOnly'
import LoginPage from './pages/Login.page'

import './App.css'

const AdminPages = React.lazy(() => import('./pages/Admin.pages'))
const MainPages = React.lazy(() => import('./pages/Main.pages'))

function App() {
    return (
		<Routes>
            <Route path="/login" element={<LoginPage />} />
			<Route
				path="/admin/*"
				element={
					<Suspense fallback={<div>...loading</div>}>
						<AuthenticatedOnly>
							<AdminOnly>
								<AdminPages />
							</AdminOnly>
						</AuthenticatedOnly>
					</Suspense>
				}
			/>
			<Route
				path="/*"
				element={
					<Suspense fallback={<div>...loading</div>}>
						<MainPages />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default App
