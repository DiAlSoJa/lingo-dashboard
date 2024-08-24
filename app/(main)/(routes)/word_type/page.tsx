import HeaderPage from '@/components/HeaderPage'
import WordTypeTable from '@/components/words_types/WordTypeTable'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/word_type/create'/>
      <WordTypeTable/>
    </>
  )
}

export default LanguagePage