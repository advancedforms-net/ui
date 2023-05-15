import { useAuthStore } from '@/stores';

export const fetchWrapper = {
	get: request('GET'),
	post: request('POST'),
	put: request('PUT'),
	delete: request('DELETE'),
};

function request (method: string) {
	return async (url: string, body?: object | undefined) => {
		const requestOptions: any = {
			method,
			headers: authHeader(url),
		};

		requestOptions.headers.accept = 'application/json';

		if (body) {
			requestOptions.headers['Content-Type'] = 'application/json';
			requestOptions.body = JSON.stringify(body);
		}
		const response = await fetch(url, requestOptions);
		return handleResponse(response);
	};
}

// helper functions

function authHeader (url: string) {
	const config = useRuntimeConfig();

	// return auth header with jwt if user is logged in and request is to the api url
	const { userToken, isLoggedIn } = useAuthStore();
	const isApiUrl = url.startsWith(config.public.apiUrl);
	if (isLoggedIn && isApiUrl) {
		return { Authorization: `Bearer ${userToken}` };
	}

	return {};
}

async function handleResponse (response: Response) {
	const text = await response.text();
	const data = text && JSON.parse(text);

	if (!response.ok) {
		const { userToken, logout } = useAuthStore();
		if ([401, 403].includes(response.status) && userToken) {
			// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
			logout();
		}

		const error = (data && data.message) || response.statusText;
		throw error;
	}

	return data;
}
