import React from 'react'
import { useUser } from '../context/UserContext'
function Dashboard() {
  const {userInfo} = useUser();

  return (
    <div>Dashboard
      {JSON.stringify(userInfo, null, 2)}
    </div>
  )
}

export default Dashboard