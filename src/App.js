import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from './redux/actions/AuthActions';
import {Routes, Route} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import WorkspaceIndex from "./components/workspaces/index";
import WorkspaceCreate from "./components/workspaces/create";
import WorkspaceUpdate from "./components/workspaces/update";
import LayoutMain from './components/layouts/main';

const App = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const isLoading = useSelector(state => state.userReducer.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(checkAuth());
        }
    }, []);

    if(isLoading){
        return <div>loading...</div>
    }
    
    if(!isAuth){
        return (
            <Routes>
                <Route path="login" element={<LoginForm />} />
                <Route path="sign-up" element={<SignUpForm />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }

    return (
        <LayoutMain>
            <Routes>
                <Route path="/" element={<WorkspaceIndex />} />
                <Route path="/workspace/create" element={<WorkspaceCreate />} />
                <Route path="/workspace/update/:slug" element={<WorkspaceUpdate />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </LayoutMain>
    );

};

export default App;