import prisma from "@/lib/db";

export async function DELETE(request, { params }) {
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
