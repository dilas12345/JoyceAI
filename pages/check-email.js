import React, { useEffect } from 'react'
import Router from 'next/router'
import Parallax from "../components/Parallax/Parallax.js";
import Session from '../utils/session'

export default function VerifyEmail({ session, email }) {

  useEffect(() => {
    if (session && session.loggedin) {
      Router.push('/components')
    }
  }, [session])

  return (
    <Parallax session={session}>
      <div className="text-center pt-5 pb-5">
        <h1 className="display-4">Check your email</h1>
        <p className="lead">
          A verification link has been sent to { (email) ? <span className="font-weight-bold">{email}</span> : <span>your inbox</span> }.
        </p>
      </div>
    </Parallax>
  )
}

VerifyEmail.getInitialProps = async ({ req, res, query }) => {
  let session = ''
  let email = query.email || ''

  if (req && req.session) {
    session = req.session
  } else {
    session = await Session.getSession()
  }

  if (session && session.loggedin) {
    if (req) {
      res.redirect('/components')
    } else {
      Router.push('/components')
    }
  }

  return { session, email }
}