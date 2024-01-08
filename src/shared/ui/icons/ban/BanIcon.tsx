import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={17}
    ref={ref}
    width={12}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path d={'m1.043 16.362 10-15'} stroke={'#fff'} strokeWidth={2.3} />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const BanIcon = memo(ForwardRef)
