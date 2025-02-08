import { Box, Container, Heading, VStack, Text, useToast, Grid, GridItem, List, ListItem, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnalysisResult {
  company: string;
  recommendation: string;
}

export default function Home() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/analysis')
      .then(res => res.json())
      .then(data => {
        const analysisData = data as AnalysisResult[];
        setResults(analysisData);
        if (analysisData.length > 0) {
          setSelectedCompany(analysisData[0].company);
        }
      })
      .catch(error => {
        toast({
          title: 'エラーが発生しました',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  }, []);

  const selectedResult = results.find(r => r.company === selectedCompany);

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" textAlign="center" mb={10}>
        AI株式分析レポート
      </Heading>

      <Grid templateColumns="250px 1fr" gap={8}>
        {/* サイドバー */}
        <GridItem>
          <Box
            position="sticky"
            top="20px"
            borderWidth="1px"
            borderRadius="lg"
            p={4}
          >
            <Heading as="h2" size="md" mb={4}>
              分析企業一覧
            </Heading>
            <List spacing={3}>
              {results.map((result, index) => (
                <ListItem
                  key={result.company}
                  cursor="pointer"
                  onClick={() => setSelectedCompany(result.company)}
                  bg={selectedCompany === result.company ? 'gray.100' : 'transparent'}
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: 'gray.50' }}
                >
                  <Link display="flex" alignItems="center" onClick={(e) => {
                    e.preventDefault();
                    setSelectedCompany(result.company);
                  }}>
                    <Text fontWeight="bold" mr={2}>
                      {index + 1}.
                    </Text>
                    <ChevronRightIcon mr={2} />
                    {result.company}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </GridItem>

        {/* メインコンテンツ */}
        <GridItem>
          {selectedResult && (
            <Box
              p={6}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="markdown-content"
              >
                {selectedResult.recommendation}
              </ReactMarkdown>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
}
