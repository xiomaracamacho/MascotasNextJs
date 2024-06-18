import prisma from "@/libreria/prisma"
import { NextResponse } from  "next/server"
import bcrypt from "bcrypt"

export async function POST(request) {
    try {
        const data = await request.json();

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });

        return new NextResponse(
            JSON.stringify({
                message: 'Usuario registrado exitosamente',
                user
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                message: 'Error al crear el usuario',
                error: error.message
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function GET () {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({ datos: users}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status:500})  
    }
}
