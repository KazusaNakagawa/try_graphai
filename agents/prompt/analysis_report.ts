import { Company } from '../types';

// 分析プロンプトの生成関数
export const createAnalysisReportPrompt = (company: Company, model: string, version: string) => `
## ${company.name} (${company.ticker}) 投資推奨

### 生成情報

- 生成日時: ${new Date().toLocaleString()}
- 使用モデル: ${model}
- バージョン: ${version}

### 投資判断
- 推奨: [強い買い/買い/中立/売り/強い売り]

### 判断根拠

### 主要なリスク要因

### 成長機会

### 投資家へのアドバイス

データソース: ${company.source}
`
;
