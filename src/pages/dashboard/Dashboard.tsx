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
        className="max-h-screen h-screen grid grid-cols-1 md:grid-cols-2 sm:px-8 gap-2"
      >
        <QuestionsBySubject />
        <QuestionByBloomTaxonomy />
        <QuestionsByDifficulty />
        <QuestionByCheckType />
      </main>
    </DashboardProvider>
  )
}