import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg fill={'none'} height={6} ref={ref} width={8} xmlns={'http://www.w3.org/2000/svg'} {...props}>
    <path d={'M4 6 .536 1.5h6.928L4 6Z'} fill={'#fff'} />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const ArrowDown = memo(ForwardRef)
