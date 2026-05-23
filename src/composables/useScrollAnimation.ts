import { onMounted, onUnmounted } from 'vue'

interface ScrollOptions {
  rootMargin?: string
  threshold?: number
}

export function useScrollAnimation(options: ScrollOptions = {}) {
  const {
    rootMargin = '-60px 0px',
    threshold = 0.15,
  } = options

  let observer: IntersectionObserver | null = null
  let observed = new WeakSet<Element>()

  const setupObserver = () => {
    if (!('IntersectionObserver' in window)) return

    observer?.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            entry.target.classList.remove('animate-hidden')
            observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold }
    )

    observed = new WeakSet()

    document.querySelectorAll('.animate-scroll').forEach((el) => {
      if (!observed.has(el)) {
        observed.add(el)
        observer?.observe(el)
      }
    })
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return {
    refresh: setupObserver,
  }
}

export function refreshScrollAnimation() {
  requestAnimationFrame(() => {
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
}
