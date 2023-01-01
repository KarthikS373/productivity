import React from "react"
import Link from "next/link"
import { connect, useDispatch, useSelector } from "react-redux"

import { logout } from "../../redux/actions/session/session.actions"

const AuthNavbar = ({}) => {
  const dispatch = useDispatch()
  const dispatchLogout = () => dispatch(logout())

  const errors = useSelector((state) => state.entities?.users[state.session?.currentUserId])

  return (
    <header className="header">
      <div className="outer">
        <div className="inner">
          <div className="logo-wrapper">
            <Link href="/">
              <img className="logo" src={window.logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthNavbar
