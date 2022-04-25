const DASHBOARD = "/";
const LOGIN = "/accounts/login"
const CART = "/cart";
const ERR = "/error-page";
const ACC_TAB = "/user/account";
const CATEGORY_TAB = "/pages/ph/categories";
const ORDERS = "/order/order-management";
const WISHLIST = "/wishlist";
const POLICIES = "/policies";
const HELP = "/help";
const FLASHSALE = "/flashsale";

const SINGLE_PRODUCT_ROUTE = "/stores/:storeID/products/:prodID";
const SINGLE_PRODUCT = ({storeID, prodID})=>{
    return SINGLE_PRODUCT_ROUTE.replace(":storeID", storeID).replace(":prodID", prodID);
}

const STORE_ROUTE = "/store_all_products/:id";
const STORE = (id)=>{
    return STORE_ROUTE.replace(":id", id);
}

export const ROUTES = {
    DASHBOARD,
    LOGIN,
    CART,
    ERR,
    ACC_TAB,
    CATEGORY_TAB,
    ORDERS,
    WISHLIST,
    POLICIES,
    HELP,
    FLASHSALE,
    SINGLE_PRODUCT_ROUTE, SINGLE_PRODUCT,
    STORE_ROUTE, STORE
}