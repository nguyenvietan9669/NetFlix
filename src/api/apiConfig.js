const apiConfig = {
    baseURL:'https://api.themoviedb.org/3/',
    apiKey:'328467610ab736f6ca491f757a54c4ef',
    imageOriginal: (imagePath)=>`https://image.tmdb.org/t/p/original/${imagePath}`,
    imageW500: (imagePath)=>`https://image.tmdb.org/t/p/w500/${imagePath}`
}


export default apiConfig