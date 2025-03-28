import { notFound } from 'next/navigation'
import Link from 'next/link'
import '@/styles/markdown.css'
import { getAnalysisResult } from '@/agents/analysis'
import { AnalysisResult } from '@/agents/types'

/**
 * Company detail page that displays analysis results for a specific company
 */
export default async function CompanyPage({ params }: { params: { id: string } }) {
  const companyId = params.id

  try {
    // 会社IDに基づいて解析結果を取得
    const analysisResult = await getAnalysisResult(companyId)

    if (!analysisResult) {
      notFound()
    }

    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-4'>
          <Link href='/' className='text-blue-500 hover:text-blue-700 transition-colors'>
            ← トップページに戻る
          </Link>
        </div>

        <h1 className='text-3xl font-bold mb-6'>
          {analysisResult.companyName}（{companyId}）の分析結果
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <CompanyOverview analysis={analysisResult} />
          <FinancialMetrics analysis={analysisResult} />
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-semibold mb-4'>詳細分析</h2>
          <div
            className='prose max-w-none'
            dangerouslySetInnerHTML={{ __html: analysisResult.detailedAnalysis }}
          />
        </div>
      </div>
    )
  } catch (error) {
    console.error('会社データの取得中にエラーが発生しました:', error)
    return (
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl text-red-600'>エラーが発生しました</h1>
        <p>会社ID: {companyId} の分析結果を取得できませんでした。</p>
        <Link href='/' className='text-blue-500 hover:text-blue-700 transition-colors'>
          トップページに戻る
        </Link>
      </div>
    )
  }
}

/**
 * Company overview component that displays basic company information
 */
function CompanyOverview({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>会社概要</h2>
      <div className='space-y-2'>
        <p>
          <span className='font-medium'>会社名:</span> {analysis.companyName}
        </p>
        <p>
          <span className='font-medium'>業種:</span> {analysis.industry}
        </p>
        <p>
          <span className='font-medium'>設立年:</span> {analysis.foundedYear}
        </p>
        <p>
          <span className='font-medium'>従業員数:</span> {analysis.employeeCount}人
        </p>
      </div>
      <div className='mt-4'>
        <h3 className='text-lg font-medium mb-2'>事業概要</h3>
        <p>{analysis.businessDescription}</p>
      </div>
    </div>
  )
}

/**
 * Financial metrics component that displays key financial data
 */
function FinancialMetrics({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>財務指標</h2>
      <div className='space-y-3'>
        <div>
          <p className='font-medium'>売上高</p>
          <p className='text-lg'>
            {analysis.revenue ? `${analysis.revenue.toLocaleString()}円` : '情報なし'}
          </p>
        </div>
        <div>
          <p className='font-medium'>純利益</p>
          <p className='text-lg'>
            {analysis.netIncome ? `${analysis.netIncome.toLocaleString()}円` : '情報なし'}
          </p>
        </div>
        <div>
          <p className='font-medium'>時価総額</p>
          <p className='text-lg'>
            {analysis.marketCap ? `${analysis.marketCap.toLocaleString()}円` : '情報なし'}
          </p>
        </div>
        <div>
          <p className='font-medium'>PER (株価収益率)</p>
          <p className='text-lg'>{analysis.per ? `${analysis.per}倍` : '情報なし'}</p>
        </div>
        <div>
          <p className='font-medium'>PBR (株価純資産倍率)</p>
          <p className='text-lg'>{analysis.pbr ? `${analysis.pbr}倍` : '情報なし'}</p>
        </div>
      </div>
    </div>
  )
}
