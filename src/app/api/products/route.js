import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await prisma.products.findMany()

    if (products) {
      return NextResponse.json({ products })
    } else {
      return NextResponse.json({ message: 'user is not registered' })
    }
  } catch {
    return NextResponse.json({ message: 'server failed' })
  }
}

export async function POST(req) {
  return await createProduct({ req })
}

async function createProduct({ req }) {
  try {
    const { userId, name, links, images, description } = await req.json()

    const exists = await prisma.products.findMany({
      where: {
        name
      }
    })

    if (exists.length >= 1) {
      return NextResponse.json(
        { error: 'Product already exists' },
        { status: 400 }
      )
    } else {
      const product = await prisma.products.create({
        data: {
          user_id: userId,
          name,
          links,
          images,
          description
        }
      })

      // return NextResponse.json(user)
      return NextResponse.json({ message: 'Success', product }, { status: 200 })
    }
  } catch (error) {
    console.error(error)
    if (error.errno === 1062) {
      return NextResponse.json({
        message: 'Product already created'
      })
    }
    return NextResponse.json({
      message: 'There was a problem creating the product.' + error
    })
  }
}
