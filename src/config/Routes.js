import Home from '../pages/home'
import Catalog from '../pages/catalog'
import Detail from '../pages/detail'
import layoutMain from '../layouts/main'

export const publicRoutes = [
    { path: '/:category/' , component: Catalog , layout: layoutMain},
    { path: '/:category/search/:keyword' , component: Catalog , layout: layoutMain},
    { path: '/:category/:id' , component: Detail , layout: layoutMain},
    { path: '/' , component: Home , layout: layoutMain},
]