import api from '../../http/index';

export function getWorkspaces(){
    return async (dispatch) => {
        const {data} = await api.get('/workspaces');

        dispatch(setWorkspaces(data.workspaces));
    }
}

export function create(name, slug){
    return async (dispatch) => {
        const response = await api.post('/workspaces', {name, slug});

        dispatch(setValidationErrors(response.data.validationErrors));

        dispatch(setSlugExistsError({
            slugExistsError: response.data.slugExistsError,
            slugSuggests: response.data.slugSuggests,
        }));

        return response.status === 201;
    }
}

export function update(_id, name, slug){
    return async (dispatch) => {
        const response = await api.put('/workspaces', {_id, name, slug});

        dispatch(setValidationErrors(response.data.validationErrors));

        dispatch(setSlugExistsError({
            slugExistsError: response.data.slugExistsError,
            slugSuggests: response.data.slugSuggests,
        }));

        return response.status === 201;
    }
}

export function getWorkspace(slug){
    return async () => {
        const response = await api.get('/workspace', {params: {slug: slug}});

        return response.status === 200 ? response.data.workspace: false;
    }
}

export function deleteWorkspace(_id){
    return async (dispatch) => {
        const response = await api.delete('/workspaces', {data: {_id: _id}});
        if(response.status === 202){
            dispatch(deleteWorkspaceById(_id));

            return true;
        }
    }
}

export function slugExistErrorDefault(){
    return async (dispatch) => {
        dispatch(setSlugExistErrorDefault());
    }
}

function deleteWorkspaceById(payload){
    return {
        type: "DELETE_WORKSPACE_BY_ID",
        payload
    }
}

function setWorkspaces(payload){
    return {
        type: "SET_WORKSPACES",
        payload
    }
}

function setValidationErrors(payload){
    return {
        type: "SET_VALIDATION_ERRORS",
        payload
    }
}

function setSlugExistsError(payload){
    return {
        type: "SET_SLUG_EXISTS_ERROR",
        payload
    }
}

function setSlugExistErrorDefault(){
    return {
        type: "SET_SLUG_EXISTS_ERROR_DEFAULT"
    }
}