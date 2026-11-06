import App from '../losta_masta_spesialis_pembuatan_website';
import { BookGallery, EditorScene } from './portofolio-page';
import { GifMascot } from './gif-mascot';
import './homepage3.css';

export default function Homepage3Page() {
  return <div className="homepage3-page">
    <App
      heroPortrait={<GifMascot />}
      afterProjects={onExplore => <div className="portfolio-page hp3-addition hp3-collection">
        <BookGallery onExplore={onExplore} />
      </div>}
      contactExtra={<div className="portfolio-page hp3-addition hp3-footer-enhancement">
        <div className="hp3-editor-heading">
          <p className="eyebrow">Desain bertemu pengembangan</p>
          <h3 className="metal-text">Perhatian sampai<br />ke detail terakhir.</h3>
          <p>Dari tampilan di layar sampai pengalaman saat digunakan.</p>
        </div>
        <div className="hp3-editor-preview"><EditorScene /></div>
        <div className="hp3-footer-wordmark metal-text" aria-hidden="true">LOSTA MASTA</div>
      </div>} />
  </div>;
}
