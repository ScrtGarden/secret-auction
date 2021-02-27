import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width="1rem"
      height="1rem"
      {...props}
    >
      <path
        d="M544 464v32a16 16 0 01-16 16H112a16 16 0 01-16-16v-32a16 16 0 0116-16h416a16 16 0 0116 16z"
        opacity={0.4}
      />
      <path
        d="M640 176a48 48 0 01-48 48 49 49 0 01-7.7-.8L512 416H128L55.7 223.2a49 49 0 01-7.7.8 48.36 48.36 0 1143.7-28.2l72.3 43.4a32 32 0 0044.2-11.6L289.7 85a48 48 0 1160.6 0l81.5 142.6a32 32 0 0044.2 11.6l72.4-43.4A47 47 0 01544 176a48 48 0 0196 0z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
