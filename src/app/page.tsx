'use client'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'

interface AnalysisResult {
  file: string
  company: string
  recommendation: string
}

export default function Home() {
  const [results, setResults] = useState<AnalysisResult[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analysis')
      .then((res) => res.json())
      .then((data) => {
        const analysisData = data as AnalysisResult[]
        setResults(analysisData)
        if (analysisData.length > 0) {
          setSelectedCompany(analysisData[0].file)
        }
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error.message)
      })
  }, [])

  useEffect(() => {
    console.log('selectedCompany:', selectedCompany)
    console.log('results:', results)
  }, [selectedCompany, results])

  const selectedResult = results.find((r) => r.file === selectedCompany)

  useEffect(() => {
    console.log('selectedResult:', selectedResult)
  }, [selectedResult])

  return (
    <Container maxWidth='xl' sx={{ pt: 10 }}>
      <Typography variant='h3' align='center' sx={{ my: 4 }}>
        AI株式分析レポート
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <Sidebar
            results={results}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <MainContent selectedResult={selectedResult ?? null} />
        </Grid>
      </Grid>
    </Container>
  )
}
