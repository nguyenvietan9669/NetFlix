import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import styles from './VideosList.module.scss'

const cx = classNames.bind(styles)


function VideosList({id}) {

    const {category} = useParams();
    const [videos,setVideos] = useState([])

    useEffect(()=> {
        const getCast = async () => {
            if(id){
                const response = await tmdbApi.getVideos(category,id)
                console.log(response.results)
                setVideos(response.results)
            }
        }
        getCast()
    },[category,id])

  
    
    return ( <div className={cx('wrapper')}>
        {videos.slice(0,5).map((video,i) => (
            <Video key={i} video ={video}/>
        ))}
    </div> );
}


const Video = ({video}) => {
    const videoRef = useRef()

    useEffect(()=> {
        const height = videoRef.current.offsetWidth * 9 / 16;
        videoRef.current.setAttribute('height',height)
    },[])

    return <div className={cx('video-item')}>
                <h3>{video.name}</h3>
                <iframe 
                    ref={videoRef} 
                    src = {`http://www.youtube.com/embed/${video.key}`} 
                    width={'100%'}>
                </iframe>
            </div>
}

export default VideosList;