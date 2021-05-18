import React from 'react'

import { DashboardProvider } from './DashboardContext'
import {
  QuestionsBySubject,
  QuestionByBloomTaxonomy,
  QuestionsByDifficulty,
  QuestionByCheckType,
} from './charts'

export const Dashboard = () => {
  return (
    <DashboardProvider>
      <main
        className="max-h-screen h-screen sm:px-8 gap-2 pt-2 sm:pt-4 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4"
      >
        <QuestionsBySubject />
        <QuestionByBloomTaxonomy />
        <QuestionsByDifficulty />
        <QuestionByCheckType />
      </main>
    </DashboardProvider>
  )
}