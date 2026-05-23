import { onMounted, onUnmounted, ref } from 'vue'

interface ScrollOptions {
  rootMargin?: string
  threshold?: number
}

export function useScrollAnimation(options: ScrollOptions = {}) {
  const {
    rootMargin = '-60px 0px',
    threshold = 0.15,
  } = options

  const isSupported = ref(false)
  let observer: IntersectionObserver | null = null
  let observed = new WeakSet<Element>()

  const setupObserver = () => {
    if (!import.meta.client) return
    if (!('IntersectionObserver' in window)) {
      isSupported.value = false
      return
    }

    isSupported.value = true

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
    isSupported,
    refresh: setupObserver,
  }
}
