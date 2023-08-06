import prisma from "@/lib/db";

export async function DELETE(request, { params }) {
  const recordId = +params.id;
  try {
    await prisma.record.delete({
      where: {
        id: recordId,
      },
    });
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ message: "fail" }), { status: 400 });
  }
}
