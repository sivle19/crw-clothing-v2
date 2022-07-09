import { ProuctCardContainer, Footer, Price, Name } from "./product-card.styles"

import Button, { BUTTON_TYPE_CLASS } from "../button/button.component"

import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

const ProductCard = ({ product }) => {

    const { name, price, imageUrl } = product
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

    return (
        <ProuctCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASS.inverted} onClick={addProductToCart}>Add To Cart</Button>
        </ProuctCardContainer>
    )
}

export default ProductCard 