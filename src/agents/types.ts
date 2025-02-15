interface Company {
  name: string;
  ticker: string;
  source: string;
}

interface AnalysisPoints {
  financial_metrics: string[];
  market_position: string[];
  technology: string[];
  sentiment: string[];
}

interface Config {
  companies: Company[];
  analysis_points: AnalysisPoints;
  metadata: {
    model: string;
    version: string;
    date: string;
  };
}

// 型定義の追加
interface Choice {
  message: {
    content: string;
  };
}

interface RecommendationResult {
  choices: Choice[];
}

interface GraphResult {
  investment_recommendation?: RecommendationResult;
}

export { Company, AnalysisPoints, Config, GraphResult, Choice, RecommendationResult };
