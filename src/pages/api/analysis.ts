import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const outputDir = path.join(process.cwd(), 'src', 'output');
    const files = fs.readdirSync(outputDir);

    // .md ファイルだけ取得
    const mdFiles = files.filter(file => file.endsWith('.md'));
    console.log('mkfile_num', mdFiles.length);
    if (mdFiles.length === 0) {
      console.error('No markdown files found in output directory');
      return res.status(404).json({ error: '分析結果が見つかりません' });
    }

    // AI が出力した結果を読み込み正規表現で企業名を抽出
    const yamlFilePath = path.join(process.cwd(), 'src', 'config', 'ai_stock_analysis_en.yaml');
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    const config = yaml.load(yamlContent) as { companies: { name: string }[] };

    const companyNames = config.companies.map(company => company.name).join('|');
    const companyRegex = new RegExp(companyNames);

    // 各ファイルにつき1回だけ解析
    const results = mdFiles.map(file => {
      const content = fs.readFileSync(path.join(outputDir, file), 'utf-8');
      const companyMatch = companyRegex.exec(content);

      // ファイルごとにレコードを1つだけ作る
      return {
        file,
        company: companyMatch ? companyMatch[0] : '不明な企業',
        recommendation: content.trim()
      };
    });

    // 重複を除きたい場合は Set を使う
    // ただし「content」がファイルごとに全部違う内容なら不要です
    const uniqueResults = Array.from(
      new Set(results.map(r => JSON.stringify(r)))
    ).map(str => JSON.parse(str));

    res.status(200).json(uniqueResults);
  } catch (error) {
    console.error('Error reading analysis results:', error);
    res.status(500).json({ error: '分析結果の取得中にエラーが発生しました' });
  }
}
