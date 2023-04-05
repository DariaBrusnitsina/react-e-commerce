import React, { useContext, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import qualityService from "../services/quality.service";

const CartContext = React.createContext()
export const useCart = () => {
    return useContext(CartContext)
}
export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [errors, setErrors] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const prevState = useRef()

    useEffect(() => {
        const getQualities = async () => {
            try {
                // setCart(content)
                setLoading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities()
    },[])

    const getQuality = (id) => {
        return cart.find((q) => q._id === id)
    };

    const updateQuality = async ({_id: id, ...data}) => {
        try {
            // const {content} = await qualityService.update(id, data)
            // setCart((prevState) => prevState.map((item) => {
            //     if (item._id === content._id) {
            //         return content
            //     }
            //     return item
            // }))
            // return content

        } catch (error) {
            errorCatcher(error)
        }
    }

    const addQuality = async(data) => {
        try {
            // const {content} = await qualityService.create(data)
            // setCart(prevState => [...prevState, content])
            // return content

        } catch (error) {
            errorCatcher(error)
        }
    }

    const deleteQuality = async(id) => {
        try {
            // const {content} = await qualityService.delete(id)
            // setQualities((prevState) => {
            //     return prevState.filter(item => item._id !== content._id)
            // })

        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const {message} = error.response.data
        setErrors(message)
    }

    useEffect(() => {
        if (errors !== null) {
            // toast(errors)
            setErrors(null)
        }
    }, [errors])
    return (
    <CartContext.Provider value={{cart}}>
        {children}
    </CartContext.Provider>)
}