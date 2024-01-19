import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, ctx) {
  return await getCarta({ id: parseInt(ctx.params.id) })
}

async function getCarta({ id }) {
  try {
    const exists = await prisma.products.findMany({
      where: {
        user_id: id
      }
    })

    if (exists && exists.length > 0) {
      return NextResponse.json(exists)
    } else {
      return NextResponse.json({ error: 'carta is empty' }, { status: 400 })
    }
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'There was a problem searching for the carta' + error
    })
  }
}
