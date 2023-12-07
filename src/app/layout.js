import Link from 'next/link'
import './globals.css'
import { Control } from './Control';

export const metadata = {
  title: 'Next Tutorial',
  description: '넥스트JS를 배우는곳',
}

export default async function RootLayout({ children }) {

  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics',{ cache: 'no-store' });
  const topics = await resp.json();

  return (
    <html>
      <body>
        <h1><Link href='/'>WEB</Link></h1>
        <ol>
          {
            topics.map((e)=>{
              return <li key={e.id} ><Link href={`/read/${e.id}`}>{e.title}</Link></li>
            })
          }
        </ol>
        {children}
        <Control/>
      </body>
    </html>
  )
}
