import axios from "axios";

var defaultState = {
	data: JSON.parse( '[{"surveyId":560,"locations":[{"lat":10.7638513,"lng":106.6562543},{"lat":10.762294,"lng":106.657156},{"lat":10.763048,"lng":106.658701},{"lat":10.761772,"lng":106.659248}],"pingLocations":[{"criteriaId":null,"name":"H�nh Overview","numberItem":2,"lat":10.7638886,"lng":106.6564167},{"criteriaId":59,"name":"H? Ga","numberItem":1,"lat":10.7638513,"lng":106.6562543}]},{"surveyId":999,"locations":[{"lat":10.762059,"lng":106.657055},{"lat":10.757536,"lng":106.657109}],"pingLocations":[{"criteriaId":null,"name":"H�nh Overview","numberItem":2,"lat":10.7638886,"lng":106.6564167},{"criteriaId":59,"name":"H? Ga","numberItem":1,"lat":10.7638513,"lng":106.6562543}]}]'),
	selectedLocation: null,
	isDraw: false, // Khi nào biến này bật lên true mới vẽ bản đồ,
	criteriaId : null,
    dataMakerClick : {},
	filterMap: null
};

export default  function GoogleMap(state = defaultState, action) {
	switch(action.type){
		case 'GET_DATA_LIST_GOOGLE_MAP' :  {
			const isShow = typeof(action.isDraw) !=='undefined' && typeof (action.isDraw) === 'boolean' ? action.isDraw : state.isDraw;
			const dataTables = action.rows && Array.isArray(action.rows) ? action.rows : [];
			let data = [];
			if (isShow && dataTables.length > 0) {
                 Promise.resolve(getLocationMap(dataTables, state.filterMap)).then(dataReturn => {
					data = dataReturn;
					action.dispatch({type:'SET_DATA_LIST_GOOGLE_MAP', isDraw : isShow, data : data});
				});
			}
			return {...state, isDraw : isShow, data : data};
		}
		case 'SET_DATA_LIST_GOOGLE_MAP': {
			return {...state, data : action.data, isDraw: action.isDraw};
		}
		case "SET_FILTER_MAP" : {
			return {...state,filterMap:action.data}
		}
		case "SET_CRITERIA_ID_EDIT" : {
			return {...state,criteriaId:action.data}
		}
        case "SET_DATA_MARKER_CLICK" : {
            return {...state,dataMakerClick:action.data}
        }
		default:
			return state;
	}


	 async function getLocationMap($data, $filterMap) {
		const surveyIds = $data.map(it => it.surveyId);
		const filter = {surveyIds : surveyIds && surveyIds.length > 0 ? surveyIds : null, strCriteriaId: $filterMap};

		let response = null;
		let data = [];
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		await axios.post('/student-survey/get-location-map', filter)
			.then(xhr => {
				response = xhr.data;
			}).catch(err => {
			console.error("Get Location Map fail")
		});
		if(response && response.result == true) {
            data = response.data;
        }
		return data;
	}
}