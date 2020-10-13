import { container } from 'promptu'
import React, { PropsWithChildren, ReactElement } from 'react'
import styled from 'styled-components'

type Props = PropsWithChildren<{
  className?: string
}>

function Monogram({ className }: Props): ReactElement {
  return (
    <StyledRoot className={className}>
      <svg viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' xmlSpace='preserve' style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
        <g transform='matrix(0.565118,0,0,0.565118,33.9086,-0.000457761)'>
          <path id='bottom-right-shadow' d='M786.007,679.006L392.567,906.006L392.567,452.005L786.007,679.006Z' style={{ fill: 'rgb(23,23,23)', fillRule: 'nonzero' }}/>
          <path id='bottom-right' d='M713.945,720.581L392.566,906.004L392.567,452.007L713.945,720.581Z' style={{ fill: 'rgb(27,27,27)', fillRule: 'nonzero' }}/>
          <path id='mid-right' d='M392.672,452.936L785.987,679.858L785.987,226.013L392.672,452.936Z' style={{ fill: 'rgb(43,43,43)', fillRule: 'nonzero' }}/>
          <path id='top-right-shadow' d='M785.882,227.017L392.568,454.033L392.568,0.001L785.882,227.017Z' style={{ fill: 'rgb(66,18,121)', fillRule: 'nonzero' }}/>
          <path id='top-right' d='M713.93,268.546L392.566,454.032L392.568,0.001L713.93,268.546Z' style={{ fill: 'rgb(90,26,163)', fillRule: 'nonzero' }}/>
          <path id='bottom-left-shadow' d='M-0.007,679.006L392.995,906.006L392.995,452.005L-0.007,679.006Z' style={{ fill: 'rgb(27,27,27)', fillRule: 'nonzero' }}/>
          <path id='bottom-left' d='M71.758,720.456L392.997,906.004L392.995,452.007L71.758,720.456Z' style={{ fill: 'rgb(38,38,38)', fillRule: 'nonzero' }}/>
          <path id='mid-left' d='M392.89,453.071L0.013,679.993L0.013,226.149L392.89,453.071Z' style={{ fill: 'rgb(44,44,44)', fillRule: 'nonzero' }}/>
          <path id='top-left-shadow' d='M0.118,227.017L392.995,454.033L392.995,0.001L0.118,227.017Z' style={{ fill: 'rgb(88,26,158)', fillRule: 'nonzero' }}/>
          <path id='top-left' d='M71.72,267.734L392.996,454.032L392.995,0.001L71.72,267.734Z' style={{ fill: 'rgb(125,36,226)', fillRule: 'nonzero' }}/>
        </g>
      </svg>
    </StyledRoot>
  )
}

export default Monogram

const StyledRoot = styled.figure`
  ${container.fhcc}
  margin: 0;
  padding: 0;
  height: 100%;
  width: auto;
  transform-origin: center;

  > svg {
    height: 100%;
    width: auto;
  }
`
