# AI Stock Analysis Tool

## Overview

A sophisticated tool for analyzing AI-related stocks using GraphAI. This tool performs multi-dimensional analysis including financial metrics, market position, technological capabilities, and market sentiment to generate investment recommendations.

## Features

- Advanced analysis using OpenAI GPT models
- Batch analysis of multiple companies
- Structured output in Markdown format
- Customizable analysis points
- Support for both English and Japanese configurations
- Real-time stock data integration
- Automated report generation

## Prerequisites

- Node.js (v14 or higher)
- TypeScript
- OpenAI API key

## Configuration

1. Create a `.env` file in the project root
2. Add your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

## Usage

### Basic Run

```bash
npm start
```

### Development Mode (with hot reload)

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Configuration Files

The tool supports both English and Japanese configurations:

- `ai_stock_analysis_en.yaml`: English configuration
- `ai_stock_analysis.yaml`: Japanese configuration

### Adding Companies

Add companies to analyze in the configuration YAML file:

```yaml
companies:
  - name: "Company Name"
    ticker: "TICKER"
    source: "https://finance.yahoo.com/quote/TICKER"
```


## Analysis Points

The tool analyzes companies across multiple dimensions:

- Financial Metrics (revenue growth, profit margins, etc.)
- Market Position (market share, competitive advantages)
- Technology (R&D investment, patent portfolio)
- Market Sentiment (analyst ratings, social media sentiment)

## Output

Analysis results are saved in the `output` directory with timestamps, containing:

- Company overview
- Financial analysis
- Technical analysis
- Risk assessment
- Investment recommendations

## Running Specific Commands

```bash
npx ts-node index.ts analyze
npx ts-node index.ts web-display
```

## Technical Stack

- TypeScript
- GraphAI
- OpenAI GPT
- Node.js
- YAML for configuration

## Project Structure

```bash
.
├── README.md                      
├── agents                         # Directory for analysis agents
│   ├── analysis.ts                
│   ├── prompt                     
│   └── types.ts                   
├── commands                       # Directory for CLI commands
│   ├── analyzeCommand.ts          
│   └── webDisplayCommand.ts       
├── config                         # Configuration files
│   ├── ai_stock_analysis.yaml     
│   ├── ai_stock_analysis_en.yaml  
│   └── view_companies.yaml        
├── index.ts                       # Entry point for the application
├── next-env.d.ts                  
├── output                         # Directory for analysis output
│   └── ...                        
├── package.json                   
├── src                            # Source directory for the application
│   ├── components                 
│   ├── pages                      
│   └── styles                     
├── tsconfig.json                  
└── yarn.lock                      
```

## License

MIT

## Disclaimer

This tool provides investment analysis for reference purposes only. All investment decisions should be made at your own discretion and risk. Always conduct your own due diligence before making investment decisions.
