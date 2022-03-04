import React from "react"
import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { LoginContext } from "../Contexts/ContextProvider"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { account,userEmail } = useContext(LoginContext)

  return (
    <Route
      {...rest}
      render={props => {
        return userEmail ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}