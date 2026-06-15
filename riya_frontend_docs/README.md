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
