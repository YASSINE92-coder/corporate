# Image credits, licences and provenance

Audit trail for every photograph shipped in `public/images`. Machine-readable
counterparts live in the `provenance` field of each entry in
[`src/lib/images.js`](../src/lib/images.js).

**Nothing gets added to this site without a row in this table.** If you cannot
state the source and licence, the image does not ship.

---

## The two rights in every photo of a person

A licence to use a photograph and permission from the person *in* the
photograph are separate things, and free stock only ever grants the first:

| Source | Copyright cleared | Model release |
| --- | --- | --- |
| Unsplash / Pexels | yes | **no** |
| Adobe Stock / Getty / iStock | yes | yes, signed, usually with indemnity |
| Commissioned shoot | yes (assign it in the contract) | yes, you collect them |

This site resolves that gap by being **people-free**: no model release is
needed where there is no model. The single exception is Fatiha's own portrait,
which she has given permission for.

## Hard rules

FM Education Services sells safeguarding and SEND consultancy to UK schools,
which makes imagery of people materially riskier here than on a typical
corporate site.

1. **No recognisable children, ever.** An identifiable child's photo is
   personal data under UK GDPR with heightened protection, and school
   parental consent cannot be inherited by a third party. No licence cures it.
2. **No people depicted in connection with safeguarding, abuse, SEND or
   disability.** Standard stock licences contain a sensitive-use clause that
   prohibits exactly this — so a fully released, correctly licensed photo can
   *still* breach its licence in a safeguarding context.
3. **`identifiablePeople: true` requires `releaseOnFile: true`.**
4. **Alt text describes, it does not claim.** It must never assert that the
   people or session shown are real FM Education clients, staff or
   engagements. That is a misleading-advertising exposure under the UK CAP
   Code, entirely separate from copyright.
5. **No AI-generated or CGI-rendered people or places.** Purely
   machine-generated output attracts no copyright, models can echo real
   likenesses, and for a safeguarding client the reputational cost is fatal.

---

## Current inventory

Every image is people-free apart from Fatiha's portrait. No image on the site
shows a recognisable face without permission, and none shows a child.

### Licensed under the Unsplash Licence

Free, irrevocable, worldwide commercial use, no attribution required. Credited
here regardless. Photo pages are `unsplash.com/photos/<id>`. All downloaded
**2026-08-03**.

| Slot | File | Photo id | Photographer | Shows |
| --- | --- | --- | --- | --- |
| `homeHero` | `hero/home-hero.jpg` | `dFohf_GUZJ0` | 2y.kang | Sunlight across empty wooden desks in a classroom |
| `aboutHero` | `about/about-hero.jpg` | `bV5dFLEYecM` | Craig Lovelidge | Empty meeting room, long table, teal wall |
| `contactHero` | `contact/contact-hero.jpg` | `B74lBYC3PXI` | Caroline Badran | Wood-and-glass meeting room in a quiet office |
| `serviceSafeguarding` | `services/safeguarding.jpg` | `rkH8YVmjQ4w` | Allen Y | Rows of empty desk chairs in a bright classroom |
| `overviewImage` | `content/overview.jpg` | `xTmez98cqAM` | Caroline Badran | Calm office, white desks, framed prints, plant |
| `visionImage` | `content/vision.jpg` | `VL71uk4thVY` | Zoshua Colah | Library aisle lined with shelves of books |
| `contentImpact` | `content/impact.jpg` | `n9AaeihA9HI` | Clay Banks | Open notebook, pen and two pencils on a desk |

### Cleared — the one permitted face

`about/director.jpg` is a genuine photograph of Fatiha Maitland, taken and
published with her permission and validation (confirmed by the client). It is
the single image on this site that may show a recognisable face and be
captioned with a real person's name.

A stale `TODO` in `src/lib/images.js` previously claimed this file was a
placeholder awaiting her real headshot. It was not, and that comment has been
removed — it caused a review to wrongly flag the image for deletion.

### Legacy — people-free, but licence still unverified

These predate provenance tracking. An audit found no record of their origin
anywhere in the repository (no reference to Unsplash, Pexels, Getty, iStock,
Shutterstock or Pixabay in the tree). None contains a recognisable face, so
the model-release exposure is nil and they are safe to keep serving — but the
copyright position is unproven and they should be replaced or their origin
reconstructed.

| Slot(s) | File | Shows |
| --- | --- | --- |
| `servicesHero` | `services/services-hero.jpg` | Hands writing at a sunlit meeting table, faces cropped out |
| `missionImage` | `content/mission.jpg` | Same photograph, tighter crop |
| `serviceSend` | `services/send.jpg` | Apple and alphabet blocks on a stack of books |
| `serviceSchoolImprovement` | `services/school-improvement.jpg` | Figure between library shelves, from behind |
| `contentLeadership` | `content/leadership.jpg` | Empty classroom, desks facing a chalkboard |

### Removed — must not return

| Former file | Why |
| --- | --- |
| Homepage hero (children) | Classroom of children with recognisable faces, used as the homepage hero. Breaks rule 1. |
| Safeguarding card (children) | Classroom of children with recognisable faces, captioned as safeguarding. Breaks rules 1 and 2 simultaneously — the worst image on the site. |
| Café group (adults) | Three recognisable adults, no release, captioned as "education consultants". Formerly `about-hero.jpg` and `overview.jpg`. |
| Library group (adults) | Four recognisable adults, no release, captioned as "school leaders". Formerly `contact-hero.jpg` and `vision.jpg`. |

All four were replaced in place — the filenames now hold the licensed
replacements above. Recover the originals from git history only to verify this
record, never to re-publish.

---

## Sourcing new images: what to watch for

Learned the hard way while sourcing the seven above. Roughly two thirds of
first-pick candidates were unusable, every one for a reason that is invisible
from a search-result title:

- **Unsplash+ is not the Unsplash Licence.** If the CDN host is
  `plus.unsplash.com/premium_photo-…` it is **paid subscription** content and
  must not be used. Only `images.unsplash.com/photo-…` is the free licence.
  Check the hostname every time; several document, folder and library-interior
  searches return almost nothing but premium.
- **Never trust a stated orientation.** Measure the downloaded file. Multiple
  candidates described as landscape were tall portraits, useless in a 3:2 slot.
- **Open the image before shipping it.** Candidates that read fine as text
  were, on inspection: a derelict attic with a single decaying chair (offered
  for the *safeguarding* card), a bank branch with legible foreign-language
  marketing signage and a poster of a child, a cluttered student desk with
  readable textbooks, and a CGI render with a furniture brand mark on it.
- **Watch for incidental third parties**: brand logos, trademarked character
  toys, legible signage, and artwork. Fine incidentally in an editorial
  interior; not fine as the subject.
- **Watch geography.** A photogenic school ringed by Tokyo skyscrapers is
  wrong for a consultancy selling into UK, UAE, GCC and BSO settings.

## Recording a new image

1. Add the file and run `npm run images` to generate AVIF/WebP/JPEG variants.
   The optimiser skips derivatives newer than their source, so overwriting a
   source in place is enough to force a rebuild.
2. Add the entry to `src/lib/images.js` with real pixel dimensions — `width`
   and `height` drive aspect-ratio reservation, so wrong values cause layout
   shift. Measure them; do not trust the previous entry.
3. Fill in `provenance` completely. `UNVERIFIED` is only acceptable for the
   legacy files listed above, never for a new one.
4. Add a row to the table here, and file the licence certificate or written
   permission somewhere durable — not just in this repo.
