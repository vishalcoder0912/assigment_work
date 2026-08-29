import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Container, LuxButton, Meta, SectionLabel } from "@/components/ui/lux";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { useSubmitInquiry, type InquirySubmitPayload } from "@/hooks/useInquiries";
import { studio } from "@/data/studio";
import { services } from "@/data/services";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Start a Project — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Commission jewelry CAD, 3D modeling, visualization or animation from Bambral 3D Studio. Tell us about your piece.",
      },
      { property: "og:title", content: "Start a Project — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "Tell us about the piece. We reply within two working days.",
      },
    ],
  }),
  component: ContactPage,
});

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border-b border-hairline bg-transparent py-4 text-base text-ivory outline-hidden transition-colors duration-300 placeholder:text-muted-foreground focus:border-champagne";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const submitMutation = useSubmitInquiry();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload: InquirySubmitPayload = {
      fullName: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    try {
      const result = await submitMutation.mutateAsync(payload);
      setReference(result.reference);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="pt-40 pb-32 md:pt-52">
      <Container>
        <SectionLabel>Contact</SectionLabel>
        <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
          <SplitLines lines={["Start a project."]} />
        </h1>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.1fr_0.7fr]">
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-10 md:grid-cols-2">
                <label className="block">
                  <span className="label-tech">Name</span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="label-tech">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="you@brand.com"
                  />
                </label>
                <label className="block">
                  <span className="label-tech">Brand / Studio</span>
                  <input name="company" className={fieldClass} placeholder="Optional" />
                </label>
                <label className="block">
                  <span className="label-tech">Project type</span>
                  <select
                    name="projectType"
                    defaultValue={services[0]?.title}
                    className={fieldClass}
                  >
                    {services.map((service) => (
                      <option key={service.slug} value={service.title} className="bg-background">
                        {service.title}
                      </option>
                    ))}
                    <option value="Something else" className="bg-background">
                      Something else
                    </option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="label-tech">The piece</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                  placeholder="Materials, stones, references, timeline."
                />
              </label>

              <div className="flex flex-wrap items-center gap-6">
                <LuxButton
                  type="submit"
                  disabled={status === "sending" || submitMutation.isPending}
                >
                  {status === "sending" || submitMutation.isPending ? "Sending" : "Send inquiry"}
                </LuxButton>
                <p aria-live="polite" className="text-sm text-muted-foreground">
                  {status === "sent" && `Received — reference ${reference}.`}
                  {status === "error" && "That didn't send. Check your email address."}
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="space-y-10 lg:border-l lg:border-hairline lg:pl-12">
            <dl className="space-y-8">
              <Meta label="Email" value={studio.email} />
              <Meta label="Based in" value={studio.location} />
              <Meta label="Response time" value="Within two working days" />
              <Meta label="Disciplines" value={studio.disciplines.join(" / ")} />
            </dl>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Bring sketches, competitor references, stone specs — anything. We reply with a scope,
              a timeline and the deliverable formats your manufacturer will need.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
