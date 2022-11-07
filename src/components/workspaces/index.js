import React, {useEffect, useState, useRef} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getWorkspaces, deleteWorkspace} from "../../redux/actions/WorkspaceActions";
import {useNavigate} from 'react-router-dom';

import DeleteConfirmPopup from '../common/deleteConfirmPopup';

const WorkspaceIndex = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const workspaces = useSelector(state => state.workspaceReducer.workspaces);
    const idWorkspaceRef = useRef();

    const [dialog, setDialog] = useState({
       message: 'test message',
       isLoading: false,
    });

    const handleDelete = (_id) => {
        setDialog({isLoading: true});
        idWorkspaceRef.current = _id;
    };

    const areYouSure = async (confirm) => {
        if(confirm)
            await dispatch(deleteWorkspace(idWorkspaceRef.current));

        setDialog({isLoading: false});
    };

    useEffect(() => { dispatch(getWorkspaces()) }, []);

    return (
        <div>
            <h1>My workspaces</h1>
            <button onClick={() => navigate('workspace/create')} className={`${styles.button} ${styles.button4}`}>create</button>
            <table className={styles.customers}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Slug</td>
                        <td style={{width: "25%"}}>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {workspaces.length <= 0 &&
                        <tr>
                            <td colSpan={'3'}>Result not found</td>
                        </tr>
                    }
                    {workspaces.map((workspace) => {
                        return (
                            <tr key={workspace.slug}>
                                <td>{workspace.name}</td>
                                <td>{workspace.slug}</td>
                                <td>
                                    <button
                                        onClick={() => {handleDelete(workspace._id)}}
                                        className={`${styles.button} ${styles.button4} ${styles.red}`}>
                                        delete
                                    </button>
                                    <button
                                        onClick={() => {navigate(`workspace/update/${workspace.slug}`)}}
                                        className={`${styles.button} ${styles.button4} ${styles.blue}`}>
                                        edit
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {dialog.isLoading && <DeleteConfirmPopup onDialog={areYouSure} message={dialog.message} />}
        </div>
    );
};

export default WorkspaceIndex;