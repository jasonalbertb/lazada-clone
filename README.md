# Overview
- Clone Lazada e-commerce app using ReactJs, Firebase, Redux and Tailwind

# Functionalities
- Add to cart (Done)
- Browse for products (Done)
- Browse for stores
- Sort & Filter by product & store field values (Dashboard)
- Sort & Filter Filter by product categories (Product Page);
- Search by product name

# TODO List
- Make it responsive, (mobile first approach)
- Add backend rules in firebase
- Add API for Store Accounts
- Add cloud functions for flash product sales,
- Complete the vouchers
- Computations for kilometers shipping fee using google maps
- etc

# Others
- Page for seeding api for populating the database located at /seed

# process env
- REACT_APP_apiKey
- REACT_APP_authDomain
- REACT_APP_projectId
- REACT_APP_storageBucket
- REACT_APP_messagingSenderId
- REACT_APP_appId\

# Firebase rules 
- TDB

# Database Schema
- brands 
    -> id: {brand_title}
- category_tree
    -> id: {name}
    --  subcategory
        -> id :{name}
    -> id: {name}
    -- subcategory
        -> id :{name}
        -- subcategory
            -> id :{name}   
    ...
- lazglobal
    -> id: {}
- lazmall
    -> id: {}
- phones:
    -> id: {}
- stores
    -> id: {
            bg_banner,
            logo,
            main_category,
            store_name,
            ...
        }
    -- category
        -> id: {name}
    -- products
        -> id: {
            brand,
            category,
            gallery,
            installment,
            item_name,
            price,
            ...
        }
- users 
    -> id: {
        name, 
        phone, 
        email,
        ...
    }
- users_public 
    -> id: {
        name
    }