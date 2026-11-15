// `sizes` hints for the images each page opens with. They are shared by the
// components that render those images and by the build step that preloads
// them (scripts/route-metadata-plugin.mjs). Both sides must use the same
// string, or the browser preloads one file and then renders another.

// Hero portrait: a 96px thumbnail on phones, a 340px card on wider screens.
export const portraitSizes = '(max-width: 760px) 96px, 340px';

// Case-study tiles on the Work page: one, two or four across.
export const studyTileSizes = '(max-width: 640px) calc(100vw - 2rem), (max-width: 1100px) 46vw, 280px';

// The large screenshot at the top of a case study.
export const caseStudyHeroSizes = '(max-width: 1200px) calc(100vw - 2rem), 1160px';
