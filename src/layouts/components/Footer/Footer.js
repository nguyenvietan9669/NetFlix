import classNames from "classnames/bind";
import {Link} from 'react-router-dom'
import styles from './Footer.module.scss'
import logo from '../../../assets/image/logo.png'

const cx = classNames.bind(styles)

function Footer() {
    return ( <div className={cx('wrapper')}>
        <Link to={'/'}>
            <img className={cx('logo')} src={logo}/>
        </Link>
        <div className={cx('content')}>
            <div className={cx('content__menu')}>
                <Link to="/">Home</Link>
                <Link to="/">Contact us</Link>
                <Link to="/">Term of services</Link>
                <Link to="/">About us</Link>
            </div>
            <div className={cx('content__menu')}>
                <Link to="/">Live</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Premium</Link>
                <Link to="/">Pravacy policy</Link>
            </div>
            <div className={cx('content__menu')}>
                <Link to="/">You must watch</Link>
                <Link to="/">Recent release</Link>
                <Link to="/">Top IMDB</Link>
            </div>
        </div>
    </div> );
}

export default Footer;