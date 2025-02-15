import { Box, Heading, List, ListItem, Link, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import React from 'react';

interface SidebarProps {
  results: { company: string }[];
  selectedCompany: string | null;
  setSelectedCompany: (company: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ results, selectedCompany, setSelectedCompany }) => {
  return (
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
  );
};

export default Sidebar;
