import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import AuthNavBar from "../navbar/AuthNavBar"
import RenderErrors from "../utils/renderErrors"
import { login, removeErrors } from "../../redux/actions/session/session.actions"

const SignUpForm = () => {
  const dispatch = useDispatch()
  //   const dispatchLogin = (user) => dispatch(login(user))

  const errors = useSelector((state) => state.errors?.session)

  const router = useRouter()

  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatchLogin(user)
  }

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const resetInputs = () => {
    setUser({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    })
  }

  return (
    <>
      <AuthNavBar />

      <div className="auth-bg">
        <div className="auth-page-wrapper">
          <section className="auth-section-wrapper">
            <div className="auth-header-wrapper">
              <h1 className="auth-title">Sign up</h1>
            </div>
            <RenderErrors errors={errors} />
            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="auth-form">
                <label>
                  First name
                  <input
                    type="text"
                    required
                    value={user.firstName || ""}
                    name="firstName"
                    placeholder="Your first name"
                    onChange={handleChange}
                    id="first-name-input"
                  />
                </label>

                <label>
                  Last name
                  <input
                    type="text"
                    required
                    value={user.lastName || ""}
                    name="lastName"
                    placeholder="Your last name"
                    onChange={handleChange}
                    id="last-name-input"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    required
                    value={user.email || ""}
                    name="email"
                    placeholder="Your email address"
                    onChange={handleChange}
                    id="email-input"
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    required
                    value={user.password || ""}
                    name="password"
                    placeholder="Your password"
                    onChange={handleChange}
                    id="password-input"
                  />
                </label>
                <p className="input-subtext">Password needs to be six or more characters.</p>
                <div className="spacer-8"></div>
                <button className="auth-submit-primary" type="submit">
                  Create a new account
                </button>
              </form>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                <Link href="login">Log in</Link>
              </p>
            </div>
          </section>
          <div className="auth-section-divider"></div>
          <section className="auth-section-wrapper">
            <div className="auth-header-wrapper">
              <h2 className="auth-subtitle"></h2>
              <p className="auth-subtext">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi asperiores
                nesciunt exercitationem quae praesentium ratione voluptatibus nobis accusamus
                provident itaque!
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default SignUpForm
