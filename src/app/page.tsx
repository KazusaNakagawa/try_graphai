'use client'

import { Container, Heading, Grid, GridItem, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
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
  const toast = useToast()

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
        toast({
          title: 'エラーが発生しました',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }, [toast])

  useEffect(() => {
    console.log('selectedCompany:', selectedCompany)
    console.log('results:', results)
  }, [selectedCompany, results])

  const selectedResult = results.find((r) => r.file === selectedCompany)

  useEffect(() => {
    console.log('selectedResult:', selectedResult)
  }, [selectedResult])

  return (
    <Container maxW='container.xl' py={10}>
      <Heading as='h1' size='xl' textAlign='center' mb={10}>
        AI株式分析レポート
      </Heading>

      <Grid templateColumns='250px 1fr' gap={8}>
        <GridItem>
          <Sidebar
            results={results}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </GridItem>

        <GridItem>
          <MainContent selectedResult={selectedResult ?? null} />
        </GridItem>
      </Grid>
    </Container>
  )
}
