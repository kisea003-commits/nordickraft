"use client";

import { useActionState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { loginAdmin, type AdminLoginState } from "./actions";

const initialState: AdminLoginState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Admin-innlogging</h1>
        <p className="mt-2 text-sm text-muted">
          Kun for NordicKrafts team. Skriv inn admin-passordet for å fortsette.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <label className="text-sm font-medium">
            Passord
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </label>

          {state.error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {pending ? "Logger inn…" : "Logg inn"}
          </button>
        </form>
      </main>
    </div>
  );
}
