import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export function companyRegex(cwd: string[], filename: string): RegExp {
  /**
   * この関数は、指定された YAML ファイルを読み込み、
   * その中に含まれる企業名を正規表現に変換して返します。
   */

  const yamlFilePath = path.join(process.cwd(), ...cwd, filename);
  const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
  const config = yaml.load(yamlContent) as { companies: { name: string }[] };

  const companyNames = config.companies.map(company => company.name).join('|');
  const companyRegex = new RegExp(companyNames);

  return companyRegex;
}
