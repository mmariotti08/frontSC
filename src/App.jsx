import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from './redux/actions';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Footer } from './components/Footer/Footer';
import './App.css';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	});

	return (
		<>
			<Header />
			<Body />
			<Footer />
		</>
	)
}

export default App
