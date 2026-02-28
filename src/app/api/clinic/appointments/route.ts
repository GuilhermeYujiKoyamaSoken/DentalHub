import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth) {
            return NextResponse.json({
                error: "Acesso não autorizado!"
            }, { status: 401 });
        }

        const searchParams = req.nextUrl.searchParams;
        const dateString = searchParams.get("date");
        const clinicId = req.auth?.user?.id;

        if (!clinicId) {
            return NextResponse.json({
                error: "ID da clínica não encontrado!"
            }, { status: 400 });
        }

        if (!dateString) {
            return NextResponse.json({
                error: "Data não informada!"
            }, { status: 400 });
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            return NextResponse.json({
                error: "Formato de data inválido! Use YYYY-MM-DD"
            }, { status: 400 });
        }

        const [year, month, day] = dateString.split("-").map(Number);

        const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
        const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

        const appointments = await prisma.appointment.findMany({
            where: {
                userId: clinicId,
                appointmentDate: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                service: true,
                user: true
            }
        });

        return NextResponse.json(appointments);

    } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return NextResponse.json({
            error: "Falha ao buscar agendamentos!"
        }, { status: 500 });
    }
});