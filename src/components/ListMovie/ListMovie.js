import classNames from "classnames/bind";
import { Swiper , SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from "../Button";
import MovieCard from "../MovieCard";
import styles from './ListMovie.module.scss'
import tmdbApi, {category} from '../../api/tmdbApi';


const cx = classNames.bind(styles)

function ListMovie({title,cate,type,id = null}) {

    const [movieList,setMovieList] = useState([])
    useEffect(()=> {
        const getList = async () => {
            let response = null
            const params = {}
            if(type!== 'similar'){
                switch(cate){
                    case category.movie:
                        response = await tmdbApi.getMovieList(type,params)
                        break;                    
                    default:
                        response = await tmdbApi.getTvList(type,params)
                }
            }else{
                response = await tmdbApi.similar(cate,id)
            }
            setMovieList(response.results)
        }
        getList();
    },[])

    return ( <div className={cx('wrapper')}>
        <div className={cx('title')}>
            <h3 className={cx('name')}>{title}</h3>
            <Link to={'/movie'}>
                <Button outline>more view...</Button>
            </Link>
        </div>
        <div className={cx('content')}>
        <Swiper
            grabCursor = {true}
            spaceBetween = {10}
            slidesPerView = {'auto'}
        >
            {movieList.map((movie,i) => {
            return <SwiperSlide className={cx('swiper-slide')} key={i}>
                <Link to = {`/${cate}/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            </SwiperSlide>
            })}
        </Swiper>
        </div>
    </div> );
}

export default ListMovie;