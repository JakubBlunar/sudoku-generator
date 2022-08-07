import { useState } from 'react'
import Router from 'next/router'
import { Helmet } from 'react-helmet'
import { Layout, ContentWrapper } from '../components/layout/Layout'
import styled from 'styled-components'
import { Button } from '../components/common/Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;

  label {
    font-weight: 600;
    font-size: 20px;

    span {
      margin-bottom: 8px;
      display: inline-block;
    }
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    font-size: 16px;
    padding: 5px;
  }
`

type NumberInputProps = {
  name: string
  value: string
  onChange: (val: string) => void
  label: string
  min: number
  max: number
}

const NumberInput = ({ label, name, onChange, value, min, max }: NumberInputProps) => (
  <label htmlFor="count">
    <span>{label}:</span>
    <input
      id={name}
      type="number"
      name={name}
      min={min}
      max={max}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    />
  </label>
)

const Generator = () => {
  const [count, setCount] = useState<string>('30')
  const [initCells, setInitCells] = useState<string>('35')

  return (
    <Layout>
      <Helmet>
        <title>Sudoku generator</title>
        <meta name="description" content="Generate free printable sudoku games" />
      </Helmet>
      <ContentWrapper>
        <StyledForm
          onSubmit={e => {
            e.preventDefault()
            Router.push({
              pathname: '/generate',
              query: { count: count || undefined, initCells: initCells || undefined, print: true }
            })
          }}
        >
          <NumberInput name="count" label="Number of games" onChange={setCount} value={count} min={1} max={200} />
          <NumberInput
            name="initCells"
            label="Number of initial cells"
            onChange={setInitCells}
            value={initCells}
            min={24}
            max={75}
          />
          <Button>Generate</Button>
        </StyledForm>
      </ContentWrapper>
    </Layout>
  )
}

export default Generator
