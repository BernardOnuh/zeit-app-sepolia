import React from 'react'
import Head from 'next/head'

const HeadComp = ({title}) => {
  return (
    <Head>
        <title>{title}</title>
        <meta name="description" content=" Decentralized Perpetual Protocol Built on Base" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="perpetual exchange, zeit, base, dapp, zeitprotocol, zeit protocol" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="zeitprotocol.xyz" />
        <meta name="twitter:title" content="Zeit Protocol" />
        <meta name="twitter:description" content="Decentralized Perpetual Protocol Built on Base" />
        <meta name="twitter:image" content="https://zeitprotocol.xyz/images/open-graph-img.png" />
        <meta property="og:title" content="Zeit Protocol" />
        <meta property="og:url" content="https://zeitprotocol.xyz" />
        <meta property="og:image" content="https://zeitprotocol.xyz/images/open-graph-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Decentralized Perpetual Protocol Built on Base" />
        <meta property="og:site_name" content="Zeit Protocol" />
        <link rel="icon" href="/logo.ico" />
    </Head>
  )
}

export default HeadComp
