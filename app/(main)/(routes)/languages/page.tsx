
import HeaderPage from '@/components/HeaderPage'
import LanguageTable from '@/components/languages/LanguageTable'
import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/languages/create'/>
      <LanguageTable/>
    </>
  )
}

export default LanguagePage