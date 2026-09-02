import _ from 'lodash'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import { GeneratedGame } from '../containers/GeneratedGame'
import { SudokuProvider } from '../context/SudokuContext'
import { isSSR } from '../utils'

const Generate = () => {
  const router = useRouter()

  const params = router.query || {}

  const count = params.count ? Number(params.count) : 24
  const initCells = params.initCells ? Number(params.initCells) : undefined

  const chunks = _.chunk(
    _.times(count, x => x),
    6
  )

  useEffect(() => {
    if (isSSR() || !params.print) return
    setTimeout(window.print, 400)
  }, [])

  return (
    <>
      <Head>
        <meta name="robots" content="no-index" />
      </Head>
      {_.map(chunks, (chunk, i) => (
        <div
          key={`page-${i}`}
          className="page-break"
          style={{ width: '1024px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}
        >
          {_.map(chunk, x => (
            <SudokuProvider key={x}>
              <GeneratedGame initCells={initCells} />
            </SudokuProvider>
          ))}
        </div>
      ))}
    </>
  )
}

export default Generate
