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
