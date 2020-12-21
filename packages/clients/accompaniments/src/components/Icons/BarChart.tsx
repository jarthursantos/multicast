import React from 'react'

const MdBarChart: React.VFC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg height={24} viewBox="0 0 24 24" width={24} {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </svg>
  )
}

export { MdBarChart }
