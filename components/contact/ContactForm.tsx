"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General enquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!emailRe.test(form.email)) err.email = "Enter a valid email.";
    if (form.message.trim().length < 10) err.message = "Please add a little more detail.";
    setErrors(err);
    if (Object.keys(err).length === 0) setSent(true);
  };

  return (
    <div className="card p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-ink shadow-glow"
            >
              <Check className="h-8 w-8" />
            </motion.span>
            <h3 className="font-heading text-xl font-semibold text-ink">Message sent!</h3>
            <p className="max-w-sm text-sm text-muted">
              Thanks {form.name.split(" ")[0]} — our team will get back to you within one
              business hour. For anything urgent, message us on WhatsApp.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setForm({ name: "", email: "", subject: "General enquiry", message: "" });
              }}
              className="btn btn-secondary"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={submit}
            className="grid gap-4"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Name</label>
                <input
                  className={cn("field", errors.name && "field-error")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  className={cn("field", errors.email && "field-error")}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="label">Subject</label>
              <select
                className="field"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              >
                <option>General enquiry</option>
                <option>Booking support</option>
                <option>Commercial / office cleaning</option>
                <option>Feedback</option>
                <option>Careers</option>
              </select>
            </div>
            <div>
              <label className="label">Message</label>
              <textarea
                className={cn("field resize-none", errors.message && "field-error")}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary h-12 sm:w-auto sm:self-start sm:px-8">
              Send message <Send className="h-4 w-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
