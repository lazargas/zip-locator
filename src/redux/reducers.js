const initialState = {
    zipCodeData: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ZIP_CODE_DATA':
        return {
          ...state,
          zipCodeData: action.payload,
        };
      case 'SET_DATA':
        return {
            ...state,
            Data: action.payload,
        } 
      default:
        return state;
    }
  };
  
  export default rootReducer;
  