import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import styles from './CastsList.module.scss'

const cx = classNames.bind(styles)

function CastsList({id}) {

    const {category} = useParams();
    const [casts,setCasts] = useState([])

    useEffect(()=> {
        const getCast = async () => {
            if(id){
                const response = await tmdbApi.credit(category,id)
                setCasts(response.cast)
            }
        }
        getCast()
    },[category,id])

    return ( <div>
        <div className = {cx('wrapper')}>
            {casts.slice(0,5).map((cast,i) => (
                <div key={i} className={cx('cast_item')}>
                    <img src={apiConfig.imageW500(cast.profile_path)}/>
                    <div className={cx('name')}>{cast.name}</div>
                </div>
            ))}
        </div>
    </div> );
}

export default CastsList;