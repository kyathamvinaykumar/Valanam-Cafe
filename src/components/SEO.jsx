import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteMetadata = {
  '/': {
    title: 'Valanam — A Fabled Kitchen | Hyderabad',
    description: 'A cozy Kerala kitchen in Hyderabad offering slow dining, authentic flavors, and memorable experiences. Experience Valanam — A Fabled Kitchen today.',
    canonical: 'https://www.valanam.com/'
  },
  '/story': {
    title: 'Our Story | Valanam Kitchen',
    description: 'The journey of Valanam Kitchen, Hyderabad. Discover how we built our cozy Kerala restaurant and cafe around slow dining and authentic food.',
    canonical: 'https://www.valanam.com/story'
  },
  '/gallery': {
    title: 'Gallery | Valanam Kitchen',
    description: 'Explore the visual story of Valanam Kitchen in Hyderabad. Cozy cafe interiors, authentic food preparation, and slow dining moments.',
    canonical: 'https://www.valanam.com/gallery'
  },
  '/blog': {
    title: 'Valanam Journal | Valanam Kitchen',
    description: 'The Valanam Journal. Stories, recipes, and reflections on slow dining, authentic food, and community from our Kerala restaurant in Hyderabad.',
    canonical: 'https://www.valanam.com/blog'
  },
  '/visit': {
    title: 'Visit Valanam | Hyderabad',
    description: 'Visit Valanam in Hyderabad. Location, opening hours, and details for our cozy Kerala restaurant and cafe. Experience slow dining and authentic food.',
    canonical: 'https://www.valanam.com/visit'
  },
  '/ai': {
    title: 'Discover Your Valanam',
    description: 'Discover Your Valanam. Share your taste and memories to get customized slow dining recommendations from our authentic Kerala kitchen in Hyderabad.',
    canonical: 'https://www.valanam.com/ai'
  }
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = siteMetadata[location.pathname] || siteMetadata['/'];
    const currentUrl = meta.canonical;

    // Update Title
    document.title = meta.title;

    // Update Description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.setAttribute('name', 'description');
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute('content', meta.description);

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Update Robots Meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow');

    // Update Open Graph (og:title, og:description, og:url, og:type, og:image)
    // On the homepage, use the exact title & description requested by the user
    const isHome = location.pathname === '/';
    const ogTitle = isHome ? 'Valanam — A Fabled Kitchen' : meta.title;
    const ogDescription = isHome 
      ? 'Where stories simmer, and flavors linger. A cozy Kerala kitchen in Hyderabad offering slow dining, authentic flavors, and memorable experiences.'
      : meta.description;

    const ogTags = {
      'og:title': ogTitle,
      'og:description': ogDescription,
      'og:url': currentUrl,
      'og:type': 'website',
      'og:image': 'https://www.valanam.com/visit/visit_4.webp'
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let ogMeta = document.querySelector(`meta[property="${property}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', property);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', content);
    });

    // Update Twitter Cards
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': ogTitle,
      'twitter:description': ogDescription,
      'twitter:image': 'https://www.valanam.com/visit/visit_4.webp'
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let twitterMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twitterMeta) {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', name);
        document.head.appendChild(twitterMeta);
      }
      twitterMeta.setAttribute('content', content);
    });
  }, [location]);

  return null;
}
