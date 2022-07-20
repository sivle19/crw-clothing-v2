import { ProuctCardContainer, Footer, Price, Name } from "./product-card.styles"


import { useSelector, useDispatch } from "react-redux"

import Button, { BUTTON_TYPE_CLASS } from "../button/button.component"
import { selectCartItems } from "../../store/cart/cart.selector"
import { addItemToCart } from "../../store/cart/cart.actions"

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const { name, price, imageUrl } = product
    const cartItems = useSelector(selectCartItems)

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

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