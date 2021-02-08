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
        d="M263.36 347.8L136.3 391.441c-8.753 3.007-18.05-.694-21.269-8.467l-8.742-21.108-64.11 26.555a15.998 15.998 0 01-20.902-8.66L1.22 331.34a16.007 16.007 0 018.664-20.904l64.101-26.555-8.742-21.109c-3.219-7.773.738-16.965 9.055-21.03L380.422 92.135l78.125 188.62-66.602 22.877a71.98 71.98 0 00-143.96.37 71.086 71.086 0 0015.374 43.798z"
        opacity={0.4}
      />
      <path
        d="M638.777 216.83L553.063 9.883a15.998 15.998 0 00-20.903-8.66L414.844 49.819a15.996 15.996 0 00-8.656 20.904l85.71 206.95a16.003 16.003 0 0020.907 8.66l117.312-48.598a15.998 15.998 0 008.66-20.904zM376.133 348.509A71.275 71.275 0 00391.984 304a72 72 0 00-144 0 71.279 71.279 0 0015.871 44.535L216.391 490.94A16 16 0 00231.57 512h16.859a16.004 16.004 0 0015.18-10.941l42.163-126.496a71.05 71.05 0 0028.45-.002l42.168 126.498A16 16 0 00391.57 512h16.859a16 16 0 0015.18-21.06zM319.984 328a24 24 0 1124-24 24.036 24.036 0 01-24 24z"
        className="prefix__fa-primary"
      />
    </svg>
  )
}

export default SvgComponent
