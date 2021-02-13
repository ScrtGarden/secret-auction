import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1rem"
      viewBox="-61 -21 682 682.667"
      width="1rem"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M502.426 62.633l-8.016-13.367a18.745 18.745 0 00-19.25-8.828 18.738 18.738 0 00-15.2 14.738l-4.89 24.047c-12.32-15.778-27.125-29.567-43.867-40.727L388.32 23.238c-7.441-4.965-17.343-3.984-23.66 2.34l-31.133 31.125c-21.933-26.32-41.62-49.953-41.62-49.953C288.34 2.469 283.066 0 277.5 0s-10.844 2.469-14.402 6.75l-41.633 49.953-31.121-31.125a18.748 18.748 0 00-23.664-2.344l-22.887 15.262c-16.742 11.156-31.543 24.95-43.86 40.727l-4.898-24.047a18.747 18.747 0 00-15.2-14.742 18.77 18.77 0 00-19.25 8.832l-8.01 13.359a385.394 385.394 0 00-54.907 198.25v99.313c0 74.742 29.105 145.011 81.957 197.859C132.473 610.895 202.738 640 277.5 640h.02c74.742 0 145.003-29.105 197.851-81.953 52.852-52.848 81.957-123.117 81.957-197.86v-99.312a385.38 385.38 0 00-54.902-198.242zm-122.121.332l10.097 6.73a150.677 150.677 0 0150.938 57.586c-7.727 17.95-18.297 34.492-31.422 49.156-12.121-33.085-29.672-63.601-52.285-90.804zM277.496 48.043c13.297 15.95 33.563 40.277 51.09 61.309 21.684 26.02 38.098 55.488 48.793 87.578l2.683 8.066-17.07 15.582c-38.906 35.52-68.05 79.89-85.492 128.633-17.445-48.742-46.59-93.113-85.496-128.633l-17.07-15.582 2.683-8.062c10.703-32.114 27.121-61.582 48.793-87.59zM164.602 69.695l10.09-6.73 22.671 22.668c-22.601 27.187-40.156 57.695-52.281 90.805-13.129-14.665-23.7-31.208-31.418-49.157a150.58 150.58 0 0150.938-57.586zM35.168 360.188v-99.313c0-51.68 11.523-102.59 33.543-149.035 10.844 40.68 32.855 76.957 64.18 105.558l33.828 30.875c58.488 53.391 92.031 129.438 92.031 208.637v144.871C133.86 592.188 35.168 487.496 35.168 360.188zm484.66 0c0 127.308-98.672 232-223.578 241.593v-144.87c0-79.2 33.54-155.247 92.027-208.638l33.832-30.882c31.32-28.594 53.332-64.868 64.18-105.551a347.9 347.9 0 0133.54 149.035zm0 0" />
    </svg>
  )
}

export default SvgComponent