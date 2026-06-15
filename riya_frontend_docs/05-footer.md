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
