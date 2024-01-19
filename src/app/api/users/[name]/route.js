import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, ctx) {
  return await getUser({ nombre: ctx.params.name.toLowerCase() })
}

async function getUser({ nombre }) {
  try {
    const exists = await prisma.users.findFirst({
      where: {
        nombre
      }
    })

    if (exists) {
      return NextResponse.json(exists)
    } else {
      return NextResponse.json({ error: 'no user found' }, { status: 400 })
    }
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'There was a problem searching for the user' + error
    })
  }
}
