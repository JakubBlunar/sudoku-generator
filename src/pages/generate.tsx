import type { GetServerSideProps } from 'next'

/**
 * Legacy URL — the generator page now previews AND prints in one place.
 */
export default function Generate() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/generator',
    permanent: false
  }
})
