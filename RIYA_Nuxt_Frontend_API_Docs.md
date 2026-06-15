# RIYA Nuxt Frontend API Docs

<!-- README.md -->

# RIYA Nuxt Frontend API Documentation

This documentation is based on the provided RIYA API responses and is intended for the Nuxt.js frontend/UI developer.

## Files

- `01-home.md`
- `02-shop.md`
- `03-product.md`
- `04-navbar.md`
- `05-footer.md`
- `06-mini-cart.md`

## General Rules

- UI should be API-driven, not hardcoded.
- Use `translated_name`, `translated_title`, and `translated_description` when available.
- Fallback for names should be:
  1. Current locale field
  2. `translated_name`
  3. `name_en`
  4. `name_ar`
  5. `name_tr`
- Images may be absolute URLs or relative `/uploads/...` paths.
- Some fields can be `null`; UI must handle fallbacks.
- Arabic and English must be supported.
- Product cards should be reusable across Home, Shop, Product related sections, Recommendations, Best Sellers, and Search later.


---

<!-- 01-home.md -->

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


---

<!-- 02-shop.md -->

# 02 - Shop Page API Documentation

## Purpose

The Shop Page consists of:

1. Sidebar / Drawer filters
2. Dynamic attributes filters
3. Filter request payload
4. Products response
5. Product grid/list

The frontend should treat filters as dynamic data from API, not hardcoded UI.

---

# A. Shop Sidebar Filters Response

Used to build the sidebar/drawer filter UI.

## Response Shape

```ts
type ShopFiltersResponse = {
  message: {
    categories: FilterCategory[];
    brands: FilterBrand[];
    colors: FilterColor[];
    sizes: FilterSize[];
    vendor: any | null;
  };
};

type FilterCategory = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  menu_name: {
    en: string;
    ar: string;
  };
  translated_name: string;
  slug: string;
  image: string | null;
  icon: string | null;
  status: number;
  category_id: number | null;
  show_in_navbar: number;
  mark_as_top_category: number;
  all_children: FilterCategory[];
  children: FilterCategory[];
};

type FilterBrand = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  translated_name: string;
  image: string | null;
  products_count: number;
};

type FilterColor = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  color_code: string | null;
  image: string | null;
  status: number;
  product_count: number;
};

type FilterSize = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  name_tr: string;
  status: number;
  sort_order: number;
  product_count: number;
};
```

## Filter Sidebar UI Rules

### Categories

- Source: `message.categories[]`
- Use `id` in request.
- Use `translated_name` in UI.
- Can have recursive `children[]`.
- Use `slug` for category navigation if needed.
- Multi-select should be supported unless product decision says otherwise.

### Brands

- Source: `message.brands[]`
- Use `brand.id` in request.
- Show `translated_name`.
- Show `products_count` if the design supports counts.
- `image` can be `null`.

### Colors

- Source: `message.colors[]`
- Use `color.id` in request.
- Show swatch:
  - use `color_code` if available.
  - use `image` if `color_code` is null or it is a pattern/multi-color.
- Show `translated_name`.
- `color_code` can be `null`.

### Sizes

- Source: `message.sizes[]`
- Use `size.id` in request.
- Sort by `sort_order`.
- Show `translated_name`.
- Show `product_count` if needed.

---

# B. Dynamic Attributes API

Used for extra filters like Occasion, Length, Style, Material, etc.

## Response Shape

```ts
type ShopAttributesResponse = {
  message: string;
  data: FilterAttribute[];
};

type FilterAttribute = {
  id: number;
  list: number;
  admin_id: number;
  name: {
    en: string;
    ar: string;
  };
  type: 'checkbox' | 'select' | string;
  filterable: boolean;
  categories_ids: number[] | null;
  translated_name: string;
  options: FilterAttributeOption[];
};

type FilterAttributeOption = {
  id: number;
  attribute_id: number;
  name: {
    en: string;
    ar: string;
  };
  image: string | null;
  status: number;
  translated_name: string;
};
```

## Dynamic Attribute UI Rules

- Do not hardcode names like Occasion or Length.
- Render every attribute from `data[]`.
- Use `attribute.id` as the request object key.
- Use selected `option.id` values as the array values.
- Attribute options can be long, so support:
  - collapse
  - show more
  - search inside options if needed
- Only active options should be shown if status is used.
- Use `translated_name` for attribute and option labels.

---

# C. Filter Request Payload

## Shape

```ts
type ShopFilterRequest = {
  filter_data: {
    subCategories?: number[];
    brands?: number[];
    colors?: number[];
    sizes?: number[];

    price?: {
      min: number;
      max: number;
    };

    discount?: {
      min: number;
      max: number;
    };

    sort?: string;
    search?: string;
    locale?: 'ar' | 'en';

    page?: number;
    limit?: number;

    slug?: string | null;
    product_type?: string | null;
    navbar_category_id?: number | null;

    attributes?: {
      [attributeId: number]: number[];
    };

    stock?: boolean;
    include_out_of_stock?: boolean;
    recommended_mode?: boolean;
  };

  loaded_ids?: number[];
  fallback_page?: number;
};
```

## Request Examples

### Filter by Brand

```json
{
  "filter_data": {
    "brands": [10, 17],
    "page": 1,
    "limit": 20,
    "locale": "ar"
  }
}
```

### Filter by Color and Size

```json
{
  "filter_data": {
    "colors": [2, 12],
    "sizes": [6, 7],
    "page": 1,
    "limit": 20
  }
}
```

### Filter by Price

```json
{
  "filter_data": {
    "price": {
      "min": 100,
      "max": 500
    }
  }
}
```

### Filter by Dynamic Attributes

```json
{
  "filter_data": {
    "attributes": {
      "10": [90, 99],
      "11": [101, 102]
    }
  }
}
```

Meaning:

- Attribute `10` = Occasion
  - Option `90` = Casual
  - Option `99` = Daily
- Attribute `11` = Length
  - Option `101` = Maxi
  - Option `102` = Midi

### Full Example

```json
{
  "filter_data": {
    "subCategories": [150],
    "brands": [10, 17],
    "colors": [2, 12],
    "sizes": [6, 7],
    "price": {
      "min": 100,
      "max": 500
    },
    "discount": {
      "min": 10,
      "max": 50
    },
    "sort": "price_asc",
    "search": "jacket",
    "locale": "ar",
    "page": 1,
    "limit": 20,
    "slug": "jackets-coats",
    "product_type": null,
    "navbar_category_id": null,
    "attributes": {
      "10": [90, 99],
      "11": [101]
    },
    "stock": true,
    "include_out_of_stock": false,
    "recommended_mode": false
  },
  "loaded_ids": [],
  "fallback_page": 1
}
```

## Field Details

| Field | Type | Source | Meaning |
|---|---|---|---|
| `subCategories` | number[] | categories filter | Selected category IDs |
| `brands` | number[] | brands filter | Selected brand IDs |
| `colors` | number[] | colors filter | Selected color IDs |
| `sizes` | number[] | sizes filter | Selected size IDs |
| `price.min/max` | number | price slider | Inclusive price range |
| `discount.min/max` | number | discount slider | Inclusive discount range |
| `sort` | string | sort dropdown | Current sorting |
| `search` | string | search input/query | Search keyword |
| `locale` | `ar`/`en` | app locale | Current language |
| `page` | number | pagination | Current page |
| `limit` | number | pagination | Products per page |
| `slug` | string/null | route | Current category slug |
| `attributes` | object | dynamic attributes | Key = attribute ID, value = option IDs |
| `stock` | boolean | stock toggle | Show in-stock items |
| `include_out_of_stock` | boolean | stock toggle | Include out-of-stock items |
| `recommended_mode` | boolean | recommendations | Personalized grid mode |

---

# D. Supported Sort Values

```ts
type ShopSort =
  | 'price_asc'
  | 'price_desc'
  | 'discount_asc'
  | 'discount_desc'
  | 'new_arrival'
  | 'rating';
```

---

# E. Shop Products Response

The products response returns an array of products.

## Response Shape

```ts
type ShopProductsResponse = {
  products: ShopProduct[];
  category_ids?: number[];
  category_scores?: Record<string, number>;
  user_id?: number | null;
  visitor_id?: string | null;
  reason?: string;
};

type ShopProduct = {
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
  desc_tr: string | null;

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
  ontop: number;
  trending: number;
  highlighted: number;
  most_sold: number;

  personalized_score?: string | number | null;
  product_quality_score?: number | null;

  brand: ShopProductBrand | null;
  offer: ShopProductOffer | null;
  currency: ShopProductCurrency | null;
};

type ShopProductBrand = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  translated_name: string;
  image: string | null;
};

type ShopProductOffer = {
  id: number;
  name: string;
  discount_amount: number;
  discount_type: string;
  start_at: string | null;
  end_at: string | null;
  status: boolean;
  is_active: boolean;
} | null;

type ShopProductCurrency = {
  id: number;
  name: string;
  prefix: string;
  exchange_rate: number;
  delivery_days: string | null;
};
```

## Product Card UI Rules

Show:

- Product image
- Product name
- Brand name
- Final price
- Old price if discount exists
- Discount badge if applicable
- New arrival / featured / trending badge if needed
- Wishlist button if supported
- Add to cart quick action if supported

## Product Fallbacks

- `name_en` and `name_ar` can be `null` in some products.
- Use fallback order:
  1. Current locale name
  2. `name_en`
  3. `name_ar`
  4. `name_tr`
- `image` can be `null`.
- `brand.image` can be `null`.
- `offer` can be `null`.

## Empty States

Support:

- No products found
- Filters return empty
- Loading products
- Error loading products

## Mobile UX

- Filters should open as drawer/bottom sheet.
- Selected filters should appear as removable chips.
- Sort should be accessible at top of grid.
- Clear all filters should be visible.


---

<!-- 03-product.md -->

# 03 - Product Details Page API Documentation

## Purpose

The Product Details Page consists of:

1. Product details
2. Product gallery
3. Variants: colors and sizes
4. Price block
5. Add to Cart
6. Product attributes/specifications
7. Return policy
8. Site features
9. Related products
10. Best sellers
11. Reviews and ratings

---

# A. Single Product Response

## Shape

```ts
type SingleProductResponse = {
  message: string;
  data: {
    product: ProductDetails;
    related_products: ProductCard[][];
    best_sellers: ProductCard[];
    can_rate: boolean;
    product_site_features: SiteFeature[];
  };
};
```

---

# B. Product Details Model

```ts
type ProductDetails = {
  id: number;
  sku: string;
  slug: string;
  company_name: string | null;

  name_en: string | null;
  name_ar: string | null;
  name_tr?: string | null;

  desc_en: string | null;
  desc_ar: string | null;

  image: string;
  files: ProductImage[];

  old_price: string | number;
  final_selling_price: number;
  discount_percentage_selling_price: string | number | null;
  tax_percentage: string | number | null;

  brand: Brand | null;

  groups: ProductGroup[];
  colors: ProductColor[];
  sizes: ProductSize[];

  currency: Currency;
  delivery_days: string | null;

  product_attributes: ProductAttribute[];

  rated: string | number;
  rates_count: number;

  stock: number | null;
  offer: any | null;
  is_sold_out: boolean;
  check_quantity_shown: boolean;

  return_policy: ReturnPolicy | null;

  purchases_count: number;
  views_count: number;

  category_breadcrumbs: CategoryBreadcrumb[];
};
```

---

# C. Product Gallery

```ts
type ProductImage = {
  id: number;
  image: string;
};
```

## UI Rules

- Use `product.image` as the main image.
- Use `product.files[]` as additional gallery images.
- Gallery should support:
  - thumbnails
  - zoom/lightbox if needed
  - mobile swipe
  - fallback image

---

# D. Brand

```ts
type Brand = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  translated_name: string;
  image: string | null;
  slug?: string;
};
```

## UI Rules

- Show brand name.
- Brand image can be null.
- Use text fallback if image is missing.

---

# E. Product Groups

```ts
type ProductGroup = {
  id: number;
  slug: string;
  image: string;
  base_final_selling_price: number;
  final_selling_price: number;
  old_price: number;
  offer: any | null;
};
```

## UI Rules

- Groups can represent related variants/products.
- Use as clickable product/color alternatives if needed.
- Some price fields may be `0`.

---

# F. Colors

```ts
type ProductColor = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  color_code: string | null;
  image: string | null;
  status: number;
  pivot: {
    product_id: number;
    color_id: number;
    inStock: number;
  };
};
```

## UI Rules

- Display color swatch using `color_code`.
- If `image` exists, use it for patterned colors.
- Use `pivot.inStock` to decide availability.
- Out-of-stock colors should appear disabled.
- Show `translated_name` as label/tooltip.

---

# G. Sizes

```ts
type ProductSize = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  status: number;
  sort_order: number;
  pivot: {
    product_id: number;
    size_id: number;
    inStock: number;
    barcode?: string;
  };
};
```

## UI Rules

- Sort by `sort_order`.
- Use `pivot.inStock` to disable unavailable sizes.
- If `status = 0`, size should generally be hidden or disabled depending on UX.
- Show selected size clearly.

---

# H. Currency

```ts
type Currency = {
  id: number;
  name: string;
  prefix: string;
  exchange_rate: number;
  delivery_days: string | null;
};
```

## UI Rules

- Use `currency.prefix` near price if required.
- Delivery days can be shown near shipping/delivery information.

---

# I. Product Attributes / Specifications

```ts
type ProductAttribute = {
  id: number;
  product_id: number;
  attribute_id: number;
  attribute: {
    id: number;
    name: {
      en: string;
      ar: string;
    };
    translated_name: string;
    type: 'select' | 'checkbox' | string;
    filterable: boolean;
  };
  product_options: ProductOption[];
};

type ProductOption = {
  id: number;
  option_id: number;
  option: {
    id: number;
    attribute_id: number;
    name: {
      en: string;
      ar: string;
    };
    translated_name: string;
    image: string | null;
    status: number;
  };
};
```

## UI Rules

- Render as specifications table/list.
- Attribute name = `attribute.translated_name`.
- Values = `product_options[].option.translated_name`.
- Some attributes are filterable but this page should display both filterable and non-filterable when relevant.
- Use accordion/tab if the list is long.

---

# J. Return Policy

```ts
type ReturnPolicy = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  desc: {
    en: string;
    ar: string;
  };
  translated_name: string;
  translated_desc: string;
  period: number;
  returnable: number;
  status: number;
};
```

## UI Rules

- Return policy text can be very long.
- Display inside accordion/tab.
- Use `translated_desc`.
- If `returnable = 0`, show non-returnable message.
- If `return_policy` is null, hide the block.

---

# K. Breadcrumbs

```ts
type CategoryBreadcrumb = {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
};
```

## UI Rules

- Use to render breadcrumb navigation.
- Example:
  - MEN
  - Jackets & Coats
  - Product Name

---

# L. Related Products / Best Sellers

```ts
type ProductCard = {
  id: number;
  sku: string;
  name_en: string | null;
  name_ar: string | null;
  name_tr?: string | null;
  desc_en?: string | null;
  desc_ar?: string | null;
  old_price: string | number;
  discount_percentage_selling_price: string | number | null;
  final_selling_price: number;
  image: string;
  brand: Brand | null;
  category_id: number | null;
  offer: any | null;
  rate: number | null;
};
```

## UI Rules

- `related_products` currently comes as nested array: `ProductCard[][]`.
- Flatten if needed for rendering:
  - `related_products.flat()`
- `best_sellers` can be empty.
- Use same reusable ProductCard component as Home and Shop.

---

# M. Product Site Features

```ts
type SiteFeature = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  } | null;
  translated_name: string;
  translated_description: string | null;
  icon: string | null;
  sort_order: number;
  parent_id: number | null;
  children: SiteFeature[];
};
```

## UI Rules

- Render near Add to Cart or under product info.
- Supports parent/children.
- Icons can be Remix Icon classes.
- Description can be null.
- Use accordion/cards depending on design.

---

# N. Reviews API

## Response Shape

```ts
type ProductReviewsResponse = {
  status: boolean;
  message: string;
  data: PaginatedReviews;
  star_counts: Record<string, number>;
};

type PaginatedReviews = {
  current_page: number;
  data: ProductReview[];

  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  prev_page_url: string | null;

  from: number | null;
  to: number | null;
  total: number;
  per_page: number;
  last_page: number;

  path: string;
  links: PaginationLink[];
};

type ProductReview = {
  id: number;
  comment: string | null;
  rate: number;
  files: ReviewFile[];
  product_id: number;
  user_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  name: string | null;
  user: ReviewUser | null;
};

type ReviewUser = {
  id: number;
  name: string;
  avatar: string | null;
};

type ReviewFile = {
  id?: number;
  image?: string;
  url?: string;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};
```

## Review UI Rules

- Use `data.data[]` as reviews list.
- `star_counts` contains counts per rating.
- Missing star keys should be treated as 0.
- `comment` can be Arabic or English.
- `files` can be empty but UI should support media in the future.
- `user.avatar` can be null, use fallback avatar.
- `name` can be null; prefer `user.name`.
- `next_page_url` controls load more.
- Support empty state when `total = 0`.

---

# O. Product Page Rendering Order

Recommended order:

1. Breadcrumbs
2. Gallery
3. Product title
4. Brand
5. Rating summary
6. Price block
7. Color selector
8. Size selector
9. Add to Cart
10. Product site features
11. Description
12. Specifications / Attributes
13. Return policy
14. Reviews
15. Related products
16. Best sellers

---

# P. Important Edge Cases

- Description can be null.
- Brand image can be null.
- Best sellers can be empty.
- Product can be sold out.
- Some sizes/colors can be out of stock.
- Related products are nested arrays.
- Return policy text is long.
- Reviews may be empty.


---

<!-- 04-navbar.md -->

# 04 - Navbar API Documentation

## Purpose

Used to render:

1. Desktop navigation
2. Mega menu
3. Mobile navigation drawer
4. Category tree

---

# Navbar Categories Response

```ts
type NavbarCategoriesResponse = NavbarCategory[];

type NavbarCategory = {
  id: number;
  admin_id: number;

  name: {
    en: string;
    ar: string;
  };

  menu_name: {
    en: string;
    ar: string;
  };

  translated_name: string;
  translated_desc: string;

  slug: string;
  image: string | null;
  icon: string | null;

  status: number;
  category_id: number | null;

  show_in_navbar: number;
  mark_as_top_category: number;

  list: number;
  top_list: number;
  mobile_top_list: number;
  mark_as_mobile_top_category: number;

  children_count?: number;

  all_children: NavbarCategory[];
  children: NavbarCategory[];
};
```

---

# UI Rules

## Desktop

- Render root categories where `show_in_navbar = 1`.
- Use `menu_name` or `translated_name` as label.
- Use `children[]` for mega menu columns.
- Support at least 3 levels:
  1. Root category
  2. Child category
  3. Sub-child category

Example:

```text
WOMEN
├── DRESSES
│   ├── EVENING DRESSES
│   └── CASUAL DRESSES
└── BAGS
    ├── Backpacks
    └── Picnic Bags
```

## Mobile

- Render as accordion/drawer.
- Use recursive category rendering.
- Use `mobile_top_list` for mobile sorting if needed.
- Highlight categories where `mark_as_mobile_top_category = 1`.

## Links

Use `slug` for category links:

```text
/shop/{slug}
```

or locale equivalent.

---

# Field Notes

| Field | Meaning |
|---|---|
| `category_id = null` | Root category |
| `show_in_navbar = 1` | Can appear in main navbar |
| `mark_as_top_category = 1` | Top/highlighted category |
| `mark_as_mobile_top_category = 1` | Highlighted on mobile |
| `children[]` | Main nested category tree |
| `all_children[]` | Extra children list, can be empty |
| `image` | Category card image |
| `icon` | Root/mobile category icon |

---

# Edge Cases

- `children[]` can be empty.
- `image` can be null.
- `icon` can be null.
- `desc` can be array or object depending on category data.
- Some categories may have `show_in_navbar = 0` but still appear as children.


---

<!-- 05-footer.md -->

# 05 - Footer API Documentation

## Purpose

Used to render:

1. Social links
2. App download links
3. Popup config
4. Footer pages
5. Footer bar pages
6. Top categories

---

# Footer Response

```ts
type FooterResponse = {
  socials_setting: FooterSetting<SocialLink[]> | null;
  popup: FooterSetting<PopupValue> | null;
  apps: FooterSetting<AppDownloadLink[]> | null;

  pages: FooterPage[];
  footer_bar_pages: FooterPage[];
  top_categories: FooterCategory[];
};

type FooterSetting<T> = {
  id: number;
  name: string;
  slug: string;
  key: string | null;
  value: T;
  link: string | null;
  type: string;
  is_image: number;
  status: number;
  translated_key: string | null;
};
```

---

# Social Links

```ts
type SocialLink = {
  image: string;
  link: string;
};
```

## UI Rules

- Render `socials_setting.value[]`.
- Hide if `socials_setting.status = 0`.
- Images can be relative paths like `/uploads/...`.
- Prepend asset base URL if needed.

---

# App Download Links

```ts
type AppDownloadLink = {
  image: string;
  link: string;
};
```

## UI Rules

- Render `apps.value[]`.
- Used for App Store / Google Play buttons.
- Hide if `apps.status = 0`.

---

# Popup

```ts
type PopupValue = {
  text1: {
    en: string;
    ar: string;
  };
  text2: {
    en: string;
    ar: string;
  };
  text3: {
    en: string;
    ar: string;
  };
  button: {
    en: string;
    ar: string;
  };
};
```

## UI Rules

- Show only if `popup.status = 1`.
- Popup CTA link = `popup.link`.
- Text comes from `popup.value`.
- Current response has `status = 0`, so popup should be hidden.

---

# Footer Pages

```ts
type FooterPage = {
  id: number;
  slug: string;

  name: {
    en: string;
    ar: string;
  };

  title: {
    en: string;
    ar: string;
  };

  show_in_footer_bar: number;
  page_category: 'help' | 'support' | 'company' | string;

  translated_name: string;
  translated_title: string;
  translated_desc: string | null;
};
```

## UI Rules

Group pages by `page_category`.

Example:

```text
Help
- Delivery Policy
- Return Policy
- Payment Policies
- Usage Policy
- Privacy Policy
- Terms and Conditions

Support
- Customer Service Phone Number
- Customer Service Email Address

Company
- About Us
```

Use:

```text
/page/{slug}
```

or the project route equivalent.

---

# Footer Bar Pages

```ts
type FooterBarPages = FooterPage[];
```

## UI Rules

- Can be empty.
- If not empty, render as bottom footer links.

---

# Top Categories

```ts
type FooterCategory = {
  id: number;

  name: {
    en: string;
    ar: string;
  };

  menu_name: {
    en: string;
    ar: string;
  };

  translated_name: string;
  translated_desc: string;

  slug: string;
  image: string | null;
  icon: string | null;

  status: number;
  category_id: number | null;

  show_in_navbar: number;
  mark_as_top_category: number;

  list: number;
  top_list: number;
  mobile_top_list: number;
  mark_as_mobile_top_category: number;

  all_children: FooterCategory[];
};
```

## UI Rules

- Render under Popular Categories / Top Categories.
- Sort by `top_list` if needed.
- Use `translated_name`.
- Link via `slug`.
- `image` can be shown if footer design supports visual categories.

---

# Edge Cases

- `footer_bar_pages` can be empty.
- `popup.status` can be 0.
- Social/app images can be relative paths.
- Page descriptions can be null.


---

<!-- 06-mini-cart.md -->

# 06 - Mini Cart API Documentation

## Purpose

Used to render the navbar cart dropdown/drawer.

The response is an array of cart items.

---

# Response Shape

```ts
type NavbarCartResponse = CartItem[];

type CartItem = {
  id: string | number;

  product_id: number;
  quantity: number;

  size: string | null;
  color: string | null;

  selected: boolean;

  price: number;
  old_price: number | null;

  product: CartProduct;
};
```

---

# Cart Product

```ts
type CartProduct = {
  id: number;
  company_product_id: string | null;
  company_name: string | null;

  name_en: string | null;
  name_ar: string | null;
  name_tr: string | null;

  slug: string;
  image: string | null;

  sku: string | null;

  old_price: string | number | null;
  final_selling_price: number;
  base_final_selling_price: number | null;
  discount_percentage_selling_price: string | number | null;
  discount_percentage: number | null;

  stock: number | null;
  check_quantity_shown: boolean;

  brand: CartBrand | null;
  sizes: CartProductSize[];
  colors: CartProductColor[];
  currency: CartCurrency | null;
  offer: CartOffer | null;
};
```

---

# Brand

```ts
type CartBrand = {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  slug?: string | null;
  image: string | null;
  translated_name: string;
};
```

---

# Sizes

```ts
type CartProductSize = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  status: number;
  sort_order: number;
  pivot: {
    product_id: number;
    size_id: number;
    inStock: number;
    barcode?: string;
  };
};
```

---

# Colors

```ts
type CartProductColor = {
  id: number;
  name: {
    en: string;
    ar: string;
    or?: string;
  };
  translated_name: string;
  color_code: string | null;
  image: string | null;
  status: number;
  pivot: {
    product_id: number;
    color_id: number;
    inStock: number;
  };
};
```

---

# Currency

```ts
type CartCurrency = {
  id: number;
  name: string;
  prefix: string;
  exchange_rate: number;
  delivery_days: string | null;
};
```

---

# UI Display

For each cart item show:

- Product image
- Product name
- Brand
- Selected size
- Selected color
- Quantity
- Current price
- Old price if available
- Remove item action
- Quantity controls if supported

---

# Important Rules

- Guest cart item IDs can be strings:
  - `guest_208100_M_كاكي`
- Use cart item `price` for displayed cart item price.
- Use cart item `old_price` for crossed-out price.
- `product.final_selling_price` exists, but `item.price` should be preferred for cart.
- `selected` can be used for checkout selection state.
- Product name fallback:
  1. Current locale name
  2. `name_en`
  3. `name_ar`
  4. `name_tr`
- `product.image` can be null.
- `brand.image` can be null.
- `sizes/colors[].pivot.inStock` can be used if variant editing is supported.

---

# Empty State

If response is empty array:

```json
[]
```

Show:

- Empty cart message
- Continue shopping button
