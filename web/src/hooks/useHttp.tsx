import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);
			setError(null); // Reset previous errors

			try {
				const response = await axios({
					url,
					method,
					data: body,
					headers,
				});

				setData(response.data);
			} catch (err) {
				console.log(err, '==err');
				if (err.code === 'ERR_NETWORK') {
					toast('Unable to connect to server, try again later.');
				} else {
					toast(err.response.data.usrMsg);
				}
				// setError(err.message || 'Something went wrong!');
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	return {
		isLoading,
		data,
		error,
		sendRequest,
	};
};

export default useHttp;
