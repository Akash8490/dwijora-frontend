"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { TextField } from "@/app/components/form/TextField";
import { CheckboxField } from "@/app/components/form/CheckboxField";
import { logger } from "@/app/lib/logger";
import { ROUTES } from "@/app/lib/routeEndPoints";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
  remember: z.boolean().default(false),
});
type Values = z.input<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  // TODO(api): replace with server action calling AUTH.LOGIN and setting an
  // HTTP-only cookie via headers().set(...).
  const onSubmit = form.handleSubmit(async (v) => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    logger.info("Mock admin login:", v.email);
    toast.success("Signed in (mock)");
    router.push(ROUTES.ADMIN);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <TextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="admin@visvasamvid.org"
          requiredMark
          fullWidth
        />
        <TextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          requiredMark
          fullWidth
        />
        <CheckboxField
          control={form.control}
          name="remember"
          label="Keep me signed in on this device"
        />
        <Button type="submit" size="lg" className="w-full" disabled={busy}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
