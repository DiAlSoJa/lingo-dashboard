import ChapterTable from '@/components/chapter/ChapterTable'
import HeaderPage from '@/components/HeaderPage'
import LessonQuizTable from '@/components/lesson-quiz/LessonQuizTable'


import React from 'react'

const LanguagePage = () => {
  return (
    <>
      <HeaderPage link='/lesson-quiz/create'/>
      <LessonQuizTable/>
    </>
  )
}

export default LanguagePage