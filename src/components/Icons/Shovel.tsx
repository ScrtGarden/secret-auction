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
        d="M500.28 96.39l-84.67-84.68a40 40 0 00-56.56 0l-32.67 32.67a98.91 98.91 0 00-18.77 114.77L197.35 269.4l45.26 45.23 110.25-110.24a98.88 98.88 0 00114.75-18.76L500.28 153a40 40 0 000-56.57zm-77.91 44a35.89 35.89 0 01-50.75-50.75l15.7-15.7 50.75 50.75z"
        opacity={0.4}
      />
      <path
        d="M287.87 405.13L220 473c-50 50-181 45.3-203.66 22.65S-11 342 39 292l67.85-67.88a32 32 0 0145.25 0l135.77 135.76a32 32 0 010 45.25z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
