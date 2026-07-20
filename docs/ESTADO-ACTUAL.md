# Estado Actual del Proyecto — Joseph Dayan Art

Auditoría del repositorio en su estado real (commit `2902384`, 2026-07-17).
Todo lo que sigue está verificado directamente en el código — imports, git
log, comentarios ya escritos por fases anteriores, builds y greps — no
asumido a partir de nombres de fase ni de intención recordada de
conversaciones previas. Donde algo proviene únicamente de contexto de
conversación (no del repo), se marca explícitamente como tal.

---

## 1. Fases del Sistema de Diseño realmente implementadas

Verificado por commit (`git log --oneline`) y por consumo real en código, no
por lo que un commit *dice* haber hecho:

| Fase | Contenido | Estado |
|---|---|---|
| A | Tokens (`styles/tokens/*.ts`: color, spacing, radius, shadow, motion, zIndex, layout, typography, opacity, border, focus, theme) | ✅ Completa |
| B | Config centralizada (`config/site.ts`, `config/navigation.ts`, `config/seo.ts`) | ✅ Completa |
| C | Modelo de datos + repositorio readonly (`data/artworks.ts`, `lib/repositories/artworkRepository.ts`) | ✅ Completa |
| D | 37 primitivos en `ui/` | ✅ Completa como construcción — ⚠️ solo 15 de 37 tienen algún consumidor real (ver sección 4) |
| E | 10 primitivos Radix (Dialog, Drawer, Popover, Tooltip, Tabs, Accordion, Select, Checkbox, Switch, Toast) | ✅ Completa como construcción — ⚠️ Toast nunca se monta en el árbol (ver sección 3) |
| F | Motion system (`domAnimation`, catálogo CSS de overlays, `Reveal`/`Stagger`) | ✅ Completa |
| G | Layout system (`MasonryGrid`, `app/template.tsx`) | ✅ Completa |
| H | Navegación (`NavLink`, `MobileMenu`) | ✅ Completa |
| I.0 | Pipeline de metadatos de imagen (`scripts/generate-artwork-image-metadata.ts`, manifest, `images:check`/`images:generate`) | ✅ Completa |
| I.1 | Migración mecánica de dominio (`ArtworkCard`, `CollectionCard`, `SpecTable`, `ArtworkCatalog`, eliminación `image`/`sold`) | ✅ Completa, alcance deliberadamente acotado (ver sección 5) |
| I.2 | `ArtworkLightbox` sobre Radix Dialog + `layoutId`/`domMax`, `Breadcrumb` | ✅ Completa |
| J | **Confirmado por comentario en código** (`ToastProvider.tsx:25`): *"se monta ... el día que el primer consumidor real lo necesite (Fase J: SubscribeForm/ContactForm)"* | ❌ No iniciada |
| K | **Confirmado por comentario en código** (`config/seo.ts:3`): *"El helper que los aplica automáticamente (buildMetadata()) es trabajo de la Fase K (SEO)"* | ❌ No iniciada |
| L | Sin ninguna referencia en el repo (código, `ARCHITECTURE.md`, `MASTER-PLAN.md`). Lo único que existe es un recuerdo de conversación previa ("redefinida como auditoría de integración") — **no verificable como hecho del repositorio, se trata como no confirmado** | ❓ Sin definición confirmada |
| M | **Confirmado por comentario en código** (`styles/tokens/theme.ts:5`): *"al subir a Tailwind v4 (cutover, Fase M) estas variables pasan a ser la fuente real"* — cutover final, elimina Vite/legacy | ❌ No iniciada |

---

## 2. Objetivos completados por fase (resumen verificado)

- **A-C**: tokens, config y repositorio — sin deuda conocida, ya auditados en fases anteriores.
- **D**: los 37 primitivos existen y compilan, pero la mayoría nunca se ha probado contra contenido real (ver sección 4) — su "completitud" es de construcción, no de validación en producción.
- **E**: los 10 primitivos Radix están animados (Fase F) y accesibles (foco/Escape/ARIA vía Radix nativo) — verificado en Dialog/Drawer/Accordion durante sus fases; **Toast es la excepción**: construido y re-auditado, pero nunca montado (ver sección 3).
- **F**: dos catálogos de animación (CSS para overlays, Motion/`domAnimation` para `Reveal`/`Stagger`), ambos con `useReducedMotion` resuelto.
- **G**: `MasonryGrid` centraliza el patrón de columnas; `app/template.tsx` da fade de entrada sin Motion.
- **H**: navegación responsiva completa, `aria-current` corregido.
- **I.0-I.2**: pipeline de imágenes real, dominio migrado al Design System (con alcance acotado, ver sección 5), lightbox accesible con transición de elemento compartido (tercer catálogo de animación, `domMax`).

---

## 3. Deuda técnica pendiente

Ordenada por severidad, con evidencia:

1. **`ToastProvider` nunca se monta** (`grep -rl "ToastProvider" src --include="*.tsx"` fuera de su propia definición: vacío). `layout.tsx` no lo incluye. Si cualquier código llamara `useToast()` hoy, lanzaría `"useToast debe usarse dentro de <ToastProvider>"`. Todo el sistema de Toast (Fases E/F, re-auditado dos veces) es código muerto en producción hasta que algo lo monte y lo consuma — hoy, nada lo hace.
2. **`ContactForm`/`SubscribeForm` son 100% hand-rolled** — `<input>`/`<textarea>`/`<button>` con clases Tailwind duplicadas a mano, sin usar `Input`/`Textarea`/`Button` (los 3 con **0 consumidores reales** en todo el repo). El manejo de error (`status === 'error'`) es un `<p>` de texto plano sin `aria-live`, no anunciado a lectores de pantalla.
3. **Cero infraestructura de pruebas automatizadas.** No existe ningún archivo `*.test.*`/`*.spec.*`, ninguna config de Playwright persistida, ningún workflow de CI (`find` para `.yml`/`.yaml` fuera de `node_modules`: vacío). Toda la verificación de este proyecto hasta hoy fue manual (Playwright vía MCP, ejecutado y descartado por fase) — no hay red de seguridad para regresiones futuras.
4. **SEO real, no solo metadata básica, no existe todavía.** `config/seo.ts` centraliza *valores* (`defaultTitle`, `titleTemplate`, etc.) pero su propio comentario aclara que el helper que los aplicaría (`buildMetadata()`) es trabajo futuro — cada página arma su `generateMetadata` a mano hoy. No hay `sitemap.ts`, `robots.ts`, `opengraph-image`, ni JSON-LD (`grep` de `application/ld+json`/`schema.org`: vacío) en ningún lado.
5. **Dark mode es solo scaffolding.** `theme.ts` define variables para `:root[data-theme="dark"]`, pero no existe ningún `ThemeProvider` ni toggle — ningún elemento del sitio setea `data-theme="dark"` (confirmado por el propio comentario del archivo).
6. **`EmptyState` (Fase D) tiene 0 consumidores** — `ArtworkCatalog` sigue con su propio `<p>` hardcodeado ("No hay obras con este estilo todavía") en vez de usarlo, a pesar de que `EmptyState` fue escrito citando ese texto exacto como su caso de uso previsto.

---

## 4. Componentes fuera del Design System (0 consumidores reales)

Contados por import real (`grep -rl "from '@/components/ui/<Nombre>'"`), excluyendo el propio archivo de definición:

**0 consumidores:** `Accordion`, `AspectRatio`, `Button`, `Checkbox`, `Chip`, `Dialog`, `Divider`, `EmptyState`, `Figure`, `Heading`, `Input`, `Link`, `Popover`, `Prose`, `Quote`, `Section`, `Select`, `Skeleton`, `Spinner`, `Stagger`, `Switch`, `Tabs`, `Tag`, `Textarea`, `Tooltip` — **24 de 37 primitivos**.

Matiz importante sobre `Text` (aparece con "2 consumidores" en un grep superficial): sus únicos importadores son `Figure.tsx` y `EmptyState.tsx` — **ambos con 0 consumidores reales a su vez**. `Text` nunca se renderiza en producción hoy, a pesar de no aparecer en la lista de "0" directos.

**Con consumidor real:** `Avatar`(1), `Badge`(1), `Breadcrumb`(1), `Card`(1), `Container`(3), `Drawer`(1), `IconButton`(4), `MasonryGrid`(3), `Media`(2), `Reveal`(1 + acoplamiento interno de `Stagger`), `Surface`(1, vía `Card`), `Toast`(1, pero — ver sección 3 — el provider que lo orquesta no está montado, por lo que ni siquiera este "consumidor" es alcanzable hoy).

`AspectRatio` y `Dialog`/`Popover`/`Tooltip`/`Accordion`/`Select`/`Checkbox`/`Switch`/`Tabs` en particular: fueron construidos y animados (Fase E/F) pero ninguno tiene todavía un caso de uso real en el dominio — son la superficie más grande de "trabajo hecho sin validar contra necesidad real" del proyecto.

---

## 5. Páginas que siguen usando patrones antiguos

Verificado por `grep` de `mx-auto max-w-*` vs `Container`/`Prose` en cada `page.tsx`:

| Página | Patrón actual | Nota |
|---|---|---|
| `adquirir/page.tsx` | `mx-auto max-w-2xl px-6 py-14` | Diferido explícitamente en Fase I.1 (sin razón obligatoria en esa fase) |
| `diario/page.tsx` | `mx-auto max-w-2xl px-6 py-14` | Ídem |
| `sobre/page.tsx` | `mx-auto max-w-2xl px-6 py-14 text-center` | Ídem — además usa `next/image` manual para el avatar en vez de `Avatar` |
| `contacto/page.tsx` | `mx-auto max-w-xl px-6 py-14` | *Drift* de ancho ya identificado (576px, debería ser ~672px/`max-w-prose`) — decisión ya congelada, ejecución diferida |
| `coleccion/page.tsx` | `mx-auto max-w-6xl px-6 py-14` | Diferido — no tiene ninguna razón obligatoria (no usa campos de `Artwork` que hayan cambiado) |
| `page.tsx` (Home) | 3 secciones con `mx-auto max-w-2xl`/`max-w-6xl` propios | Solo el hero fue tocado (rename obligatorio de `image`→`images[0].src`); el resto, diferido |

Todas estas páginas **funcionan correctamente hoy** — esto no es código roto, es inconsistencia de convención (cada una arma su propio ancho en vez de usar `Container`/`Prose`).

---

## 6. Decisiones arquitectónicas diferidas (identificadas, no descartadas)

- **Adopción de `Prose` en contenido editorial** (Home statement, `/adquirir`, `/diario`, `/sobre`) — decisión ya tomada (Prose = propietaria de la medida de lectura), ejecución pendiente.
- **Corrección de ancho de `/contacto`** (576px → ~672px, `max-w-prose` como utilidad directa, no el componente `Prose`) — decisión congelada, no ejecutada.
- **Avatar en `/sobre` y bloque de precio/CTA en `/obra/[slug]` vía `Card`** — identificados como oportunidades mecánicas de bajo riesgo durante I.1, deliberadamente no incluidos en su alcance.
- **`Stagger` sigue sin consumidores** — decisión explícita (Fase I.1): reservado para un futuro modo CSS Grid de `MasonryGrid` donde el orden del DOM coincida con el orden visual; hoy `columns` no lo permite.
- **Migración a Supabase** (`docs/MASTER-PLAN.md`, sección 14/24) — el repositorio (`artworkRepository.ts`) fue diseñado explícitamente como el único punto que cambiaría, pero la migración en sí no ha comenzado.
- **Tailwind v4** — `theme.ts` ya anticipa el cutover (Fase M) donde las CSS custom properties de `globals.css` pasan a ser la fuente real vía `@theme`; hoy siguen siendo un espejo manual mantenido en dos lugares (`tailwind.config.js` + `globals.css`).

---

## 7. Riesgos antes de seguir desarrollando

Ordenados por severidad real, no por orden de mención:

1. **🔴 La producción actual no muestra el sitio de Joseph Dayan.** `vercel.json` reescribe todo a `/index.html`; `package.json`'s `"build"` (el script que Vercel corre por defecto) es `"vite build"`; `.vercel/project.json` confirma que este es el único proyecto Vercel (`joseph-dayan-art`) — no hay un segundo proyecto apuntando al Next.js. El `App.jsx` de Vite que se sirve hoy monta `Feed`, `Explorar`, `Subastas`, `ArtworkDetail`, `ArtistProfile`, `PublishArtwork`, `Carrito`, `GalleryProfile`, `MuseumProfile` — el prototipo genérico de marketplace multi-artista ("Artora", el commit inicial del repo), con `RoleGate`/roles/subastas/carrito, **nada de esto es el sitio de Joseph**. Cualquier dominio o alias que apunte a este proyecto hoy muestra ese prototipo, no una sola página del trabajo de las Fases A-I.2. Este es, con evidencia, el riesgo más urgente del proyecto — independiente de qué fase del Sistema de Diseño siga.
2. **🟠 Cero red de pruebas automatizadas.** Toda regresión de las últimas 10 fases se detectó manualmente. Un cambio futuro puede romper accesibilidad/comportamiento sin que nada lo detecte antes de un despliegue.
3. **🟠 `ToastProvider` inerte** — si Fase J (u otra) empieza a llamar `useToast()` sin antes montar el provider en `layout.tsx`, la app truena en runtime con un error ya escrito y esperado (`throw new Error(...)`), no un bug silencioso — pero es una dependencia de orden que debe respetarse explícitamente.
4. **🟡 24 de 37 primitivos sin validar contra un caso de uso real** — su API fue diseñada por anticipación (Documento Maestro) pero nunca ejercitada; el primer consumidor real de cada uno seguirá revelando ajustes de API, como ya pasó con `Card` (delta de padding) y `Container` (ancho `detail` agregado en I.1).
5. **🟡 SEO real ausente** — sin sitemap/robots/JSON-LD, el sitio (aún si se despliega) es débil para descubribilidad orgánica desde el día uno.
6. **🟢 Deuda de convención, no de correctness** — las 6 páginas con patrones antiguos (sección 5) funcionan correctamente; el riesgo es solo de mantenibilidad futura (más lugares para olvidar al cambiar un valor de ancho), no de comportamiento roto.

---

## 8. Qué hacer a continuación, por prioridad — con justificación

**No asumo que "J" sea lo siguiente solo por orden alfabético.** Cada punto se justifica por impacto/riesgo real, no por el nombre de fase.

### Prioridad 1 — Decisión de despliegue (no es una "fase" del Design System, es una decisión de negocio/infraestructura)

Antes de invertir más trabajo en el Sistema de Diseño, vale la pena que confirmes: ¿el dominio/alias de producción hoy apunta a este proyecto Vercel? Si sí, cada día que pasa sin resolver el hallazgo de la sección 7.1 es un día en que un visitante real podría encontrar el prototipo de marketplace en vez del sitio de Joseph. Esto no requiere terminar el Sistema de Diseño primero — podría resolverse con un cutover parcial (apuntar `build`/`vercel.json` al output de Next.js) incluso antes de Fases J/K/L, si el riesgo de negocio lo amerita. **Esta es tu decisión, no una recomendación de que yo la ejecute — la señalo porque ninguna auditoría anterior la había cuantificado con esta evidencia.**

### Prioridad 2 — Fase J (SubscribeForm/ContactForm + Toast)

Justificación: es la única fase con **evidencia textual directa en el repo** (`ToastProvider.tsx:25`) de que es la siguiente pieza de dominio prevista, y resuelve simultáneamente tres deudas ya documentadas en la sección 3 (Toast inerte, formularios hand-rolled, `Input`/`Textarea`/`Button` sin validar). Tiene el mismo perfil que I.1/I.2: alcance acotado, consumidores reales inmediatos, sin inventar arquitectura nueva.

### Prioridad 3 — Fase K (SEO)

Justificación: también con evidencia textual directa (`config/seo.ts:3`). Tiene impacto directo en discoverabilidad si el sitio llega a producción, y es independiente de J (no comparte archivos).

### Prioridad 4 — Infraestructura de pruebas (no estaba en el roadmap original con letra propia)

Justificación: cada fase nueva (J, K, y cualquier trabajo posterior) aumenta la superficie que hoy solo se verifica a mano. Vale la pena proponerla como una fase explícita (o como parte de K/J) antes de que el costo de no tenerla crezca más. No es urgente al nivel de la Prioridad 1, pero sí más urgente que "L" (cuyo contenido ni siquiera está confirmado).

### Prioridad 5 — Páginas con patrones antiguos + `Prose` (sección 5/6)

Justificación: deuda de convención, no de comportamiento — correcto seguir difiriéndola hasta que haya una razón obligatoria para tocar esas páginas (mismo criterio que ya se aplicó en I.1), salvo que decidas que vale la pena una fase dedicada de consistencia editorial.

### Prioridad 6 — Fase L (contenido no confirmado) y Fase M (cutover)

Justificación: L no tiene definición verificable en el repo — antes de planearla necesito que la definas explícitamente (no la voy a inferir). M (cutover) depende de que Tailwind v4 y el resto del Sistema de Diseño estén más maduros; además, si la Prioridad 1 se resuelve por separado (ej. apuntando el build de Vercel al output de Next.js sin esperar a M), parte de su urgencia ya quedaría mitigada — pero el cutover de código (borrar `legacy-pages`/`legacy-data`/`store`) seguiría pendiente como limpieza final.

---

## Roadmap propuesto (si decides reorganizar)

```
Prioridad 1 — Decisión de despliegue (negocio, no Design System)
Prioridad 2 — Fase J: SubscribeForm/ContactForm + ToastProvider montado
Prioridad 3 — Fase K: SEO (buildMetadata, sitemap, robots, JSON-LD)
Prioridad 4 — Infraestructura de pruebas (nueva, sin letra en el roadmap original)
Prioridad 5 — Consistencia editorial (páginas diferidas de I.1 + Prose)
Prioridad 6 — Fase L (pendiente de que definas su contenido) + Fase M (cutover)
```

Esto no descarta el orden original — J/K siguen siendo J/K, con evidencia real de que así estaban planeadas. Lo que agrego es la Prioridad 1 (no estaba en ninguna letra) y elevo la infraestructura de pruebas a un lugar explícito antes de L, dado que L no tiene contenido confirmable hoy.
