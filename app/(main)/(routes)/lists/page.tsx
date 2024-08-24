import HeaderPage from '@/components/HeaderPage'
import ListTable from '@/components/lists/ListsTable'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/lists/create'/>
      <ListTable/>
    </>
  )
}

export default LanguagePage