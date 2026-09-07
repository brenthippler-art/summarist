import PlanHero from "@/components/choose-plan/PlanHero";
import PlanFeatures from "@/components/choose-plan/PlanFeatures";
import PlanSelector from "@/components/choose-plan/PlanSelector";
import FaqAccordion from "@/components/choose-plan/FaqAccordion";
import Footer from "@/components/home/Footer";

export default function ChoosePlanPage() {
  return (
    <div>
      <PlanHero />
      <PlanFeatures />
      <PlanSelector />
      <FaqAccordion />
      <Footer />
    </div>
  );
}