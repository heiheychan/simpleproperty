import prisma from "@/lib/db";

export async function DELETE({ params }) {
  const propertyId = +params.id;
  try {
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const id = params.id;

  try {
    await prisma.property.update({
      where: {
        id: +id,
      },
      data: {
        ...body,
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
