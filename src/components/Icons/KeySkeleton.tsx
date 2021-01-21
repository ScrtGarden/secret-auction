import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M251.31 372.91a16 16 0 010 22.63l-15.77 15.77a16 16 0 01-22.62 0L176 374.4l-30.87 30.86 36.11 36.11a16 16 0 010 22.63l-43.16 43.17a16 16 0 01-22.62 0l-36.12-36.11-36.26 36.25a16 16 0 01-22.62 0L4.69 491.54a16 16 0 010-22.63l255.12-255.12a64.18 64.18 0 0038.4 38.4L214.4 336l36.91 36.91z"
        opacity={0.4}
      />
      <path
        d="M448 0H320a64 64 0 00-64 64v128a64 64 0 0064 64h128a64 64 0 0064-64V64a64 64 0 00-64-64zm-73.37 182.63a32 32 0 110-45.25 32 32 0 010 45.25zm64-64a32 32 0 110-45.25 32 32 0 010 45.25z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
