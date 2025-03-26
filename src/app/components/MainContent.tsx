import Box from '@mui/material/Box' // 変更：Chakra UI => MUI
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Removed unused interface AnalysisResult

interface MainContentProps {
  selectedResult: { recommendation: string } | null
}

const MainContent: React.FC<MainContentProps> = ({ selectedResult }) => {
  return (
    <Box sx={{ p: 3, border: '1px solid', borderRadius: 2, boxShadow: 2 }}>
      {selectedResult ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown-content'>
          {selectedResult.recommendation}
        </ReactMarkdown>
      ) : (
        <p>選択された企業の分析結果がありません。</p>
      )}
    </Box>
  )
}

export default MainContent
