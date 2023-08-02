import { prisma } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  try {
    await prisma.record.create({
      data: {
        propertyId: body.property,
        transaction_type: body.transaction_type,
        type: body.type,
        amount: +body.amount,
        notes: body.notes,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
