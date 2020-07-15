import React from 'react'

const VisitCounter = ({ visitCount }) => (
  <div>{'0'.repeat(6 - visitCount.toString().length) + visitCount}</div>
)

export default VisitCounter
