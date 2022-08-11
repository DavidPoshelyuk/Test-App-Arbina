const initialState = {
	searchNameUser: '',
	searchActionUser: '',
	timeOfActionUser: null
}

export interface TypeState {
	searchNameUser: string
	searchActionUser: string
	timeOfActionUser: Date | null
}

export const filterReducer = (state: TypeState = initialState, action: TypeActionReducer) => {
	switch (action.type) {
		case "SEARCH-ACTION-USER": {
			return {...state, searchActionUser: action.value}
		}
		case "SEARCH-NAME-USER": {
			return {...state, searchNameUser: action.value}
		}
		case "TIME-OF-ACTION-USER": {
			return {...state, timeOfActionUser: action.value}
		}
		default:
			return state
	}
};
type TypeActionReducer =
	ReturnType<typeof searchNameUserAC>
	| ReturnType<typeof searchActionUserAC>
	| ReturnType<typeof timeOfActionUserAC>
export const searchNameUserAC = (value: string) => ({type: 'SEARCH-NAME-USER', value} as const)
export const searchActionUserAC = (value: string) => ({type: 'SEARCH-ACTION-USER', value} as const)
export const timeOfActionUserAC = (value: Date | null) => ({type: 'TIME-OF-ACTION-USER', value} as const)

