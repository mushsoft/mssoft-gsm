// Maps the current page (by pathname) to what the header's search bar should
// search and where it should send a shopper who presses Enter. A shopper
// typing on /shop/phones means phones; the same input on the homepage or an
// account page means the whole catalog.
export interface SearchScope {
  key: string;
  label: string;
  resultsHref: (q: string) => string;
}

const CATEGORY_SCOPE_LABELS: Record<string, string> = {
  phones: 'phones',
  screens: 'screens',
  accessories: 'accessories',
  spares: 'spare parts',
  tools: 'repair tools',
  'kids-tabs': 'kids tabs',
  laptops: 'laptops',
};

export function getSearchScope(pathname: string): SearchScope {
  if (pathname.startsWith('/shop/unlock-tools')) {
    return { key: 'unlock-tools', label: 'unlock tools', resultsHref: (q) => `/shop/unlock-tools?q=${encodeURIComponent(q)}` };
  }
  if (pathname.startsWith('/shop/testpoints')) {
    return { key: 'testpoints', label: 'testpoints', resultsHref: (q) => `/shop/testpoints?q=${encodeURIComponent(q)}` };
  }

  const match = pathname.match(/^\/shop\/([^/]+)/);
  const categoryKey = match?.[1];
  const label = categoryKey ? CATEGORY_SCOPE_LABELS[categoryKey] : undefined;
  if (categoryKey && label) {
    return { key: categoryKey, label, resultsHref: (q) => `/shop/${categoryKey}?q=${encodeURIComponent(q)}` };
  }

  return { key: 'global', label: 'everything', resultsHref: (q) => `/shop?search=${encodeURIComponent(q)}` };
}
