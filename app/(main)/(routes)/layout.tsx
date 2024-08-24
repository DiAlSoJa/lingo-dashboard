
import React from 'react'

const DashPagesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='p-5'>
        {children}
    </div>
  )
}

export default DashPagesLayout