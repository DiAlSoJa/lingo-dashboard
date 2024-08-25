import ChapterTable from '@/components/chapter/ChapterTable'
import HeaderPage from '@/components/HeaderPage'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/chapter/create'/>
      <ChapterTable/>
    </>
  )
}

export default LanguagePage