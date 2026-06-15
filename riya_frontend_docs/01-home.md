# 01 - Home Page API Documentation

## Purpose

The Home Page is composed from multiple API-driven sections:

1. Page Builder sections
2. Personalized Recommendations
3. Site Features
4. Navbar Categories
5. Footer Settings

The frontend should not hardcode homepage sections. Sections should be rendered dynamically when possible.

---

# A. Home Page Builder

## Shape

```ts
type HomePageBuilderResponse = {
  data: HomePage;
  success: boolean;
};

type HomePage = {
  id: number;
  category_id: number | null;
  name: {
    en: string;
    ar: string;
  };
  slug: string;
  icon: string | null;
  is_active: boolean;
  sections: HomeSection[];
};

type HomeSection = {
  id: number;
  main_page_id?: number;
  title: {
    en: string;
    ar: string;
  };
  layout: string;
  items?: HomeSectionItem[];
};

type HomeSectionItem = {
  id: number;
  image?: string | null;
  mobile_image?: string | null;
  link?: string | null;
  title?: {
    en: string;
    ar: string;
  };
  subtitle?: {
    en: string;
    ar: string;
  };
  sort_order?: number;
  product?: any;
  category?: any;
  brand?: any;
};
```

## Supported Layouts

```ts
type HomeSectionLayout =
  | 'slider'
  | 'categories'
  | 'products'
  | 'banner'
  | 'banners'
  | 'brands';
```

## UI Rules

- Render sections in the API order.
- Use `section.layout` to map to UI component:
  - `slider` -> Hero Slider
  - `categories` -> Category Grid/Carousel
  - `products` -> Product Carousel/Grid
  - `banner` / `banners` -> Banner Blocks
  - `brands` -> Brand Carousel/Grid
- Section title should use the current locale.
- Some sections may have empty items.
- Show skeleton while loading.
- Do not break if section title is temporary or numeric.

---

# B. Home Recommendations

## Purpose

Used for the personalized / recommended products section on the homepage.

## Response Shape

```ts
type HomeRecommendationsResponse = {
  products: RecommendedProduct[];
  category_ids: number[];
  category_scores: Record<string, number>;
  user_id: number | null;
  visitor_id: string | null;
  reason: string;
};

type RecommendedProduct = {
  id: number;
  company_product_id: string | null;
  company_name: string | null;

  name_en: string | null;
  name_ar: string | null;
  name_tr: string | null;

  slug: string;
  image: string | null;

  desc_en: string | null;
  desc_ar: string | null;
  desc_tr?: string | null;

  sku: string | null;
  category_id: number | null;
  brand_id: number | null;

  old_price: string | number | null;
  final_selling_price: number;
  base_final_selling_price: number | null;
  discount_percentage_selling_price: string | number | null;
  discount_percentage: number | null;

  stock: number | null;
  status: number;

  featured: number;
  new_arrival: number;
  trending: number;
  highlighted: number;
  most_sold: number;
  ontop: number;

  personalized_score?: string | number | null;
  product_quality_score?: number | null;

  brand: ProductBrand | null;
  offer: ProductOffer | null;
  currency: ProductCurrency | null;
};

type ProductBrand = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  translated_name: string;
  image: string | null;
};

type ProductOffer = {
  id: number;
  name: string;
  discount_amount: number;
  discount_type: string;
  start_at: string | null;
  end_at: string | null;
  status: boolean;
  is_active: boolean;
} | null;

type ProductCurrency = {
  id: number;
  name: string;
  prefix: string;
  exchange_rate: number;
  delivery_days: string | null;
};
```

## Example Metadata

```json
{
  "category_ids": [150, 34, 428],
  "category_scores": {
    "150": 21.47,
    "34": 4.11,
    "428": 2.79
  },
  "user_id": null,
  "visitor_id": "9d10429d-c0ed-41eb-a0c8-330579b3c0e9",
  "reason": "guest_personalized"
}
```

## UI Rules

- Render `products[]` as a carousel/grid.
- `user_id` can be `null`.
- `visitor_id` can exist for guest personalization.
- `reason`, `personalized_score`, and `product_quality_score` are backend/internal fields and should not be displayed.
- Use flags for badges when useful:
  - `new_arrival`
  - `featured`
  - `trending`
  - `most_sold`
- Product name can be `null` in some languages. Use fallback.
- `image`, `offer`, and `brand.image` can be `null`.

---

# C. Home Site Features

## Response Shape

```ts
type HomeSiteFeaturesResponse = {
  data: HomeSiteFeature[];
  success: boolean;
};

type HomeSiteFeature = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  } | null;
  icon: string | null;
  sort_order: number;
  placement: 'home' | 'product' | string;
  parent_id: number | null;
  translated_name: string;
  translated_description: string | null;
};
```

## UI Rules

- Sort by `sort_order`.
- Show as benefits/service cards.
- Icons are usually Remix Icon classes:
  - `ri-truck-line`
  - `ri-refresh-line`
  - `ri-shield-check-line`
  - `ri-money-dollar-circle-line`
- `description` and `icon` can be `null`.
- Only render items with `placement = home` for homepage.
