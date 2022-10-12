import classnames from 'classnames/bind'
import styles from './Button.module.scss'
import {Link} from 'react-router-dom'


const cx = classnames.bind(styles)


function Button({children,
                classNames,
                outline = false,
                to,
                href,
                onClick}) {

    let Comp = 'button'
    const listClass = {
        [classNames]:classNames,
        outline,
    }

    const props = {
        onClick
    }

    if(to){
        Comp = Link
        props.to = to
    }else if(href) {
        Comp = 'a'
        props.href = href
    }

    return ( <Comp className = {cx('wrapper',{...listClass})} {...props}  >{children}</Comp> );
}

export default Button;