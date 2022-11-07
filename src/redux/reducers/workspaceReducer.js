const defaultState = {
    slugExistsError: false,
    slugSuggests: [],

    validationErrors: [],
    workspaces: [],
};

export const workspaceReducer = (state = defaultState, action) => {
    let newState = {...state};

    switch(action.type){
        case 'UPDATE_WORKSPACES':
            newState.workspaces = action.payload;
            return newState;
        case 'SET_SLUG_EXISTS_ERROR':
            newState.slugExistsError = action.payload.slugExistsError;
            newState.slugSuggests = action.payload.slugSuggests;

            return newState;
        case 'SET_VALIDATION_ERRORS':
            newState.validationErrors = [];
            action.payload.forEach((error) => {
                newState.validationErrors[error.param] = error.msg;
            });

            return newState;
        case 'SET_VALIDATION_ERRORS_DEFAULT':
            newState.validationErrors = [];
            return newState;
        case 'SET_SLUG_EXISTS_ERROR_DEFAULT':
            newState.slugExistsError = defaultState.slugExistsError;
            newState.validationErrors = defaultState.validationErrors;
            newState.slugSuggests = defaultState.slugSuggests;

            return newState;
        case 'DELETE_WORKSPACE_BY_ID':
            newState.workspaces = newState.workspaces.filter(workspace => workspace._id !== action.payload);
            return newState;
        case 'SET_WORKSPACES':
            newState.workspaces = action.payload;
            return newState;
        default:
            return newState;
    }
};