import "server-only";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

export async function saveCvFile(candidateId: string, file: File): Promise<string> {
  await mkdir(UPLOADS_DIR, { recursive: true });
  const filePath = path.join(UPLOADS_DIR, `${candidateId}.pdf`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  return filePath;
}

export async function readCvAsBase64(candidateId: string): Promise<string | null> {
  try {
    const filePath = path.join(UPLOADS_DIR, `${candidateId}.pdf`);
    const buffer = await readFile(filePath);
    return buffer.toString("base64");
  } catch {
    return null;
  }
}

export async function readCvBuffer(candidateId: string): Promise<Buffer | null> {
  try {
    const filePath = path.join(UPLOADS_DIR, `${candidateId}.pdf`);
    return await readFile(filePath);
  } catch {
    return null;
  }
}
