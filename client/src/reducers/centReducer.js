import { GET_PERSONS, PERSONS_LOADING, DELETE_PERSONS } from "../actions/types";

const initialState = {
  centList: [],

  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PERSONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERSONS:
      return {
        ...state,
        centList: action.payload,
        loading: false
      };
    // case GET_PROJECT:
    //   return {
    //     ...state,
    //     project: action.payload,
    //     loading: false
    //   };
    // // case ADD_PROJECT:
    // //   return {
    // //     ...state,
    // //     profiles: [action.payload, ...state.projects]
    // //   };
    case DELETE_PERSONS:
      return {
        ...state,
        centList: state.centList.filter(x => x._id !== action.payload)
      };
    default:
      return state;
  }
}
