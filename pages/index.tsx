import React, { useEffect } from 'react'

function index() {

  const isSignedIn: any = () => {
    return false
    
  }

  useEffect(() => {

    if (isSignedIn) {
       location.replace("/login")
    }

  },[])
  return (
    <div>index</div>
  )
}

export default index