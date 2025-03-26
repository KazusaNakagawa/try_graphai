import Box from '@mui/material/Box' // 変更：Chakra UI => MUI
import Typography from '@mui/material/Typography' // Heading の代替
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MuiLink from '@mui/material/Link'
import ChevronRightIcon from '@mui/icons-material/ChevronRight' // 変更：MUI のアイコン
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
    <Box
      sx={{ position: 'sticky', top: '20px', border: '1px solid', borderRadius: 2, p: 2 }}
    >
      <Typography variant='h6' gutterBottom>
        分析企業一覧
      </Typography>
      <List>
        {Object.keys(groupedResults).map((company, index) => (
          <React.Fragment key={company}>
            <ListItem sx={{ fontWeight: 'bold' }}>
              {index + 1}. {company}
            </ListItem>
            {groupedResults[company].map((result) => (
              <ListItem
                key={result.file}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedCompany === result.file ? 'grey.100' : 'transparent',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'grey.50' },
                }}
              >
                <NextLink href={`/${result.file.replace(/\.md$/, '')}`} passHref>
                  <MuiLink
                    sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedCompany(result.file)
                    }}
                  >
                    <ChevronRightIcon sx={{ mr: 1 }} />
                    {result.date}
                  </MuiLink>
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
