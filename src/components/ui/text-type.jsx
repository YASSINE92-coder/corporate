import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap"
import { useReducedMotion } from "framer-motion"
import { cn } from "../../lib/utils"

/**
 * React Bits "Text Type" (reactbits.dev), rewritten for this project:
 * relative `cn` import + Tailwind classes instead of the separate
 * TextType.css file, plain JSX instead of `createElement`, and a
 * prefers-reduced-motion guard (the source has none) — reduced-motion users
 * see the final text immediately, with no typing/deleting loop or blinking
 * cursor.
 *
 * The animated characters are marked `aria-hidden` since the visible text
 * content is genuinely partial mid-animation (unlike a CSS/transform-only
 * reveal). When used for real content (not decorative filler), pass
 * `aria-label` with the full string so assistive tech always gets the
 * complete text regardless of typing progress.
 */
export function TextType({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const cursorRef = useRef(null)
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "inherit"
    return textColors[currentTextIndex % textColors.length]
  }

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (!showCursor || !cursorRef.current || prefersReducedMotion) return
    gsap.set(cursorRef.current, { opacity: 1 })
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [showCursor, cursorBlinkDuration, prefersReducedMotion])

  useEffect(() => {
    if (!isVisible) return undefined

    if (prefersReducedMotion) {
      setDisplayedText(textArray[textArray.length - 1] ?? "")
      return undefined
    }

    let timeout
    const currentText = textArray[currentTextIndex]
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return
          }

          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex)

          setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
          timeout = setTimeout(() => {}, pauseDuration)
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1))
          }, deletingSpeed)
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(
          () => {
            setDisplayedText((prev) => prev + processedText[currentCharIndex])
            setCurrentCharIndex((prev) => prev + 1)
          },
          variableSpeed ? getRandomSpeed() : typingSpeed
        )
      } else if (textArray.length >= 1) {
        if (!loop && currentTextIndex === textArray.length - 1) return
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeTypingAnimation, initialDelay)
    } else {
      executeTypingAnimation()
    }

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    prefersReducedMotion,
  ])

  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < (textArray[currentTextIndex]?.length ?? 0) || isDeleting)

  return (
    <Component ref={containerRef} className={cn("inline-block whitespace-pre-wrap", className)} {...props}>
      <span aria-hidden="true" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>
      {showCursor && !prefersReducedMotion ? (
        <span
          ref={cursorRef}
          aria-hidden="true"
          className={cn("ms-1 inline-block", shouldHideCursor && "hidden", cursorClassName)}
        >
          {cursorCharacter}
        </span>
      ) : null}
    </Component>
  )
}
