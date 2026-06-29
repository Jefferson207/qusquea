import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const uploadUrl = process.env.CPANEL_UPLOAD_URL;
  const token = process.env.CPANEL_UPLOAD_TOKEN;

  if (!uploadUrl || !token) {
    return NextResponse.json({ error: "Upload no configurado" }, { status: 500 });
  }

  const incoming = await request.formData();
  const outgoing = new FormData();

  for (const [key, value] of incoming.entries()) {
    outgoing.append(key, value);
  }
  outgoing.append("token", token);

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: outgoing,
  });

  const text = await response.text();
  try {
    return NextResponse.json(JSON.parse(text), { status: response.status });
  } catch {
    return NextResponse.json({ raw: text }, { status: response.status });
  }
}
