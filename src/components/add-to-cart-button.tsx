'use client'

import { useCart } from '@/contexts/cart-context'

export function AddToCartButton({ productId }: { productId: number }) {
  const { addToCart } = useCart()
  return (
    <button
      onClick={() => addToCart(productId)}
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white"
    >
      Add to cart
    </button>
  )
}
