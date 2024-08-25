import ChapterTable from '@/components/chapter/ChapterTable'
import HeaderPage from '@/components/HeaderPage'
import LessonTable from '@/components/lesson/LessonTable'

import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/lesson-quiz/create'/>
      <LessonTable/>
    </>
  )
}

export default LanguagePage