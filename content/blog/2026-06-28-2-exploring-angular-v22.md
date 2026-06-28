---
title: Exploring Angular v22 Features
publishedAt: 2026-06-28T22:15:00Z
excerpt: A deep dive into the latest stable features of Angular v22, including signals-based reactivity, signal forms, and zoneless rendering.
slug: exploring-angular-v22
---

Angular v22 brings some of the most exciting updates to the ecosystem, pushing the boundaries of what a modern, tree-shakable web framework can do.

Let's look at the standout features:

#### 1. Writable Linked Signals (`linkedSignal`)

Creating dependent state that changes when a source signal changes but remains writable by components has never been cleaner.

```typescript
const count = signal(0);
const multiplier = linkedSignal({
  source: count,
  computation: (c) => c * 2,
});
```

#### 2. Signals Forms (`@angular/forms/signals`)

Now stable in v22, Signal Forms provide native signal-based form control tracking, enabling schema-based validations and type-safe field access without zone overhead.

#### 3. Standard standalone defaults

No more boilerplate `standalone: true` configurations. It's now standalone by default!

These APIs allow us to build portfolio apps that are highly accessible, performant, and delightful to develop.
