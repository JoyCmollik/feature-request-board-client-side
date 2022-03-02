import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './animation.css';
import App from './App';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
				<App />
			</Router>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
