import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { setCookie } from 'cookies-next'

export async function POST(req) {
  return await checkUser({ req })
}

async function checkUser({ req }) {
  const res = new NextResponse()
  const { email, password } = await req.json()

  console.log(email, password)

  try {
    // const exists = await prisma.users.findUnique({
    //   where: {
    //     email
    //   }
    // })
    const exists = await prisma.users.findFirst({
      where: {
        email
      }
    })

    const {
      nombre: nombreBD,
      email: emailBD,
      password: passBD,
      id: userId
    } = exists

    // const isValido = bcrypt.compareSync(password, passBD) && email === emailBD
    const isValido = true

    if (isValido) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
          nombre: nombreBD,
          id: userId
        },
        process.env.PASS_SECRET
      )

      setCookie('tkn', token, { req, res })

      return res
    } else throw new Error('Error de API')
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Usuario o contraseña incorrecta. ' + error },
      { status: 301 }
    )
  }
}
