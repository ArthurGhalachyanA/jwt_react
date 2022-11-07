import React from 'react';
import styles from '../../assets/css/styles.module.css';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/actions/AuthActions";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <button onClick={() => {dispatch(logout())}} className={`${styles.button} ${styles.logout_button}`}>
                logout
            </button>
        </div>
    );
};

export default Header;