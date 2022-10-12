import styles from './HeroSlide.module.scss'
import { useEffect, useState } from 'react';
import  swiperCore, {Autoplay} from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/react'
import classnames from 'classnames/bind'
import {Link} from 'react-router-dom'
import tmdbApi, {movieType,category} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig';
import Button from '../Button/Button';
import Modal from '../Modal';


const cx = classnames.bind(styles)

function HeroSlide() {
    swiperCore.use([Autoplay])
    const [movieItem,setMovieItem] = useState([])

    useEffect(()=> {
        const getMovies = async ()=> {
            const param = {page:1}
            try{
                const response = await tmdbApi.getMovieList(movieType.popular,param)
                setMovieItem(response.results.slice(0,4))
            }catch{
                console.log('error')
            }
        }
        getMovies();
    },[])
    return ( <div className={cx('wrapper')}>
        <Swiper
            modules={[Autoplay]}
            grabCursor = {true}
            spaceBetween = {0}
            slidesPerView = {1}
            autoplay = {{delay:3000}}
        >
            {movieItem.map(item=> (
                <SwiperSlide  key={item.id}>
                    {({isActive})=>{
                        return <div className={cx('slideItem')}>
                            <img className={cx('background')} src ={apiConfig.imageOriginal(item.backdrop_path)}></img>
                            <SlideItem 
                                id = {item.id}
                                title = {item.original_title} 
                                des= {item.overview} 
                                src= {apiConfig.imageW500(item.poster_path)}
                                active = {isActive}
                            />
                        </div>
                    }
                    }
                </SwiperSlide>
            ))}
        </Swiper>
    </div> );

}




const SlideItem = ({id,title,des,src,active}) => {

    const [isTrailer,setIsTrailer] = useState(false)
    const [srcVideos,setSrc] = useState()
    const handlerTrailer = async () => {
        const videos = await tmdbApi.getVideos(category.movie,id)
        if(videos.results.length > 0){
            const src = 'http://www.youtube.com/embed/' + videos.results[0].key;
            setSrc(src)
        }else{

        }
        setIsTrailer(true)
    }

    const handlerClose = () => {
        setIsTrailer(false)
        setSrc('')
    }

    return (<div className={cx('wrapper-item',{active})}>
        <div className={cx('content-left')}>
            <h2 className={cx('title')}>{title}</h2>
            <p className={cx('des')}>{des}</p>
            <div className={cx('btn')}>
                <Link to={`${category.movie}/${id}`}><Button>Watch now</Button></Link>
                <Button outline onClick={handlerTrailer}>Watch trailer</Button>
            </div>
        </div>
        <div className={cx('content-right')}>
            <img src= {src} alt = 'backdrop'/>
        </div>
        <Modal isActive={isTrailer} onClose = {handlerClose}>
            <iframe style={{width:'100%',height:'100%'}} className={cx('video')} src={srcVideos}></iframe>
        </Modal>
    </div>)
}

export default HeroSlide;