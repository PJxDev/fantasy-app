import { verify } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteCookie, getCookies } from 'cookies-next'

export async function GET() {
  const res = new NextResponse()
  const { tkn } = getCookies({ cookies })

  try {
    verify(tkn, process.env.PASS_SECRET)

    deleteCookie('tkn', { cookies })
    return NextResponse.json({ message: 'Logout con éxito' })
  } catch (error) {}
  if (!tkn) return NextResponse.json({ error: 'no token' }, { status: 401 })
}
