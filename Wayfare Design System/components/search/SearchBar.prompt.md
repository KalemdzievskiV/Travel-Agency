The hero booking widget — a segmented where/when/who bar with a coral submit. Sits in heroes and sticky destination headers.

```jsx
<SearchBar
  fields={[
    { label: "Where", value: "Maldives" },
    { label: "When", value: "Nov 4 – 11" },
    { label: "Who", value: "2 guests" },
  ]}
  onSearch={() => {}}
/>
```

Props: `fields` (defaults to Where/When/Who), `ctaLabel`, `compact` (two-up stacking for mobile).
