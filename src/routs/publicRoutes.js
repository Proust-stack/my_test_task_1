import Cart from "../components/Cart";
import Category from "../components/Category";
import Product from "../components/Product";
import { CART_ROUTE, CATEGORY_ID_KIDS_ROUTE, CATEGORY_ID_MEN_ROUTE, CATEGORY_ID_WOMEN_ROUTE, CATEGORY_KIDS_ROUTE, CATEGORY_MEN_ROUTE, CATEGORY_WOMEN_ROUTE, PRODUCT_ROUTE } from "../utils/consts";

export const publicRoutes = [
    {
        path: PRODUCT_ROUTE,
        Component: Product
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: CATEGORY_WOMEN_ROUTE,
        Component: Category
    },
    {
        path: CATEGORY_MEN_ROUTE,
        Component: Category
    },
    {
        path: CATEGORY_KIDS_ROUTE,
        Component: Category
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