import { CartIconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles"


import { useSelector, useDispatch } from "react-redux"

import { selectIsCartOpen, selectCartCount } from "../../store/cart/cart.selector"
import { setIsCartOpen } from "../../store/cart/cart.actions"

const CartIcon = () => {
    const dispatch = useDispatch()

    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)

    const toggleCartDropdown = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleCartDropdown}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon