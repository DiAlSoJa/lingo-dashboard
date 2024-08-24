import CourseTable from '@/components/courses/CourseTable'
import HeaderPage from '@/components/HeaderPage'
import WordTable from '@/components/words/WordTable'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/courses/create'/>
      <CourseTable/>
    </>
  )
}

export default LanguagePage