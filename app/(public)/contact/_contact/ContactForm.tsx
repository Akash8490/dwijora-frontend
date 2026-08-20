"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { TextField } from "@/app/components/form/TextField";
import { TextareaField } from "@/app/components/form/TextareaField";
import { logger } from "@/app/lib/logger";
import { contactSchema, type ContactFormValues } from "@/app/utils/schema/contact.schema";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
    mode: "onBlur",
  });

  // TODO(api): replace with server action POSTing to a contact endpoint.
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 700));
    logger.info("Mock contact:", values);
    toast.success("Message sent (mock).");
    setSent(true);
    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            control={form.control}
            name="name"
            label="Your name"
            placeholder="Full name"
            autoComplete="name"
            requiredMark
          />
          <TextField
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.edu"
            autoComplete="email"
            requiredMark
          />
        </div>
        <TextField
          control={form.control}
          name="subject"
          label="Subject"
          placeholder="What's this about?"
          autoComplete="off"
          requiredMark
        />
        <TextareaField
          control={form.control}
          name="message"
          label="Message"
          rows={5}
          placeholder="How can the editorial office help?"
          fullWidth={false}
          requiredMark
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Send message
        </Button>
        {sent ? (
          <p className="text-sm text-brand-success">
            Thanks — the editorial office will be in touch shortly.
          </p>
        ) : null}
      </form>
    </Form>
  );
}
