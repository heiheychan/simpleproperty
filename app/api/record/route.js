import { prisma } from "@/lib/db";

export async function GET(request) {
  try {
    const response = await prisma.record.findMany({
      include: {
        property: {
          select: {
            color: true,
            id: true,
            display_name: true
          }
        }
      },
      orderBy: { happened_on: "desc" },
    });
    return new Response(JSON.stringify({ response }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }
}

export async function POST(request) {
  const body = await request.json();

  try {
    await prisma.record.create({
      data: {
        propertyId: body.property,
        transaction_type: body.transaction_type,
        type: body.type,
        amount: +body.amount,
        happened_on: new Date(body.happened_on),
        notes: body.notes,
      },
    });
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }
}
