import { onMounted } from 'vue'

interface ScrollOptions {
  rootMargin?: string
  threshold?: number
}

let sharedObserver: IntersectionObserver | null = null

const createObserver = (options: Required<ScrollOptions>) =>
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible')
        entry.target.classList.remove('animate-hidden')
        sharedObserver?.unobserve(entry.target)
      }
    })
  }, options)

const getOrCreateObserver = (options: Required<ScrollOptions>) => {
  if (!sharedObserver) {
    sharedObserver = createObserver(options)
  }
  return sharedObserver
}

const observeNewElements = (options: Required<ScrollOptions>) => {
  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.animate-scroll')
      .forEach((el) => el.classList.add('animate-visible'))
    return
  }

  const observer = getOrCreateObserver(options)

  document.querySelectorAll('.animate-scroll:not(.animate-visible)').forEach((el) => {
    observer.observe(el)
  })
}

export function useScrollAnimation(options: ScrollOptions = {}) {
  const observerOptions = {
    rootMargin: options.rootMargin ?? '-60px 0px',
    threshold: options.threshold ?? 0.15,
  }

  const setupObserver = () => {
    observeNewElements(observerOptions)
  }

  onMounted(() => {
    setupObserver()
  })

  return {
    refresh: setupObserver,
  }
}

export function refreshScrollAnimation() {
  requestAnimationFrame(() => {
    observeNewElements({
      rootMargin: '-60px 0px',
      threshold: 0.15,
    })
  })
}
