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
