import classname from 'classnames/bind'
import TippyHeadless from '@tippyjs/react/headless'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faSearch}  from '@fortawesome/free-solid-svg-icons'
import styles from './Navbar.module.scss'
import logo from '../../../assets/image/logo.png'
import { useState } from 'react';

const cx = classname.bind(styles)


function Navbar() {

    const [scrollTop, setScrollTop] = useState()
    const [isIcon,setIsIcon] = useState(false)

    const handlerScroll = () => {
        let scrollY = window.scrollY || document.scrollTop
        if(scrollY > 100){
            setScrollTop(true)
        }else{
            setScrollTop(false)
        }
    }

    const handerResize = () => {
        if(window.innerWidth <= 650) {
            setIsIcon(true)
        }else{
            setIsIcon(false)
        }
    }

    window.addEventListener('scroll',handlerScroll)
    window.addEventListener('resize',handerResize)

    return ( <div className={cx('wrapper',{isbackground:scrollTop})}>
      <div className= {cx('nav-left')}>
          <img 
              className={cx('logo')}
              src = {logo}
          />
      </div>
      <div className={cx('nav-right')}>
        {isIcon ? 
            <TippyHeadless
                delay={[300,0]}
                interactive = {true}
                placement = 'bottom-end'
                render={() => {
                    return <div className={cx('nav-mobile')}>
                        <NavLink 
                            to={'/'}
                            className={cx('item')}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to={'/movie'}
                            className={(nav) => cx('item',{active:nav.isActive})}
                        >
                            Movies
                        </NavLink>
                        <NavLink 
                            to={'/tv'}
                            className={(nav) => cx('item',{active:nav.isActive})}
                        >
                            TV Series
                        </NavLink>
                    </div>
                }}
            >   
                <div>
                    <FontAwesomeIcon icon={faBars}/>
                </div>
            </TippyHeadless> 
        :
            <><NavLink 
                to={'/'}
                className={cx('item')}
            >
                Home
            </NavLink>
            <NavLink 
                to={'/movie'}
                className={(nav) => cx('item',{active:nav.isActive})}
            >
                Movies
            </NavLink>
            <NavLink 
                to={'/tv'}
                className={(nav) => cx('item',{active:nav.isActive})}
            >
                TV Series
            </NavLink></>}
      </div>
    </div> );
}

export default Navbar;