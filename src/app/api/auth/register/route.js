import bcrypt from 'bcrypt'
import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  return await createUser({ req })
}

async function createUser({ req }) {
  try {
    const { email, nombre, password } = await req.json()

    const exists = await prisma.users.findUnique({
      where: {
        email
      }
    })
    const exists2 = await prisma.users.findUnique({
      where: {
        nombre: nombre.toLowerCase()
      }
    })

    if (exists) {
      return NextResponse.json(
        { error: 'El e-mail ya se encuentra registrado' },
        { status: 400 }
      )
    } else if (exists2) {
      return NextResponse.json(
        {
          error:
            'El nombre ya se encuentra en uso. Por favor, elija otro nombre'
        },
        { status: 400 }
      )
    } else {
      const hashedPass = encryptPassword(password)

      const user = await prisma.users.create({
        data: {
          nombre: nombre.toLowerCase(),
          email,
          password: hashedPass
        }
      })

      return NextResponse.json({ message: 'Success' }, { status: 200 })
    }
  } catch (error) {
    console.error(error)
    if (error.errno === 1062) {
      return NextResponse.json({
        message: 'Username or email alredy registered.'
      })
    }
    return NextResponse.json({
      message: 'There was a problem creating the user.' + error
    })
  }
}

function encryptPassword(password) {
  return bcrypt.hashSync(password, 8)
}
