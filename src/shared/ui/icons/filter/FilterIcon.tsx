import * as React from 'react'
import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={12}
    ref={ref}
    width={8}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path d={'m4 0 3.464 4.5H.536L4 0ZM4 12 .536 7.5h6.928L4 12Z'} fill={'#4C4C4C'} />
  </svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const FilterIcon = memo(ForwardRef)
