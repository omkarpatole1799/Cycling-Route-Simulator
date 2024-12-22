import { useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiResponse } from '../types/types';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<ApiResponse | null>(null);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);

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
			} finally {
				setIsLoading(false);
			}
		},
		[]
	);

	return {
		isLoading,
		data,
		sendRequest,
	};
};

export default useHttp;
