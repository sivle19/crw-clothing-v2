import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom"

import CategroiesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocs } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocs();
            console.log(categoriesArray)

            dispatch(setCategories(categoriesArray))
        }

        getCategoriesMap()
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategroiesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop