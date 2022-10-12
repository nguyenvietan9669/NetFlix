import { useParams , Link, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner,faSearch} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState,useRef, useCallback } from "react";
import classNames from "classnames/bind";
import styles from './MovieGrid.module.scss'
import MovieCard from '../MovieCard'
import tmdbApi, {category,movieType,tvType} from '../../api/tmdbApi'
// import Button from "../Button";

const cx = classNames.bind(styles)

function MovieGrid({cate}) {
    const {keyword} = useParams();
    const [item,setItem] = useState([])
    const [page,setPage] = useState(1)
    const [totalPage,setTotalPage] = useState()

    const refGrid = useRef()

    useEffect(()=> {
        const getList = async () => {
            let response = null
            const params = {}
            if(keyword === undefined){
                switch(cate){
                    case category.movie:
                        response = await tmdbApi.getMovieList(movieType.upcoming,params)
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular,params)
                }
            }else {
                const params = {
                    query:keyword
                }
                response = await tmdbApi.search(cate,params)
            }
            setItem(response.results)
            setTotalPage(response.total_pages)
        }
        getList();
    },[keyword,cate,keyword])

    const handlerLoadMore = async () => {
        let response = null
        const params = {
            page:page+1
        }
        if(keyword === undefined){
            switch(cate){
                case category.movie:
                    response = await tmdbApi.getMovieList(movieType.upcoming,params)
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular,params)
            }
        }else {
            const params = {
                page:page+1,
                query:keyword
            }
            response = await tmdbApi.search(cate,params)
        }
        setItem([...item,...response.results])
        setPage(page+1)
    }

    const [isLoad,setIsLoad] = useState(false)

    window.addEventListener('scroll',() => {
        let maxScroll 
        if(refGrid.current){
            maxScroll =  refGrid.current.clientHeight + refGrid.current.offsetTop
        }
       let scroll = window.scrollY  + window.screen.availHeight
        if (scroll > maxScroll) {
            setIsLoad(true)
        }else {
            setIsLoad(false)
        }
    })

    useEffect(() => {
        if(isLoad && page < totalPage){
           setTimeout(()=> {
            handlerLoadMore()
           },2000)
        }
    },[isLoad])

    return ( <div className={cx('wrapper')}>
        <MovieSearch cate = {cate} key = {keyword}/>
       <div ref={refGrid} className={cx('content')}>
         {item.map((item,i) => (
             <Link  key={i} to={`/${cate}/${item.id}`}>
                 <MovieCard
                     movie ={item}
                 />
             </Link>
         ))}
       </div>
       {isLoad ? <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner}/> : ''}
        
    </div> );
}


const MovieSearch = ({cate,key}) => {

    const inputRef = useRef()

    const [keyword,setKeyWord] = useState(key ? key : '')
    const  navigate = useNavigate()
    console.log(keyword)
    const gotoSearch = useCallback(() => {
        console.log(keyword.trim().length)
        if(keyword.trim().length > 0){
            navigate(`/${cate}/search/${keyword}`)
        }
    },[keyword,cate])

    useEffect(()=> {
        const enterEvent = (e) => {
            e.preventDefault()
            if(e.keyCode === 13){
                console.log('enter')
                gotoSearch()
            }
        }

        window.addEventListener('keyup',enterEvent)
        return () => [
            window.removeEventListener('keyup',enterEvent)
        ]
    },[keyword])

    return (
    <div className={cx('search')}>
        <FontAwesomeIcon 
            className={cx('icon-search')}
            icon={faSearch}
            onClick = {()=> {inputRef.current.focus()}}          
        />
        <input
            ref={inputRef}
            values={keyword} 
            onChange = {e => setKeyWord(e.target.value)}
            className={cx('input-search')}
            placeholder='Enter search....'
        />
    </div>)
}

export default MovieGrid;