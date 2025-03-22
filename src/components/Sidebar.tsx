import { Box, Heading, List, ListItem, Link } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import React from 'react'
import NextLink from 'next/link'

interface SidebarProps {
  results: { file: string; company: string }[]
  selectedCompany: string | null
  setSelectedCompany: (company: string) => void
}

const groupResultsByCompany = (results: { file: string; company: string }[]) => {
  const groupedResults: { [key: string]: { file: string; date: string }[] } = {}

  results.forEach((result) => {
    const regex = /analysis_(.+?)_(\d{8}T\d{5})\.md/
    const match = regex.exec(result.file)
    if (match) {
      const company = match[1]
      const date = match[2]
      // date を日本語に変換
      const year = date.slice(0, 4)
      const month = date.slice(4, 6)
      const day = date.slice(6, 8)
      const _date: string = `${year}/${month}/${day}`

      // push で表示
      if (!groupedResults[company]) {
        groupedResults[company] = []
      }
      groupedResults[company].push({ file: result.file, date: _date })
    }
  })

  return groupedResults
}

const Sidebar: React.FC<SidebarProps> = ({
  results,
  selectedCompany,
  setSelectedCompany,
}) => {
  const groupedResults = groupResultsByCompany(results)

  return (
    <Box position='sticky' top='20px' borderWidth='1px' borderRadius='lg' p={4}>
      <Heading as='h2' size='md' mb={4}>
        分析企業一覧
      </Heading>
      <List spacing={3}>
        {Object.keys(groupedResults).map((company, index) => (
          <React.Fragment key={company}>
            <ListItem fontWeight='bold'>
              {index + 1}. {company}
            </ListItem>
            {groupedResults[company].map((result) => (
              <ListItem
                key={result.file}
                cursor='pointer'
                bg={selectedCompany === result.file ? 'gray.100' : 'transparent'}
                p={2}
                borderRadius='md'
                _hover={{ bg: 'gray.50' }}
              >
                <NextLink href={`/${result.file.replace(/\.md$/, '')}`} passHref>
                  <Link
                    display='flex'
                    alignItems='center'
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedCompany(result.file)
                    }}
                  >
                    <ChevronRightIcon mr={2} />
                    {result.date}
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
