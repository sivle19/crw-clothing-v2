import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocs } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {

    const [categoriesMap, setCategoriesMap] = useState({})
    const value = { categoriesMap }

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categories = await getCategoriesAndDocs();
            console.log(categories)

            setCategoriesMap(categories)
        }

        getCategoriesMap()
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}