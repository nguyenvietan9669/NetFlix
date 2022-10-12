import Hero from "../../layouts/components/Hero/Hero";
import ListMovie from "../../components/ListMovie";
import { category,movieType,tvType } from "../../api/tmdbApi";


function Home() {
    return ( <div>
       <Hero/>
       <ListMovie title= 'Trending Movie' cate={category.movie} type = {movieType.popular}/>
       <ListMovie title= 'Top Rated Movie' cate={category.movie} type = {movieType.top_rated}/>
       <ListMovie title= 'Trending Tv' cate={category.tv} type = {tvType.popular}/>
       <ListMovie title= 'Top Rated Tv' cate={category.tv} type = {tvType.top_rated}/>
    </div> );
}

export default Home;