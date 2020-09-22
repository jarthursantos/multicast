import React from 'react'

import Head from 'next/head'
import Link from 'next/link'

const Next = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Auth</title>
      </Head>
      <div>
        <h4>Material-UI</h4>
        <Link href="/home">
          <a>Go to the home page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Next
