<script setup lang='ts'>
import OrbitingCircles from './OrbitingCircles.vue'
</script>

<template>
  <div class="relative flex h-[500px] w-[300px] md:w-[600px] flex-col items-center justify-center overflow-hidden">
    <span
      class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black"
    >
      Circle
    </span>

    <OrbitingCircles class-name="size-[30px] border-none bg-transparent" :duration="20" :delay="10" :radius="70">
      <svg xmlns="http://www.w3.org/2000/svg" width="48.77" height="32" viewBox="0 0 256 168"><path fill="#00DC82" d="M143.618 167.029h95.166c3.023 0 5.992-.771 8.61-2.237a16.96 16.96 0 0 0 6.302-6.115a16.3 16.3 0 0 0 2.304-8.352c0-2.932-.799-5.811-2.312-8.35L189.778 34.6a16.97 16.97 0 0 0-6.301-6.113a17.6 17.6 0 0 0-8.608-2.238c-3.023 0-5.991.772-8.609 2.238a16.96 16.96 0 0 0-6.3 6.113l-16.342 27.473l-31.95-53.724a17 17 0 0 0-6.304-6.112A17.64 17.64 0 0 0 96.754 0c-3.022 0-5.992.772-8.61 2.237a17 17 0 0 0-6.303 6.112L2.31 141.975a16.3 16.3 0 0 0-2.31 8.35c0 2.932.793 5.813 2.304 8.352a16.96 16.96 0 0 0 6.302 6.115a17.6 17.6 0 0 0 8.61 2.237h59.737c23.669 0 41.123-10.084 53.134-29.758l29.159-48.983l15.618-26.215l46.874 78.742h-62.492zm-67.64-26.24l-41.688-.01L96.782 35.796l31.181 52.492l-20.877 35.084c-7.976 12.765-17.037 17.416-31.107 17.416" /></svg>
    </OrbitingCircles>

    <OrbitingCircles class-name="size-[30px] border-none bg-transparent" :duration="20" :delay="10" :radius="100" reverse>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><g clip-path="url(#unjsNitro4)"><path fill="url(#unjsNitro1)" fill-rule="evenodd" d="M28.173 5.616C22.438-1.107 12.34-1.907 5.617 3.828s-7.524 15.834-1.789 22.557s15.834 7.523 22.557 1.788s7.523-15.834 1.788-22.557m-7.97 8.398c.616 0 1.01.668.7 1.202l-.089.153l-6.038 9.935a.62.62 0 0 1-.529.297h-.576a.604.604 0 0 1-.585-.755l1.638-6.335a.8.8 0 0 0-.774-1h-2.517a.8.8 0 0 1-.774-1l2.472-9.565a.74.74 0 0 1 .716-.544q.061 0 .107.002h2.535a.8.8 0 0 1 .793.908l-.016.114l-.966 5.653a.8.8 0 0 0 .788.935z" clip-rule="evenodd" /><path fill="url(#unjsNitro2)" fill-rule="evenodd" d="M28.173 5.616C22.438-1.107 12.34-1.907 5.617 3.828s-7.524 15.834-1.789 22.557s15.834 7.523 22.557 1.788s7.523-15.834 1.788-22.557m-7.97 8.398c.616 0 1.01.668.7 1.202l-.089.153l-6.038 9.935a.62.62 0 0 1-.529.297h-.576a.604.604 0 0 1-.585-.755l1.638-6.335a.8.8 0 0 0-.774-1h-2.517a.8.8 0 0 1-.774-1l2.472-9.565a.74.74 0 0 1 .716-.544q.061 0 .107.002h2.535a.8.8 0 0 1 .793.908l-.016.114l-.966 5.653a.8.8 0 0 0 .788.935z" clip-rule="evenodd" /><mask id="unjsNitro0" width="32" height="33" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="url(#unjsNitro3)" d="M16 32.001c8.837 0 16-7.163 16-16s-7.163-16-16-16s-16 7.163-16 16s7.163 16 16 16" /></mask><g filter="url(#unjsNitro5)" mask="url(#unjsNitro0)"><path fill="#fff" d="M.89 10.741a16 16 0 1 0 30.365.434l-4.652 1.471a11.12 11.12 0 1 1-21.106-.3z" /></g></g><defs><radialGradient id="unjsNitro1" cx="0" cy="0" r="1" gradientTransform="matrix(31.2006 0 0 318.168 3.2 16)" gradientUnits="userSpaceOnUse"><stop stop-color="#31B2F3" /><stop offset=".474" stop-color="#F27CEC" /><stop offset="1" stop-color="#FD6641" /></radialGradient><radialGradient id="unjsNitro2" cx="0" cy="0" r="1" gradientTransform="matrix(31.2006 0 0 318.168 3.2 16)" gradientUnits="userSpaceOnUse"><stop stop-color="#31B2F3" /><stop offset=".474" stop-color="#F27CEC" /><stop offset="1" stop-color="#FD6641" /></radialGradient><radialGradient id="unjsNitro3" cx="0" cy="0" r="1" gradientTransform="matrix(31.2 0 0 318.162 3.2 16.001)" gradientUnits="userSpaceOnUse"><stop stop-color="#F27CEC" /><stop offset=".484" stop-color="#31B2F3" /><stop offset="1" stop-color="#7D7573" /></radialGradient><clipPath id="unjsNitro4"><path fill="#fff" d="M0 0h32v32H0z" /></clipPath><filter id="unjsNitro5" width="52" height="41.26" x="-10" y=".741" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix" /><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur result="effect1_foregroundBlur_7_821" stdDeviation="5" /></filter></defs></g></svg>
    </OrbitingCircles>

    <OrbitingCircles class-name="size-[50px]" :radius="190" :duration="20" reverse>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128">
        <defs>
          <linearGradient
            id="deviconVitejs0" x1="6" x2="235" y1="33" y2="344"
            gradientTransform="translate(0 .937)scale(.3122)" gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#41d1ff" />
            <stop offset="1" stop-color="#bd34fe" />
          </linearGradient>
          <linearGradient
            id="deviconVitejs1" x1="194.651" x2="236.076" y1="8.818" y2="292.989"
            gradientTransform="translate(0 .937)scale(.3122)" gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#ffea83" />
            <stop offset=".083" stop-color="#ffdd35" />
            <stop offset="1" stop-color="#ffa800" />
          </linearGradient>
        </defs>
        <path
          fill="url(#deviconVitejs0)"
          d="M124.766 19.52L67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.1 3.1 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594m0 0"
        />
        <path
          fill="url(#deviconVitejs1)"
          d="M91.46 1.43L48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968l34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43m0 0"
        />
      </svg>
    </OrbitingCircles>

    <OrbitingCircles class-name="size-[50px]" :radius="145" :duration="20">
      <svg xmlns="http://www.w3.org/2000/svg" width="35.01" height="32" viewBox="0 0 256 234"><path fill="#FCC72B" d="m192.115 70.808l-61.2 88.488a5.27 5.27 0 0 1-2.673 2.002a5.3 5.3 0 0 1-3.343-.005a5.25 5.25 0 0 1-2.66-2.01a5.2 5.2 0 0 1-.903-3.203l2.45-48.854l-39.543-8.386a5.26 5.26 0 0 1-2.292-1.118a5.22 5.22 0 0 1-1.83-4.581a5.2 5.2 0 0 1 .895-2.383L142.218 2.27a5.28 5.28 0 0 1 6.016-1.996a5.24 5.24 0 0 1 2.66 2.01c.643.942.96 2.066.903 3.203l-2.45 48.855l39.542 8.386a5.26 5.26 0 0 1 2.293 1.117a5.21 5.21 0 0 1 1.829 4.582a5.2 5.2 0 0 1-.896 2.382" /><path fill="#729B1B" d="M128.025 233.537a12.36 12.36 0 0 1-8.763-3.63l-57.828-57.823a12.39 12.39 0 0 1 .023-17.5a12.394 12.394 0 0 1 17.5-.024l49.068 49.061L234.917 96.733a12.39 12.39 0 0 1 17.523 17.524l-115.655 115.65a12.34 12.34 0 0 1-8.76 3.63" /><path fill="#729B1B" fill-opacity=".5" d="M127.975 233.537a12.36 12.36 0 0 0 8.763-3.63l57.828-57.823a12.4 12.4 0 0 0 3.605-8.754a12.395 12.395 0 0 0-12.375-12.376a12.4 12.4 0 0 0-8.755 3.606l-49.066 49.061L21.082 96.733a12.392 12.392 0 0 0-17.524 17.524l115.656 115.65a12.35 12.35 0 0 0 8.76 3.63" /></svg>
    </OrbitingCircles>

    <OrbitingCircles class-name="size-[30px] border-none bg-transparent" :duration="40" :delay="10" :radius="45" reverse>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#41b883" d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6l3.22-5.6Z" /><path fill="#41b883" d="m2 3.925l14 24.15l14-24.15h-5.6L16 18.415L7.53 3.925Z" /><path fill="#35495e" d="M7.53 3.925L16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6Z" /></svg>
    </OrbitingCircles>
  </div>
</template>
