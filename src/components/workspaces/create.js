import React, {useState} from 'react';
import styles from "../../assets/css/styles.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {create} from '../../redux/actions/WorkspaceActions';
import {slugExistErrorDefault} from '../../redux/actions/WorkspaceActions';

const WorkspaceCreate = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');

    const nameError = useSelector(state => state.workspaceReducer.validationErrors.name);
    const slugError = useSelector(state => state.workspaceReducer.validationErrors.slug);

    const slugSuggests = useSelector(state => state.workspaceReducer.slugSuggests);

    const navigate = useNavigate();

    const sendForm = async () => {
        if(await dispatch(create(name, slug))){
            return navigate('/');
        }
    };

    return (
        <div className={styles.workspace_wrapper}>
            <div>
                <h1>
                    Create workspace
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
                <button onClick={() => {sendForm()}}>Create</button>
            </div>
        </div>
    );
};

export default WorkspaceCreate;