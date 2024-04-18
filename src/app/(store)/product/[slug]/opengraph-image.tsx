/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

import { env } from '@/env'

import { api } from '@/data/api'
import { ProductInterface } from '@/data/types/products'

export const runtime = 'edge'
export const alt = 'Open Graph Image'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

async function getProduct(slug: string): Promise<ProductInterface> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  }).then((response) => response.json())

  return response
}

export default async function OpenGraphImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  const imageUrl = new URL(product.image, env.APP_URL).toString()

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <img src={imageUrl} alt="" style={{ width: '100%' }} />
      </div>
    ),
  )
}
