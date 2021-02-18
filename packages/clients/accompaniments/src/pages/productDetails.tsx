import React, { useEffect } from 'react'

import Head from 'next/head'

import { useCloseWindow } from '~/hooks/use-close-window'
import { useSetupAuth } from '~/hooks/use-setup-auth'
import { ProductDetailsScreen } from '~/screens/ProductDetails'
import { useProductDetailsPayload } from '~/windows/ProductDetails/actions'

const Home = () => {
  const [product, token] = useProductDetailsPayload()

  useSetupAuth(token)
  useCloseWindow()

  useEffect(() => console.log({ product }), [product])

  return (
    <React.Fragment>
      <Head>
        <title>FollowUP Compras - Produto</title>
      </Head>

      <ProductDetailsScreen product={product} />
    </React.Fragment>
  )
}

export default Home
