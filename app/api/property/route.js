import { prisma } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();

  try {
    await prisma.property.create({
      data: {
        display_name: body.display_name,
        address: body.address,
        unit: body.unit,
        color: body.color,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}

export async function GET(request) {
  let response;
  try {
    response = await prisma.property.findMany({});
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }

  return new Response(JSON.stringify(response), { status: 200 });
}
