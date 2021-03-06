import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import FeatureRequests from './components/containers/FeatureRequestsContainer/FeatureRequests/FeatureRequests';
import UserLogin from './components/containers/UserLoginContainer/UserLogin/UserLogin';
import Home from './components/containers/Home/Home';
import DashboardHome from './components/containers/AdminDashboard/DashboardHome/DashboardHome';
import Dashboard from './components/containers/AdminDashboard/Dashboard/Dashboard';
import AdminRoute from './components/shared/AdminRoute/AdminRoute';
import ManageRequests from './components/containers/AdminDashboard/ManageRequests/ManageRequests';
import ConfigureDashboard from './components/containers/AdminDashboard/ConfigureDashboard/ConfigureDashboard';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navigate to='home/list' />} />
				<Route path='home/*' element={<Home />}>
					<Route path='list/*' element={<FeatureRequests />} />
					<Route path='userlogin' element={<UserLogin />} />
				</Route>
				<Route
					path='/dashboard'
					element={
						<AdminRoute>
							<DashboardHome />
						</AdminRoute>
					}
				>
					<Route
						index
						element={
							<AdminRoute>
								<Dashboard />
							</AdminRoute>
						}
					/>
					<Route
						path='manage'
						element={
							<AdminRoute>
								<ManageRequests />
							</AdminRoute>
						}
					/>
					<Route
						path='configure'
						element={
							<AdminRoute>
								<ConfigureDashboard />
							</AdminRoute>
						}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
