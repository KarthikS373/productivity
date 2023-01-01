import { useEffect, useState } from "react"
import { Provider } from "react-redux"

import configureStore from "../redux/store/store"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {
  const [store, setStore] = useState(null)

  useEffect(() => {
    if (window.currentUser) {
      const { currentUser } = window

      const preloadedState = {
        entities: {
          users: {
            [currentUser.id]: currentUser,
          },
        },
        session: {
          currentUserId: currentUser.id,
        },
      }

      let _store = configureStore(preloadedState)
      setStore(_store)
      delete window.currentUser
    } else {
      let _store = configureStore()
      setStore(_store)
    }
  }, [])

  return store ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : (
    <div>Loading</div>
  )
}

export default MyApp
