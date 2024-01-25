import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'#fff'}
    height={24}
    ref={ref}
    viewBox={'0 0 48 48'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g id={'SVGRepo_bgCarrier'} strokeWidth={'0'}></g>
    <g id={'SVGRepo_tracerCarrier'} strokeLinecap={'round'} strokeLinejoin={'round'}></g>
    <g id={'SVGRepo_iconCarrier'}>
      {' '}
      <path d={'M0 0h48v48H0z'} fill={'none'}></path>{' '}
      <g id={'Shopicon'}>
        {' '}
        <path
          d={
            'M10,22v2c0,7.72,6.28,14,14,14s14-6.28,14-14s-6.28-14-14-14h-6.662l3.474-4.298l-3.11-2.515L10.577,12l7.125,8.813 l3.11-2.515L17.338,14H24c5.514,0,10,4.486,10,10s-4.486,10-10,10s-10-4.486-10-10v-2H10z'
          }
        ></path>{' '}
      </g>{' '}
    </g>
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const UnBanIcon = memo(ForwardRef)
