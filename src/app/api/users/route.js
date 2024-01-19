import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.users.findMany()

    if (users.length > 1) {
      return NextResponse.json({ users: users })
    } else {
      return NextResponse.json({ message: "there's not users yet registered" })
    }
  } catch {
    return NextResponse.json({ message: 'server failed' })
  }
}
