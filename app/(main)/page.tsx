import FeatureSection from './_components/feature-section';
import HeroSection from './_components/hero-section';
import HowItWorkSection from './_components/how-it-work-section';

const HomagePage = () => {
  return (
    <main className="bg-gradient-soft min-h-screen pt-14 pb-10">
      <HeroSection />
      <FeatureSection />
      <HowItWorkSection />
    </main>
  );
};

export default HomagePage;
