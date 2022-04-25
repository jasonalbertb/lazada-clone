import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useParams} from "react-router-dom";
import {ReactLoader} from "../../components/loading/ReactLoader";
import {getProductData, getStoreData} from "../../services/firebase";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes";
//redux
import {useDispatch} from "react-redux";
import {setIsError} from "../../store/ErrorSlice";
//components
import {ImageSlider} from "./ImageSlider";
import {ProductFooter} from "./ProductFooter";
import {ProductHeader} from "./ProductHeader";
import {ProductDetails} from "./ProductDetails";
import {ProductReview} from "./ProductReview";
import {ProductStore} from "./ProductStore";
import {ProductHightlights} from "./ProductHightlights";
import {AppBanner} from "../../components/AppBanner";
const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {storeID,prodID} = useParams();
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    useEffect(()=>{
        (async()=>{
            try {
                const sData = await getStoreData(storeID); 
                if (!sData) {
                    throw new Error("Store not found");
                }
                const pData = await getProductData({storeID, prodID});
                if (!pData) {
                    throw new Error("Product not found");
                }     
                setPageData({store: sData, product: pData});
                setIsLoading(false)
            } catch (error) {
                console.log(error);
                dispatch(setIsError(error));
                navigate(ROUTES.ERR);
            }
        })()
    }, [prodID, storeID, dispatch, navigate]);

    const observer = useRef();
    const bannerRef = useCallback(node=>{
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries=>{
            setIsHeaderOpen(!entries[0].isIntersecting);
        });
        if (node) observer.current.observe(node)
    }, []);


    if (isLoading) {
        return <ReactLoader />
    }
    
    return (
        <div className='bg-gray-100'>
            {isHeaderOpen && <ProductHeader />}
            <div ref={bannerRef}>
               <AppBanner />
            </div>
            <ImageSlider gallery={pageData.product.gallery}/>
            <ProductDetails storeID={storeID} product={pageData.product}/>
            <ProductReview storeID={storeID} prodID={prodID} reviewCnt={pageData.product.rating || 0}/>
            <ProductStore storeID={storeID} />
            <ProductHightlights details={pageData.product.prod_details}/> 
            <div className='h-screen'> </div>
            <ProductFooter storeID={storeID} prodID={prodID} />

        </div>
    )
}

export default Products