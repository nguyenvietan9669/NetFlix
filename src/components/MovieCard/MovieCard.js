import classname from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons'

import apiConfig from '../../api/apiConfig';
import styles from './MovieCard.module.scss'

const cx = classname.bind(styles)

function MovieCard({movie}) {
    return ( <div  className={cx('movie-list')}>
        <div className={cx('background')}>
            <img 
                src={apiConfig.imageW500(movie.poster_path)}
                className={cx('movie-card')}  
            />
            <FontAwesomeIcon className={cx('icon-play')} icon={faPlay}/>
        </div>
        <h3 className={cx('movie-name')}>{movie.title || movie.name}</h3>        
    </div> );
}

export default MovieCard;
