import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';


function getFiles(outputDir: string, extension: string): string[] {
  const files = fs.readdirSync(outputDir);
  const targetFiles = files.filter(file => file.endsWith(extension));
  console.log('file_num', targetFiles.length);
  if (targetFiles.length === 0) {
    console.error('No markdown files found in output directory');
    return [];
  }

  return targetFiles;
}
  

function getAnalysisResults(outputDir: string, mdFiles: string[]): { file: string, company: string, recommendation: string }[] {
  return mdFiles.map(file => {
    const content = fs.readFileSync(path.join(outputDir, file), 'utf-8');
    const companyRegex = /##\s(.+)\s\((.+)\)\s投資推奨/g;
    const companyMatch = companyRegex.exec(content);

    return {
      file,
      company: companyMatch ? companyMatch[1] : '企業名不明',
      recommendation: content.trim()
    };
  });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const outputDir = path.join(process.cwd(), 'src', 'output');

    const mdFiles = getFiles(outputDir, '.md');
    if (mdFiles.length === 0) {
      return res.status(404).json({ error: '分析結果が見つかりません' });
    }

    const results = getAnalysisResults(outputDir, mdFiles);
    const uniqueResults = Array.from(
      new Set(results.map(r => JSON.stringify(r)))
    ).map(str => JSON.parse(str));

    res.status(200).json(uniqueResults);
  } catch (error) {
    console.error('Error reading analysis results:', error);
    res.status(500).json({ error: '分析結果の取得中にエラーが発生しました' });
  }
}
