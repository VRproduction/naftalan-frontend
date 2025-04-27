# Using Translations in the Naftalan Project

This document explains how to use the internationalization (i18n) system in the Naftalan project.

## Structure

The project uses the `next-intl` package for internationalization. Here's how it's structured:

- **Configuration**: The i18n config is in `/src/i18n/` folder
- **Translation Files**: Messages are stored in `/messages/{locale}.json` files
- **Locales**: The project supports `az` (Azerbaijani) and `ru` (Russian)

## How to Add Translations

1. Add new translation keys to the message files:
   - `/messages/az.json` for Azerbaijani
   - `/messages/ru.json` for Russian

2. Organize translations in namespaces (e.g., `header`, `form`, etc.) to keep them organized

## Using Translations in Components

### In Client Components:

```jsx
'use client'
import { useTranslations } from 'next-intl';

function MyComponent() {
  // Get translations for a specific namespace
  const t = useTranslations('header');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### In Server Components:

```jsx
import { useTranslations } from 'next-intl/server';

export default function MyServerComponent() {
  const t = useTranslations('namespace');
  
  return <h1>{t('title')}</h1>;
}
```

## Language Switching

The project is set up with localized routes using the `[locale]` parameter in the URL.

To switch languages, use the `useRouter` hook from `@/i18n/navigation`:

```jsx
import { useRouter } from '@/i18n/navigation';

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const changeLanguage = (locale) => {
    router.push(pathname, { locale });
  };
  
  return (
    <button onClick={() => changeLanguage('ru')}>
      Switch to Russian
    </button>
  );
}
```

## Example

See `/src/components/examples/TranslationExample.tsx` for a working example of using translations in a form component.

## Best Practices

1. Always use translation keys instead of hardcoded text
2. Organize translations in logical namespaces
3. Keep translation keys simple and descriptive
4. Maintain consistency in naming conventions (e.g., `user_profile`, not a mix of `userProfile` and `user_profile`)
5. Use meaningful namespaces that match your feature organization 