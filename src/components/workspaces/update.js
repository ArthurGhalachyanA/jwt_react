import React, {useEffect, useState} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';
import {getWorkspace, update, slugExistErrorDefault} from '../../redux/actions/WorkspaceActions';

const WorkspaceUpdate = () => {
    const dispatch = useDispatch();
    const workspaceSlug = useParams()['slug'];
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [_id, set_id] = useState('');

    const nameError = useSelector(state => state.workspaceReducer.validationErrors.name);
    const slugError = useSelector(state => state.workspaceReducer.validationErrors.slug);

    const slugSuggests = useSelector(state => state.workspaceReducer.slugSuggests);

    useEffect(() => {
        (async function(){
            const updateWorkspace = await dispatch(getWorkspace(workspaceSlug));

            if(!updateWorkspace)
                navigate('/');

            setName(updateWorkspace.name);
            setSlug(updateWorkspace.slug);
            set_id(updateWorkspace._id);
        })();
    }, []);

    const sendForm = async () => {
        if(await dispatch(update(_id, name, slug))){
            return navigate('/');
        }
    };

    return (
        <div className={styles.workspace_wrapper}>
            <div>
                <h1>
                    Update workspace
                </h1>
            </div>
            <div className={styles.workspace_container}>
                <div className={styles.form_container}>
                    <label><b>name</b></label>
                    <input
                        type="text"
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>{nameError}</span>
                </div>
                <div className={styles.form_container}>
                    <label><b>slug</b></label>
                    <input
                        type="text"
                        placeholder='Slug'
                        onChange={(e) => setSlug(e.target.value)}
                        value={slug}
                        className={styles.form_input}
                    />
                    <span className={styles.form_error}>{slugError}</span>

                    {slugSuggests.map((suggest) => {
                        return <p
                            className={styles.slug_suggest}
                            data-slug={suggest}
                            key={suggest}
                            onClick={(e) => {
                                setSlug(e.target.dataset.slug);
                                dispatch(slugExistErrorDefault());
                            }}>
                            {suggest}
                        </p>
                    })}

                </div>
                <button onClick={() => {sendForm()}}>Update</button>
            </div>
        </div>
    );
};

export default WorkspaceUpdate;