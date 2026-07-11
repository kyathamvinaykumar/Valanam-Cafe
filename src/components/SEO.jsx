import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const siteMetadata = {
  '/': {
    title: 'Valanam Kitchen | A Cozy Café in Hyderabad',
    description: 'Experience Valanam Kitchen, a warm and authentic café in Hyderabad where food, stories, and meaningful conversations come together. Freshly prepared meals, handcrafted pizzas, and a truly homely atmosphere.'
  },
  '/story': {
    title: 'Our Story | Valanam Kitchen',
    description: 'Learn the story behind Valanam Kitchen, our journey, our love for storytelling, and how we created a place where everyone feels at home.'
  },
  '/gallery': {
    title: 'Gallery | Valanam Kitchen',
    description: 'Take a visual tour of Valanam Kitchen. Cozy corners, warm moments, handcrafted food, and the beautiful ambience of our Hyderabad café.'
  },
  '/blog': {
    title: 'Blog | Valanam Kitchen',
    description: 'Read stories, culinary thoughts, café updates, and memories shared by our guests and team at Valanam Kitchen.'
  },
  '/visit': {
    title: 'Visit Us | Valanam Kitchen',
    description: 'Find our address, phone number, opening hours, and location map. Stop by Valanam Kitchen in Hyderabad today.'
  },
  '/ai': {
    title: 'Discover Your Valanam | Valanam Kitchen',
    description: 'Discover your Valanam through our interactive experience. Explore café memories, stories, and customized recommendations.'
  }
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const meta = siteMetadata[location.pathname] || siteMetadata['/'];
    const origin = window.location.origin;
    const currentUrl = `${origin}${location.pathname}`;

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

    // Update Open Graph (og:title, og:description, og:url, og:type, og:image)
    const ogTags = {
      'og:title': meta.title,
      'og:description': meta.description,
      'og:url': currentUrl,
      'og:type': 'website',
      'og:image': `${origin}/visit/visit_4.webp`
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
      'twitter:title': meta.title,
      'twitter:description': meta.description,
      'twitter:image': `${origin}/visit/visit_4.webp`
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
