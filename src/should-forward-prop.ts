import isPropValid from '@emotion/is-prop-valid'

// styled-components 6 no longer hides unknown props from the DOM, which makes
// React 19 warn on camelCase props like `maxWidth`, `visible`, `characterMap`.
// Forward only props that are valid HTML/react attributes.
export const shouldForwardProp = (prop: string) => isPropValid(prop)
