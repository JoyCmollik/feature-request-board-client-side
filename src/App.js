import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import FeatureRequests from './components/containers/FeatureRequestsContainer/FeatureRequests/FeatureRequests';
import CreateFeatureRequest from './components/containers/FeatureRequestsContainer/CreateFeatureRequest/CreateFeatureRequest';
import FeatureRequestList from './components/containers/FeatureRequestsContainer/FeatureRequestList/FeatureRequestList';
import UserLogin from './components/containers/UserLoginContainer/UserLogin/UserLogin';
import PrivateRoute from './components/shared/PrivateRoute/PrivateRoute';
import FeatureRequestDetailPage from './components/containers/FeatureRequestsContainer/FeatureRequestDetailsPage/FeatureRequestDetailPage';
import Home from './components/containers/Home/Home';
import DashboardHome from './components/containers/AdminDashboard/DashboardHome/DashboardHome';
import Dashboard from './components/containers/AdminDashboard/Dashboard/Dashboard';
import AdminRoute from './components/shared/AdminRoute/AdminRoute';
import ManageRequests from './components/containers/AdminDashboard/ManageRequests/ManageRequests';
import ConfigureDashboard from './components/containers/AdminDashboard/ConfigureDashboard/ConfigureDashboard';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='home' />} />
				<Route path='home' element={<Home />}>
					<Route path='/home' element={<FeatureRequests />}>
						<Route index element={<FeatureRequestList />} />
						<Route path='list' element={<FeatureRequestList />} />
						<Route
							path='create'
							element={
								<PrivateRoute>
									<CreateFeatureRequest />
								</PrivateRoute>
							}
						/>
						<Route
							path='list/:_id'
							element={<FeatureRequestDetailPage />}
						/>
					</Route>
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
		</Router>
	);
}

export default App;
