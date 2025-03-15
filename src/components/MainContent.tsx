import { Box, Container, Heading, Grid, GridItem, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnalysisResult {
  file: string;
  company: string;
  recommendation: string;
}

interface MainContentProps {
  selectedResult: { recommendation: string } | null;
}

const MainContent: React.FC<MainContentProps> = ({ selectedResult }) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      {selectedResult ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="markdown-content"
        >
          {selectedResult.recommendation}
        </ReactMarkdown>
      ) : (
        <p>選択された企業の分析結果がありません。</p>
      )}
    </Box>
  );
};

export default MainContent;
