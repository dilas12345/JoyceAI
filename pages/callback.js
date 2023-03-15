import React from 'react'
import Link from 'next/link'
import Parallax from "../components/Parallax/Parallax.js";

const ErrorPage = ({ message }) => {
  return (
    <Parallax message={message}>
      <div className="text-center mb-5">
        <p className="lead">{message}</p>
        <p className="lead"><Link href="/"><a>Go to home</a></Link></p>
      </div>
    </Parallax>
  )
}

ErrorPage.getInitialProps = async ({ query }) => {
  return { message: query.message || 'An unknown error occured!' }
}

export default ErrorPage