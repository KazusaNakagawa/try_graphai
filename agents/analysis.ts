import "dotenv/config";
import { GraphAI } from "graphai";
import * as agents from "@graphai/agents";
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import { Company, Config, GraphResult } from "./types";
import { createAnalysisPrompt } from "./prompt/analysis";


const config = yaml.load(
  fs.readFileSync(path.join(__dirname, "../config", "ai_stock_analysis.yaml"), "utf8")
) as Config;

const model = config.metadata.model;
const version = config.metadata.version;

// GraphAIのグラフ生成関数
const createStockAnalysisGraph = (company: Company) => ({
  version: 0.5,
  nodes: {
    company_data: {
      agent: "openAIAgent",
      params: {
        model: model,
        system: "あなたはAI技術企業を専門とする金融アナリストです。以下の観点から詳細な分析を日本語でMarkdown形式で提供してください:",
      },
      inputs: { 
        prompt: createAnalysisPrompt(company, config.analysis_points),
        source: company.source 
      },
    },
    investment_recommendation: {
      agent: "openAIAgent",
      isResult: true,
      params: {
        model: model,
        system: "すべての分析データに基づいて、詳細な投資推奨を日本語でMarkdown形式で提供してください。リスクと機会の両面から説明してください:",
      },
      inputs: {
        prompt: `
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
`,
        analysis: ":company_data.choices.$0.message.content"
      },
    },
  },
});


// メイン実行関数
const main = async () => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0,14);
  const outputDir = `${__dirname}/../output`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = `${outputDir}/analysis_results_${timestamp}.md`;
  const writeStream = fs.createWriteStream(outputPath, { flags: 'w' });
  
  for (const company of config.companies) {
    console.log(`Analyzing ${company.name}...`);
    const graphData = createStockAnalysisGraph(company);
    const graph = new GraphAI(graphData, agents);
    const result = await graph.run() as GraphResult;

    if (result.investment_recommendation?.choices?.[0]?.message?.content) {
      const recommendation = `${result.investment_recommendation.choices[0].message.content}\n\n---\n\n`;
      writeStream.write(recommendation);
    }

    console.log(`${company.name}の分析が完了しました`);
  }
};

if (require.main === module) {
  main().catch(console.error);
}
