import MainWithData from "../pages/Main";
import Product from "../components/Product";
import { CART_ROUTE, CATEGORY_ID_KIDS_ROUTE, CATEGORY_ID_MEN_ROUTE, CATEGORY_ID_WOMEN_ROUTE, CATEGORY_KIDS_ROUTE, CATEGORY_MEN_ROUTE, CATEGORY_WOMEN_ROUTE, PRODUCT_ROUTE } from "../utils/consts";
import CartPage from "../pages/CartPage";

export const publicRoutes = [
    {
        path: PRODUCT_ROUTE,
        Component: Product
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    },
    {
        path: CATEGORY_WOMEN_ROUTE,
        Component: MainWithData
    },
    {
        path: CATEGORY_MEN_ROUTE,
        Component: MainWithData
    },
    {
        path: CATEGORY_KIDS_ROUTE,
        Component: MainWithData
    },
    {
        path: CATEGORY_ID_WOMEN_ROUTE,
        Component: Product
    },
    {
        path: CATEGORY_ID_MEN_ROUTE,
        Component: Product
    },
    {
        path: CATEGORY_ID_KIDS_ROUTE,
        Component: Product
    },
]