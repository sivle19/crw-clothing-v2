import { CartDropdownContainer, CartItems, EmptyMessage } from "./cart-dropdown.styles"

import Button from "../button/button.component"
import CartItem from "../cart-item/cart-item.component"

import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext)

    const navigate = useNavigate()

    const goToCheckOutHandler = () => navigate("/checkout")

    return (
        <CartDropdownContainer className="cart-dropdown-container">
            <CartItems className="cart-items">
                {cartItems.length ? (
                    cartItems.map(item => <CartItem key={item.id} cartItem={item} />)) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckOutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown