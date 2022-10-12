import {useParams} from 'react-router-dom'
import MovieGrid from '../../components/MovieGrid';
import PageHeader from '../../layouts/components/PageHeader';

function Catalog() {

    const {category} = useParams();

    return (<div>
        <PageHeader>{category === 'movie' ? 'Movies' : 'Tv Series'}</PageHeader>
        <MovieGrid cate = {category}/>
    </div>  );
}

export default Catalog;