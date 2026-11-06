import App, { ProcessSection, ServicesSection } from '../losta_masta_spesialis_pembuatan_website';
import { LivingHero } from './baru-page';
import { AboutMe, HomepageGallery } from './portfolio-sections';
import { BookGallery, PortfolioFAQ, PortfolioFooter } from './portofolio-page';
import './homepage2.css';

export default function Homepage2Page() {
  return <div className="portfolio-page homepage2-page">
    <App hero={<LivingHero portfolio homepage />}
      content={onExplore => <>
        <HomepageGallery onExplore={onExplore} limit={3} collectionHref="#collection" />
        <ServicesSection />
        <AboutMe portraitSrc="/media/hijab-portrait/rest.webp" />
        <BookGallery onExplore={onExplore} />
        <ProcessSection />
        <PortfolioFAQ />
      </>}
      footer={<PortfolioFooter />} />
  </div>;
}
