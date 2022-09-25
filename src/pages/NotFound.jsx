import React from 'react'

export default function NotFound() {
    // A 404 page that is rendered when a user tries to access a page that does not exist.
    // It provides a link to the home page.
  return (

    <div>
        <h1>404</h1>
        <p>Page not found</p>
        <a href="/">Go to home page</a>
    </div>
  )
}
