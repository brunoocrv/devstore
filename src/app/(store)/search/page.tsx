import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { api } from '@/data/api'
import { ProductInterface } from '@/data/types/products'

interface SearchProductsInterface {
  searchParams: {
    q: string
  }
}

async function searchProducts(q: string): Promise<ProductInterface[]> {
  const response = await api(`/products/search?q=${q}`).then((response) =>
    response.json(),
  )

  return response
}

export default async function SearchProducts({
  searchParams,
}: SearchProductsInterface) {
  if (!searchParams.q) redirect('/')

  const products = await searchProducts(searchParams.q)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Results for: <span className="font-semibold">{searchParams.q}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              width={860}
              height={860}
              quality={100}
              alt=""
              className="group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
