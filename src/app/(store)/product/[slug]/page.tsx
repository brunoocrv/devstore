import Image from 'next/image'

import { api } from '@/data/api'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { ProductInterface } from '@/data/types/products'
import { Metadata } from 'next'

async function getProduct(slug: string): Promise<ProductInterface> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  }).then((response) => response.json())

  return response
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[800px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          width={1000}
          height={1000}
          quality={100}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <p className="mt-2 leading-relaxed to-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block px-5 py-2.5 rounded-full bg-violet-500 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Sizes</span>
          <div className="flex gap-2">
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              SM
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              M
            </button>
            <button className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold">
              LG
            </button>
          </div>
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured', {
    cache: 'no-store',
  }).then((response) => response.json())

  const slugs: { slug: string }[] = response.map(
    (product: ProductInterface) => ({
      slug: product.slug,
    }),
  )

  return slugs
}
