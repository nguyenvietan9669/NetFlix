import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";

export const category = {
    movie:'movie',
    tv:'tv'
}

export const movieType = {
    upcoming:'upcoming',
    popular:'popular',
    top_rated:'top_rated'
}

export const tvType = {
    popular:'popular',
    top_rated:'top_rated',
    on_the_air:'on_the_air',  
}
const tmdbApi = {
    getMovieList : (type,params) => {
        const url = 'movie/' + movieType[type]+ `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params})
    },
    getTvList: (type,params) => {
        const url = 'tv/' + tvType[type] + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params})
    },
    getVideos: (type,id) => {
        const url = category[type]+ '/' + id + '/videos' + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params:{}})
    },
    search: (type,params) => {
        const url = 'search/'+ category[type] + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params})
    },
    detail: (type,id,params) => {
        const url = category[type] + '/' + id + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,params)
    },
    credit: (type,id) => {
        const url = category[type] + '/' + id + '/credits' + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params:{}})
    },
    similar: (type,id) => {
        const url = category[type] + '/' + id + '/similar' + `?api_key=${apiConfig.apiKey}`;
        return axiosClient.get(url,{params:{}})
    },
}

export default tmdbApi;