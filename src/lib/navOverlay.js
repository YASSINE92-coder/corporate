/**
 * Contract between the page heroes and the navbar.
 *
 * The navbar sits transparent over the top of a page and used to assume there was
 * always a dark hero behind it, so it painted its links white unconditionally.
 * That is invisible on a page that opens on the light background (/privacy), and
 * the failure only shows in the light theme.
 *
 * So heroes with a dark backdrop opt in by spreading {@link darkHeroProps} onto
 * their root element, and the navbar looks for {@link DARK_HERO_SELECTOR} to
 * decide whether white chrome is safe. A page that says nothing gets the normal
 * foreground colours — the readable default.
 */
export const DARK_HERO_ATTRIBUTE = "data-nav-overlay"

export const DARK_HERO_SELECTOR = `[${DARK_HERO_ATTRIBUTE}="dark"]`

/** Spread onto a hero whose backdrop is dark enough for white nav chrome. */
export const darkHeroProps = { [DARK_HERO_ATTRIBUTE]: "dark" }
