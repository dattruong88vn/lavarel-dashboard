
var defaultState = {
	showPhoto: false,
	photos : [],
	photosMap : new Map(),
	criteriaId : null,
};

export default  function ImageReducer(state = defaultState, action) {
	switch(action.type){
		case 'SHOW_PHOTO': {
			return {...state,showPhoto:action.status}
		}
		case "SET_PHOTO_MARKER" : {
			return {...state,photos: action.photos, photosMap: action.photosMap}
		}
		case "SET_CRITERIA_ID_EDIT" : {
			return {...state,criteriaId:action.data}
		}
		default:
			return state;
	}
}