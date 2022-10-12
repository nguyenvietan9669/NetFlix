import classNames from "classnames/bind";
import styles from './PageHeader.module.scss'


const cx = classNames.bind(styles)


function PageHeader({children}) {

    return ( <div className={cx('wrapper')}>
        <h2 className={cx('title')}>{children}</h2>
    </div> );
}

export default PageHeader;