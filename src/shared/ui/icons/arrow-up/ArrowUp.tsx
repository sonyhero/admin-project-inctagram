import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={6} ref={ref} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path d={'M4 0 L7.464 4.5 H0.536 L4 0 Z'} fill={'#fff'} />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ArrowUp = memo(ForwardRef)
