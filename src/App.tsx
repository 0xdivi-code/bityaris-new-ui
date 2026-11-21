import { ThemeProvider } from "./theme/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarketInsights } from "./components/MarketInsights";
import { CryptoPaymentCard } from "./components/CryptoPaymentCard";
import { EcosystemSection } from "./components/EcosystemSection";
import { TradingToolsSection } from "./components/TradingToolsSection";
import { AppPromotionSection } from "./components/AppPromotionSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-page text-ink antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <MarketInsights />
          <CryptoPaymentCard />
          <EcosystemSection />
          <TradingToolsSection />
          <AppPromotionSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
