import classname from 'classnames/bind'
import styles from './Modal.module.scss'
import Portal from '../Portal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';



const cx = classname.bind(styles)

function Modal({isActive,children,onClose}) {
    if(!isActive){
        return
    }
    return ( 
        <Portal>
            <div className={cx('wrapper',{isActive})}>
                <div className={cx('content')}>
                    <FontAwesomeIcon className = {cx('btn-close')} icon={faXmark} onClick= {onClose}/>
                    {children}
                </div>
            </div>
        </Portal>);
}

export default Modal;