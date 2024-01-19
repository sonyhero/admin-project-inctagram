import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'#ffffff'}
    height={24}
    ref={ref}
    viewBox={'0 0 32.00 32.00'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
    stroke={'#ffffff'}
    strokeWidth={'0.00032'}
  >
    <g id={'SVGRepo_bgCarrier'} strokeWidth={'0'}></g>
    <g
      id={'SVGRepo_tracerCarrier'}
      stroke={'#CCCCCC'}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeWidth={'0.064'}
    ></g>
    <g id={'SVGRepo_iconCarrier'}>
      <g data-name={'Group 30'} id={'Group_30'} transform={'translate(-310.001 -321.695)'}>
        <path
          d={
            'M326,321.7a16,16,0,1,0,16,16A16,16,0,0,0,326,321.7Zm0,28a12,12,0,1,1,12-12A12,12,0,0,1,326,349.7Z'
          }
          data-name={'Path 364'}
          id={'Path_364'}
        ></path>
        <rect
          data-name={'Rectangle 41'}
          height={'4'}
          id={'Rectangle_41'}
          transform={'translate(314.348 346.523) rotate(-45.001)'}
          width={'28.969'}
        ></rect>
      </g>
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const BanIcon = memo(ForwardRef)
