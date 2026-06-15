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
