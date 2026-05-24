import { onMounted, onUnmounted } from 'vue'

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

const refreshManagedObserver = (options: Required<ScrollOptions>) => {
  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.animate-scroll')
      .forEach((el) => el.classList.add('animate-visible'))
    return
  }

  sharedObserver?.disconnect()
  sharedObserver = createObserver(options)

  document.querySelectorAll('.animate-scroll:not(.animate-visible)').forEach((el) => {
    sharedObserver?.observe(el)
  })
}

const disconnectManagedObserver = () => {
  sharedObserver?.disconnect()
  sharedObserver = null
}

export function useScrollAnimation(options: ScrollOptions = {}) {
  const observerOptions = {
    rootMargin: options.rootMargin ?? '-60px 0px',
    threshold: options.threshold ?? 0.15,
  }

  const setupObserver = () => {
    refreshManagedObserver(observerOptions)
  }

  onMounted(() => {
    setupObserver()
  })

  onUnmounted(() => {
    disconnectManagedObserver()
  })

  return {
    refresh: setupObserver,
  }
}

export function refreshScrollAnimation() {
  requestAnimationFrame(() => {
    refreshManagedObserver({
      rootMargin: '-60px 0px',
      threshold: 0.15,
    })
  })
}
