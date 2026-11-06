import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import App from '../losta_masta_spesialis_pembuatan_website';
import './styles.css';

const pathname = window.location.pathname.replace(/\/+$/, '');
const Page = pathname.startsWith('/konsep/')
  ? lazy(() => import('./concept-demo'))
  : pathname === '/portofolio'
  ? lazy(() => import('./portofolio-page'))
  : pathname === '/homepage2'
  ? lazy(() => import('./homepage2-page'))
  : pathname === '/homepage3'
  ? lazy(() => import('./homepage3-page'))
  : pathname === '/baru' ? lazy(() => import('./baru-page')) : App;

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={null}><Page /></Suspense>,
);
