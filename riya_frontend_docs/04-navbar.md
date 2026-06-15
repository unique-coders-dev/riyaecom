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
