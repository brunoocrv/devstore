'use client'
import { ReactElement, createContext, useContext, useState } from 'react'

interface CartItem {
  procutId: number
  quantity: number
}

interface CartContextInterface {
  items: CartItem[]
  addToCart: (productId: number) => void
}

const CartContext = createContext<CartContextInterface>(
  {} as CartContextInterface,
)

export function CartProvider({ children }: { children: ReactElement }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(productId: number) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.procutId === productId)

      if (productInCart) {
        return state.map((item) =>
          item.procutId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...state, { procutId: productId, quantity: 1 }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
