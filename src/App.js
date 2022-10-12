import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {publicRoutes} from './config/Routes'
import 'swiper/css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route,index) => {
            const Layout = route.layout
            const Component = route.component 
            return <Route key={index} path= {route.path}
               element = {<Layout><Component/></Layout>}/>
          })}
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
