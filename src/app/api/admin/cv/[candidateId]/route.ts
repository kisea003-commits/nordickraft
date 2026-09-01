import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readCvBuffer } from "@/lib/uploads";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ candidateId: string }> },
) {
  const { candidateId } = await params;

  const candidate = await prisma.candidate.findUnique({ where: { id: candidateId } });
  if (!candidate || !candidate.cvFileName) {
    return NextResponse.json({ error: "CV ikke funnet" }, { status: 404 });
  }

  const buffer = await readCvBuffer(candidateId);
  if (!buffer) {
    return NextResponse.json({ error: "CV ikke funnet" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${candidate.cvFileName}"`,
    },
  });
}
