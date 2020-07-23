import React from 'react'
import styled from 'styled-components'

const DigitContainer = styled.div`
  text-align: center;
`

const Digit = styled.span`
  margin: 1px;
  padding: 2px 4px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(10, 10, 10, 1) 50%,
    rgba(19, 19, 19, 1) 50%,
    rgba(32, 32, 32, 1) 100%
  );
`

const VisitCounter = ({ visitCount }) => {
  const paddingZeros = '0'.repeat(6 - visitCount.toString().length)
  const visitCountText = `${paddingZeros}${visitCount}`

  return (
    <DigitContainer>
      {visitCountText.split('').map(c => (
        <Digit>{c}</Digit>
      ))}
    </DigitContainer>
  )
}

export default VisitCounter
