export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    nextTick(() => {
      document.querySelectorAll('.animate-scroll:not(.animate-visible)').forEach((el) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible')
                observer.unobserve(entry.target)
              }
            })
          },
          { rootMargin: '-60px 0px', threshold: 0.15 }
        )
        observer.observe(el)
      })
    })
  })
})
