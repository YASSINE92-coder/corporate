import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  /**
   * Content-based identity for the source text. Callers almost always pass an
   * inline array (`text={[t("hero.title")]}`), which is a fresh reference on
   * every render, so `textArray` can never be used as an effect dependency —
   * it would re-run the effect on every render. Joining on a character that
   * cannot appear in copy gives a value that only changes when the words do.
   */
  const textKey = useMemo(() => textArray.join("\u0000"), [textArray])

  /**
   * Restart typing whenever the source text actually changes — most visibly on
   * a language switch, where the locale lives in the URL and the page subtree
   * is deliberately NOT remounted (see `key={routePath}` in App.jsx).
   *
   * Without this reset the component keeps the finished state from the previous
   * text: `currentCharIndex` still sits at the old string's length, so the
   * typing branch (`currentCharIndex < processedText.length`) is false and, with
   * `loop={false}`, the effect returns early and the stale copy stays on screen
   * until a full reload. When the new string is longer it is worse — typing
   * resumes mid-word and appends the new tail onto the old text.
   *
   * Declared before the typing effect so that within a single commit the reset
   * is queued first.
   */
  useEffect(() => {
    setDisplayedText("")
    setCurrentCharIndex(0)
    setIsDeleting(false)
    setCurrentTextIndex(0)
  }, [textKey])

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

          // Advancing the indices re-runs this effect, which starts typing the
          // next sentence; the between-sentences pause already happened before
          // deleting began. (The React Bits source schedules a no-op timeout
          // here — dropped, it never did anything.)
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
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
    // `textKey`, not `textArray`: the latter is a new reference every render.
    textKey,
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
    <Component
      ref={containerRef}
      className={cn("inline-block whitespace-pre-wrap", className)}
      {...props}
    >
      <span aria-hidden="true" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>
      {showCursor && !prefersReducedMotion ? (
        <span
          aria-hidden="true"
          className={cn(
            "ms-1 inline-block animate-cursor-blink",
            shouldHideCursor && "hidden",
            cursorClassName
          )}
          // One CSS cycle fades out AND back in, so it lasts 2× the old GSAP
          // yoyo tween's one-way duration.
          style={{ animationDuration: `${cursorBlinkDuration * 2}s` }}
        >
          {cursorCharacter}
        </span>
      ) : null}
    </Component>
  )
}
