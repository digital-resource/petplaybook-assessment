import { RouteObject } from "react-router";
import HomePage from './pages/index';
import ContactPage from './pages/contact';
import AboutPage from './pages/about';
import AdminPage from './pages/admin';
import PrivacyPage from './pages/privacy';
import TermsPage from './pages/terms';
import SitemapPage from './pages/sitemap';
import ProdNotFoundPage from './pages/_404';
const NotFoundPage = ProdNotFoundPage;
export const routes: RouteObject[] = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/contact',
  element: <ContactPage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/admin',
  element: <AdminPage />
}, {
  path: '/privacy',
  element: <PrivacyPage />
}, {
  path: '/terms',
  element: <TermsPage />
}, {
  path: '/sitemap',
  element: <SitemapPage />
}, {
  path: '*',
  element: <NotFoundPage />
}];
export type Path = '/' | '/contact' | '/about' | '/pricing' | '/admin' | '/privacy' | '/terms';
export type Params = Record<string, string | undefined>;
