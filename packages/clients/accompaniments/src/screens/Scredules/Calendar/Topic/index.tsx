import React from 'react'

import { WORKING_HOURS } from '../index'
import { Hour } from './Hour'
import { Wrapper } from './styles'

const Topic: React.FC = () => {
  return (
    <Wrapper>
      {WORKING_HOURS.map(hour => (
        <Hour key={hour} />
      ))}

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          bottom: '10%',
          margin: 4,
          border: 'none',
          borderRadius: 4,
          color: 'white',
          padding: 8,
          backgroundColor: 'rgba(255, 0, 0, 0.8)'
        }}
      >
        Opa
      </div>
    </Wrapper>
  )
}

export { Topic }
