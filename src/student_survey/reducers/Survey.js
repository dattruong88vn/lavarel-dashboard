var defaultState = {
	surveys: [],
	selectedItem: null,
	table : null,
};

export default function Survey(state = defaultState, action) {
	switch(action.type){
		case "SET_TABLE" :
			state.table = action.table;
			return state;
		default:
			return state;
	}
}