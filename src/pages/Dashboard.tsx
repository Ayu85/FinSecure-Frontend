import HomeDashboard from '@/components/Dashboard/HomeDashboard'
import Sidebar from '@/components/Sidebar/Sidebar'
import React from 'react'

const Dashboard = () => {

  return (
    <div className='flex'>
      <Sidebar/>
      <HomeDashboard/>

    </div>
  )
}

export default Dashboard