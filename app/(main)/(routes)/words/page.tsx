import HeaderPage from '@/components/HeaderPage'
import WordTable from '@/components/words/WordTable'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/words/create'/>
      <WordTable/>
    </>
  )
}

export default LanguagePage