import { Company, AnalysisPoints } from '../types'

// 分析プロンプトの生成関数
export const createAnalysisPrompt = (company: Company, points: AnalysisPoints) => `
以下の観点から詳細な分析をお願いします:

1. 財務指標分析:
${points.financial_metrics.map((metric) => `- ${metric}`).join('\n')}

2. 市場ポジション:
${points.market_position.map((pos) => `- ${pos}`).join('\n')}

3. 技術力:
${points.technology.map((tech) => `- ${tech}`).join('\n')}

4. 市場センチメント:
${points.sentiment.map((sent) => `- ${sent}`).join('\n')}

企業情報: ${company.name} (${company.ticker})
データソース: ${company.source}

注: 回答はMarkdown形式で構造化してください。
`
