import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToId } from './lib/enquiry'

/**
 * Restores scroll position to top on every client-side route change.
 * When a hash is present, scrolls to that section (retries for lazy routes).
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      if (!id) return undefined
      return scrollToId(id, { behavior: 'smooth', block: 'start' })
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}

export default ScrollToTop
