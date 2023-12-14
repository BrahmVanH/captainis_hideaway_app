import { useReducer } from 'react';
import { SET_THROW_ERROR } from './actions';

export const reducer = (state, action) => {
	if (action.type === SET_THROW_ERROR) {
		return {
			...state.items,
			throwError: [...action.throwError],
		};
	}
};

export function useMessageReducer(initialState) {
	return useReducer(reducer, initialState);
}
