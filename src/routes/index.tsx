import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { StudioIntro } from "@/components/sections/StudioIntro";
import { Pipeline } from "@/components/sections/Pipeline";
import { ConfiguratorTeaser } from "@/components/studio/ConfiguratorTeaser";
import { ComparisonSlider } from "@/components/sections/ComparisonSlider";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { Craft } from "@/components/sections/Craft";
import { CinematicFrame } from "@/components/sections/CinematicFrame";
import { ServicesList } from "@/components/services/ServicesList";
import { Process } from "@/components/sections/Process";
import { JournalPreview } from "@/components/journal/JournalPreview";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bambral 3D Studio | Jewelry CAD, 3D & Product Visualization" },
      {
        name: "description",
        content:
          "Premium jewelry CAD, 3D modeling, product visualization, animation and digital experiences for modern jewelry brands.",
      },
      { property: "og:title", content: "Bambral 3D Studio — Jewelry, built in 3D" },
      {
        property: "og:description",
        content: "CAD precision, photorealistic visualization and interactive jewelry experiences.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <Pipeline />
      <CinematicFrame />
      <ComparisonSlider />
      <SelectedWork />
      <Craft />
      <ConfiguratorTeaser />
      <ServicesList />
      <Process />
      <JournalPreview />
      <CTA />
    </>
  );
}
