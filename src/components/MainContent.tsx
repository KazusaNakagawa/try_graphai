import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      {selectedResult && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="markdown-content"
        >
          {selectedResult.recommendation}
        </ReactMarkdown>
      )}
    </Box>
  );
};

export default MainContent;
