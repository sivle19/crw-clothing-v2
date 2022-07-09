
import { useContext, Fragment } from "react"
import { CategoriesContext } from "../../contexts/categories.context"

import CategoryPreview from "../../components/category-preview/category-preview.component"

const CategroiesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    return (
        <Fragment className="shop-container">
            {
                Object.keys(categoriesMap).map(title => {

                    const products = categoriesMap[title];

                    return <CategoryPreview key={title} title={title} products={products} />


                })
            }

        </Fragment>
    )
}

export default CategroiesPreview