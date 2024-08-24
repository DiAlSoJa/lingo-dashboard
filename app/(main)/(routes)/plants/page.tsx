import HeaderPage from '@/components/HeaderPage'
import LanguageTable from '@/components/languages/LanguageTable'
import PlantTable from '@/components/plants/PlantTable'
import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/plants/create'/>
      <PlantTable/>
    </>
  )
}

export default LanguagePage