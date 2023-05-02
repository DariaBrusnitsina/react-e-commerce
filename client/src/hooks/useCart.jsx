import React, { useContext, useEffect, useState } from "react";

const CartContext = React.createContext()
export const useCart = () => {
    return useContext(CartContext)
}
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [cartLength, setCartLength] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)


    function getCartLength() {
        let counter = 0
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)

        for (let i = 0; i < cartSet.length; i++) {
            counter = counter + cartSet[i].counter
        }
        return counter
    }

    function getTotalPrice() {
        let price = 0
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)

        for (let i = 0; i < cartSet.length; i++) {
            price = price + (cartSet[i].item.price * cartSet[i].counter)
        }
        return price
    }

    function getTotalPrice() {
        let price = 0
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)

        for (let i = 0; i < cartSet.length; i++) {
            price = price + (cartSet[i].item.price * cartSet[i].counter)
        }
        return price
    }

    useEffect(() => {
        const cartValue = localStorage.getItem("cart")
        if (cartValue) {
            const cartStorage = JSON.parse(cartValue)
            setCart(cartStorage)
            setCartLength(getCartLength())
            setTotalPrice(getTotalPrice())
        }
    }, []);

    const addCartItem = (data) => {
        const local = localStorage.getItem("cart")

        if (local) {
            const cartSet = JSON.parse(local)
            let counter = 0
            let num

            for (let i =0; i <cartSet.length; i++) {
                if (cartSet[i].item._id === data._id) {
                    counter++
                    num = i
                }
            }

            if (counter === 0) {
                const cartData = {'item': data, 'counter': 1 }
                cartSet.push(cartData)
                localStorage.setItem("cart", JSON.stringify(cartSet))
                setCart(cartSet)
            } else {
                cartSet[num].counter++
                localStorage.setItem("cart", JSON.stringify(cartSet))
                setCart(cartSet)
            }
        } else {
            let local = []
            const cartData = {'item': data, 'counter': 1}
            setCart(prevState => [...prevState, cartData])
            local.push(cartData)
            localStorage.setItem("cart", JSON.stringify(local))
        }
        setCartLength(getCartLength())
        setTotalPrice(getTotalPrice())
    }

    const incrementItem = (data) => {
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)
        let counter = 0
        let num

        for (let i =0; i <cartSet.length; i++) {
            if (cartSet[i].item._id === data._id) {
                counter++
                num = i
            }
        }
        cartSet[num].counter++
        localStorage.setItem("cart", JSON.stringify(cartSet))
        setCartLength(getCartLength())
        setTotalPrice(getTotalPrice())
        setCart(cartSet)
    }

    const decrementItem = (data) => {
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)
        let counter = 0
        let num

        for (let i =0; i <cartSet.length; i++) {
            if (cartSet[i].item._id === data._id) {
                counter++
                num = i
            }
        }
        if (cartSet[num].counter !== 1) {
            cartSet[num].counter--
        }

        localStorage.setItem("cart", JSON.stringify(cartSet))
        setCartLength(getCartLength())
        setTotalPrice(getTotalPrice())
        setCart(cartSet)
    }

    const removeCartItem = (data) => {
        const local = localStorage.getItem("cart")
        const cartSet = JSON.parse(local)
        const filteredSet = cartSet.filter(i => i.item._id !== data.item._id)

        localStorage.setItem("cart", JSON.stringify(filteredSet))
        setCartLength(getCartLength())
        setTotalPrice(getTotalPrice())
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem("cart")
        setCartLength(0)
        setTotalPrice(0)
    }

    return (
    <CartContext.Provider value={{cart, cartLength, totalPrice, addCartItem, clearCart, incrementItem, decrementItem, removeCartItem}}>
        {children}
    </CartContext.Provider>)
}