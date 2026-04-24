import { RootState } from 'reducers';

export const selectIsLoggedIn = (state: RootState) => {
	const token = state.session.token;
	return !!token && typeof token === 'string' && token.trim().length > 0;
};
