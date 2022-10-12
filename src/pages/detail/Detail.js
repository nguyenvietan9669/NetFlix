import classNames from 'classnames/bind'
import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import tmdbApi  from '../../api/tmdbApi'
import CastsList from '../../components/CastsList'
import ListMovie from '../../components/ListMovie'
import VideosList from '../../components/VideosList'
import styles from './Detail.module.scss'

const cx = classNames.bind(styles)

function Detail() {
    const {category,id} = useParams()

    const [item,setItem] = useState({})

    useEffect(()=> {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category,id)
            console.log(response)
            setItem(response)
        }
        getDetail();
    },[category,id])
    return ( <div className = {cx('wrapper')} >
        <div className={cx('background')} style = {{backgroundImage: `url(${apiConfig.imageOriginal(item.backdrop_path)})`}}></div>
        <div className={cx('content')}>
            <div className={cx('left')}>
                <img src = {apiConfig.imageW500(item.poster_path)}/>
            </div>
            <div className={cx('right')}>
                <h2 className={cx('name')}>{item.name || item.title}</h2>
                <div className={cx('genres')}>
                    {
                        item.genres && item.genres.slice(0,5).map(genre => {
                            return (
                                <span className={cx('genre-item')} key={genre.id}>{genre.name}</span>
                            )
                        }
                    )}
                </div>
                <div className={cx('des')}>
                        {item.overview}
                </div>
                <div className={cx('cats')}>
                    <h3>Cats</h3>
                    <CastsList id = {item.id}/>
                    
                </div>
            </div>
        </div>
        <VideosList id={item.id} />
        <ListMovie title= 'Similar' cate={category} type = 'similar' id = {id}/>
    </div> );
}

export default Detail;