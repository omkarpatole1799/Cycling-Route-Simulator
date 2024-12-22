import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home.tsx';

function App() {
	return (
		<div className="relative">
			<Home></Home>;
			<ToastContainer position="bottom-center" limit={2} autoClose={400} />
		</div>
	);
}

export default App;
