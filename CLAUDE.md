## How we build (house standard — applies to everything in this repo)

- **Best possible standard, never quickest possible solution.** If the polished version takes
  longer, take longer. Runtime speed is the exception: what ships must feel instant.
- **Innovate, don't just execute.** Treat the stated idea as a launchpad. Propose and build the
  stronger pattern when you see one; push back when a request would ship something cheaper-feeling.
- **One section at a time, to a high finish.** No thin scaffolds of everything. Research how
  best-in-class products do it, plan briefly, then build card-by-card.
- **Install what makes it better.** If a package elevates the result (e.g. `motion` for animation,
  proper chart/interaction libraries), add it and wire it properly — never hand-roll a worse
  version to avoid a dependency. Only guardrail: don't tank runtime performance.
- **Blocked ≠ improvise.** Missing an API key, credential, access, or decision? Stop and ask the
  user. Never silently work around a blocker with mock behavior presented as done.
- **Motion and polish are first-class.** Entrances, transitions, hover feedback — alive and
  intentional, never static, never abrupt.
- **Verify before declaring done.** Typecheck + lint + open it and exercise the change. Report
  what you verified, honestly, including what you didn't.