import '@/styles/globals.css'
import 'antd/dist/reset.css';

import Link from 'next/link'
export default function App({ Component, pageProps }) {

  return (
    <>
      <div>
        <div style={{ display: "flex", gap: 20, padding: "1rem", textDecoration: "none", borderBottom: "1px solid #ccc" }}>
          <Link href="/" className='nav__link'>Posts</Link>
          <Link href="/users" className='nav__link'>Users</Link>
        </div>
      </div>

      <Component {...pageProps} />
    </>
  )
}
