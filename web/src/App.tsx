import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home.jsx';

function App() {
	return (
		<div className="relative">
			<Home></Home>;
			<ToastContainer />
		</div>
	);
}

export default App;
