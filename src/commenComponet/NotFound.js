import React from 'react'

export default function NotFound() {
  return (
    <div class="section" style={{textAlign:"center"}}>
    <h1 class="error">404</h1>
    <div class="page">Ooops!!! The page you are looking for is not found</div>
    <a class="back-home" href="/login">Back to home</a>
  </div>
  )
}