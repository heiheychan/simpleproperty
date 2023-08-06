import { prisma } from "@/lib/db";

export async function GET(request) {
  const property =
    request.nextUrl.searchParams.get("property") === null
      ? []
      : request.nextUrl.searchParams
          .get("property")
          .split("_")
          .map((ele) => +ele);
  const startdate =
    request.nextUrl.searchParams.get("startdate") === null
      ? new Date(new Date().getFullYear(), 0, 1)
      : new Date(request.nextUrl.searchParams.get("startdate"));
  const enddate =
    request.nextUrl.searchParams.get("enddate") === null
      ? new Date()
      : new Date(
          new Date(request.nextUrl.searchParams.get("enddate")).getTime() +
            60 * 60 * 24 * 1000
        );

  try {
    const response = await prisma.record.findMany({
      where: {
        propertyId: {
          in: property,
        },
        happened_on: {
          lte: enddate,
          gte: startdate,
        },
      },
      include: {
        property: {
          select: {
            color: true,
            id: true,
            display_name: true,
          },
        },
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

export async function DELETE(request) {
  try {
    await prisma.record.deleteMany({});
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }
}
