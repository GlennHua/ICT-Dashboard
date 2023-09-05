import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const RetryButton = () => {
    const { logout } = useAuth0();
  return (
    <Button variant="contained" onClick={()=>logout()}>Retry</Button>
  )
}

export default RetryButton