import Link from "next/link"
import React, { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import AuthNavBar from "../navbar/AuthNavBar"
import RenderErrors from "../utils/renderErrors"
import { login } from "../../redux/actions/session/session.actions"

const LoginForm = ({}) => {
  const dispatch = useDispatch()
  const dispatchLogin = (user) => dispatch(login(user))

  const errors = useSelector((state) => state.errors?.session)

  const router = useRouter()

  const emailRef = useRef()
  const pwdRef = useRef()

  const [user, setUser] = useState({
    email: null,
    password: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatchLogin(user)
  }

  const handleChange = (e) => {
    if (e.target.value) {
      setUser((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
      })
    }
  }

  const resetInputs = () => {
    setUser({
      email: null,
      password: null,
    })
  }

  const loginDemo = (e) => {
    e.preventDefault()
    resetInputs()

    const demo = { email: "test@test.com", password: "password" }

    const demoEmail = demo.email.split("")
    const demoPassword = demo.password.split("")
    const time = 65

    demoEmail.forEach((char, i) => {
      setTimeout(() => {
        let _email = emailRef.current.value
        _email += char
        setUser((prev) => {
          return { ...prev, email: _email }
        })
      }, time * i)
    })

    demoPassword.forEach((char, i) => {
      setTimeout(() => {
        let _password = pwdRef.current.value
        _password += char
        setUser((prev) => {
          return { ...prev, password: _password }
        })
      }, time * (i + demoEmail.length))
    })

    const submitDelay = time * (demoEmail.length + demoPassword.length)
    setTimeout(() => dispatchLogin(demo), submitDelay)
    // setTimeout(() => router.push("/"), submitDelay)
  }

  return (
    <>
      <AuthNavBar />

      <div className="auth-bg">
        <div className="auth-page-wrapper">
          <section className="auth-section-wrapper">
            <div className="auth-header-wrapper">
              <h1 className="auth-title">Log in</h1>
            </div>
            <RenderErrors errors={errors} />

            <div className="form-wrapper">
              <form onSubmit={handleSubmit} className="auth-form">
                <label>
                  Email
                  <input
                    type="text"
                    ref={emailRef}
                    required
                    value={user.email || ""}
                    placeholder="Your email address"
                    onChange={handleChange}
                    id="email-input"
                  />
                </label>
                {errors?.email ? <p>{errors.email}</p> : ""}
                <label>
                  Password
                  <input
                    type="password"
                    ref={pwdRef}
                    required
                    value={user.password || ""}
                    placeholder="Your password"
                    onChange={handleChange}
                    id="password-input"
                  />
                </label>
                <div className="spacer-8"></div>
                <button className="auth-submit-primary" type="submit">
                  Sign in
                </button>
              </form>
              <p>
                New to Notion? <Link href="/signup">Sign up</Link>
              </p>
            </div>
          </section>
          <div className="auth-section-divider"></div>

          <section className="auth-section-wrapper" id="demo-login">
            <div className="auth-header-wrapper">
              <h2 className="auth-subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h2>
              <p className="auth-subtext">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, possimus similique
                numquam voluptates sequi mollitia expedita ad perferendis? Laborum, fuga?
              </p>
            </div>
            <div className="form-wrapper">
              <form onSubmit={loginDemo} className="auth-form">
                <button className="auth-submit-demo" type="submit">
                  Demo
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default LoginForm
