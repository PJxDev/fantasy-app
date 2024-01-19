import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req, ctx) {
  return await getProduct({ id: parseInt(ctx.params.id) })
}
export async function PUT(req, ctx) {
  return await updateProduct({ id: parseInt(ctx.params.id), req })
}
export async function DELETE(req, ctx) {
  return await deleteProduct({ id: parseInt(ctx.params.id) })
}

async function getProduct({ id }) {
  try {
    const exists = await prisma.products.findUnique({
      where: {
        id
      }
    })

    if (exists) {
      return NextResponse.json({ message: 'Success', exists }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Product don't exists" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'There was a problem searching the product.' + error
    })
  }
}

async function updateProduct({ id, req }) {
  try {
    const { userId, title: name, links, images, description } = await req.json()

    const exists = await prisma.products.findUnique({
      where: {
        id
      }
    })

    if (exists) {
      const product = await prisma.products.update({
        where: {
          id
        },
        data: {
          id,
          user_id: userId,
          name,
          links,
          images,
          description
        }
      })
      return NextResponse.json({ message: 'Success', product }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Product don't exists" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'There was a problem updating the product. ' + error
    })
  }
}

async function deleteProduct({ id }) {
  try {
    const exists = await prisma.products.findUnique({
      where: {
        id
      }
    })

    if (exists) {
      const exists = await prisma.products.delete({
        where: {
          id
        }
      })
      return NextResponse.json({ message: 'Success' }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Product don't exists" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      message: 'There was a problem deleting the product.' + error
    })
  }
}
