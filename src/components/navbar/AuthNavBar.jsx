import React from "react"
import Link from "next/link"
import { connect } from "react-redux"

import { logout } from "../../redux/actions/session/session.actions"

const mapStateToProps = (state) => ({
  currentUser: state.entities?.users[state.session?.currentUserId],
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
})

const AuthNavbar = (props) => {
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

const wrapper = connect(mapStateToProps, mapDispatchToProps)(AuthNavbar)

export default wrapper
