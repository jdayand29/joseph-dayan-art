# CUTOVER-REVIEW.md — Revisión adversarial de CUTOVER-PLAN.md

Revisión de arquitecto principal, previa a la aprobación final. Objetivo:
encontrar errores, no confirmar que el plan está bien. Todo lo que sigue se
verificó de nuevo contra el repositorio real (lectura únicamente — ningún
comando de este documento modifica nada). Nada se implementó, ningún archivo
cambió, ningún commit se hizo.

---

## Recorrido paso a paso de CUTOVER-PLAN.md

### Paso 0 — Verificación pre-cutover

- **¿Completo?** Parcialmente.
- **¿Falta algún detalle?** Sí: pide correr `npm run build:next` localmente,
  pero el `node_modules` local **no está en el mismo estado que el que
  Vercel usará** — aquí se ha ido instalando incrementalmente (sharp/tsx se
  agregaron en Fase I.0 sobre un `node_modules` ya existente), nunca desde un
  `npm ci` / instalación limpia a partir de `package-lock.json`. Vercel
  siempre construye desde cero.
- **¿Supuesto no verificado?** Que "el build pasa localmente" es equivalente
  a "el build pasará en el entorno real de Vercel (Linux, instalación
  limpia)". No lo es necesariamente — son evidencias relacionadas, no
  idénticas.
- **¿Puede fallar?** Sí — específicamente `sharp` (binario nativo,
  descargado según plataforma) es el candidato más probable a comportarse
  distinto en una instalación limpia sobre Linux que sobre un `node_modules`
  de macOS ya poblado.
- **Condición previa a agregar:** ejecutar, al menos una vez antes del día
  del cutover, un build verdaderamente limpio: `rm -rf node_modules
  package-lock.json && npm install && npm run build:next` (o, mejor aún,
  `npm ci` si el lockfile ya está commiteado tal cual). Esto no es
  "destructivo" en el sentido de tocar producción — es local — pero sí es un
  paso que el plan actual no pide y debería.
- **Validación antes de continuar:** que ese build limpio termine en verde,
  no solo el build incremental ya usado en cada fase.

### Paso 1 — Agregar `NEXT_PUBLIC_SITE_URL`

- **¿Completo?** Sí, en cuanto al qué y al orden (antes del build).
- **¿Falta algún detalle?** El plan no especifica el entorno "Development"
  además de Production/Preview — no es bloqueante (el dev local no depende
  de esta variable para funcionar), pero es una inconsistencia menor frente
  a cómo están configuradas las otras 16 variables (las 16 existentes cubren
  los tres entornos).
- **¿Supuesto no verificado?** Que `https://art-marketplace-ruddy.vercel.app`
  seguirá siendo el alias "canónico" — es el más antiguo (12 días) de los 3,
  pero nada en Vercel lo marca como "el alias principal" de forma explícita;
  los 3 son igualmente válidos hoy. Es una elección razonable, no una
  certeza verificada.
- **¿Puede fallar?** No técnicamente — agregar una env var no rompe nada.
- **Validación antes de continuar:** `vercel env ls` debe mostrarla. Ya
  estaba en el plan.

### Paso 2 — Preparar el commit

- **¿Completo?** No del todo — **aquí está el hallazgo más concreto de esta
  revisión.**
- **¿Falta algún detalle?** El plan no incluye ningún cambio para el
  favicon. Verificado ahora mismo: `public/favicon.svg` existe (usado hoy
  por Vite vía `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
  en `index.html`), pero `src/app/layout.tsx` **no define ningún campo
  `icons` en su `metadata`**, y no existe ningún `src/app/icon.*` ni
  `src/app/favicon.ico` (verificado con `find src/app -maxdepth 1 -type f`:
  solo `layout.tsx`, `page.tsx`, `globals.css`, `template.tsx`). Next.js no
  infiere automáticamente `public/favicon.svg` como ícono si no hay una
  convención de archivo (`app/icon.*`) o un campo `metadata.icons`
  explícito. **Esto ya se había observado empíricamente durante la
  verificación de Fase I.2** (un 404 de `/favicon.ico` en los logs de
  consola de Playwright, en ese momento descartado como "no relacionado" —
  correcto para I.2, pero relevante ahora): el sitio de Next.js hoy no
  muestra ningún favicon en pestaña de navegador. El cutover reemplazaría un
  favicon funcional (Vite) por ninguno (Next.js).
- **¿Supuesto no verificado?** Que `"framework": "nextjs"` es exactamente el
  slug correcto que Vercel espera en `vercel.json`. Es lo que la
  documentación pública de Vercel usa y lo que `vercel project inspect`
  sugiere implícitamente al mostrar "Framework Preset: Next.js" — pero no
  encontré una fuente local (schema de `@vercel/build-utils`, que sí revisé,
  no enumera un `enum` cerrado de valores) que lo confirme con certeza
  matemática. Alta confianza, no evidencia de primera mano.
- **¿Puede fallar?** El borrado de `api/subscribe.js`/`api/chat.js` en sí,
  no — ya se verificó que `src/app/api/subscribe/route.ts` es funcionalmente
  equivalente y que ningún otro archivo legacy llama a `/api/chat` o
  `/api/subscribe` fuera de esos dos (grep repetido en esta revisión sobre
  `src/legacy-pages`, `src/store`, `src/App.jsx`: cero resultados
  adicionales).
- **Condición previa a agregar:** decidir explícitamente sobre el favicon
  antes de continuar — no es bloqueante para que el sitio *funcione*, pero
  sí es una regresión real y evitable con un cambio trivial (agregar
  `icons: { icon: '/favicon.svg' }` a `metadata` en `layout.tsx`, o crear
  `src/app/icon.svg`).
- **Validación antes de continuar:** además de `tsc --noEmit`, revisar
  visualmente el `<head>` del HTML generado localmente por `next build` y
  confirmar si aparece o no un `<link rel="icon">`.

### Paso 3 — Commit y push

- **¿Completo?** Sí.
- **¿Falta algún detalle?** No.
- **¿Supuesto no verificado?** Ninguno nuevo — depende de los pasos
  anteriores.
- **¿Puede fallar?** Solo por error humano (typo en el mensaje, olvidar un
  archivo) — mismo riesgo que cualquier commit.
- **Validación:** ya estaba bien especificada en el plan original.

### Paso 4 — Monitorear el build

- **¿Completo?** Sí en estructura, pero depende de que el Paso 0 se haya
  hecho con el rigor añadido arriba (build limpio, no incremental).
- **¿Falta algún detalle?** El plan no dice explícitamente **qué buscar** en
  el log más allá de "éxito/fracaso". Debería buscarse explícitamente la
  línea de `images:check` (confirmar que corrió y pasó, no que se saltó) y
  cualquier warning de `sharp` sobre plataforma/arquitectura del binario.
- **¿Supuesto no verificado?** Que Vercel reconoce correctamente el output
  de Next.js cuando el `buildCommand` es `npm run build:next` (que invoca
  `next build` indirectamente vía el hook `prebuild:next` de npm) en vez de
  invocar `next build` directamente él mismo. Es un patrón común y
  documentado (monorepos con Turborepo/Nx lo hacen constantemente), pero
  **nunca se ha probado en este proyecto específico** — sigue siendo, hasta
  que corra una vez, una suposición razonable, no un hecho verificado.
- **¿Puede fallar?** Sí, ver los dos puntos anteriores.
- **Validación:** ya estaba bien planteada (esperar `Ready`, no promoción
  automática si falla) — se mantiene.

### Paso 5 — Verificación funcional contra la URL del deployment

- **¿Completo?** La lista de rutas y comportamientos a verificar es buena,
  pero le faltan dos categorías completas que el propio pedido de esta
  revisión exige cubrir: **accesibilidad** y **assets/favicon**.
- **¿Falta algún detalle?** Toda la verificación de accesibilidad de
  `ArtworkLightbox` (foco atrapado, `Escape`, `aria-modal`/`hideOthers`,
  `prefers-reduced-motion`) hecha durante Fase I.2 se hizo contra `next dev`
  (servidor de desarrollo), **nunca contra un build de producción real**
  (`next build` + runtime de producción, que difiere de dev en minificación,
  timing de hidratación, y comportamiento de Strict Mode). No hay evidencia
  de que ese comportamiento sea idéntico en producción — es razonable
  esperar que lo sea, pero no está verificado.
- **¿Supuesto no verificado?** Que el comportamiento verificado en `next
  dev` durante Fase I.2 se traslada sin cambios a producción.
- **¿Puede fallar?** Bajo riesgo real (Radix/Motion no suelen comportarse
  distinto en producción vs. dev para este tipo de interacción), pero no
  verificado.
- **Condición a agregar:** repetir, aunque sea de forma abreviada, la
  verificación de foco/Escape/ARIA del lightbox contra la URL real del
  deployment (no solo contra dev) antes de promover a producción.
  Adicionalmente, confirmar si el favicon se corrigió (Paso 2) o se acepta
  conscientemente como regresión.
- **Validación:** agregar estos dos ítems a la checklist del Paso 5.

### Paso 6 — Confirmar el alias de producción

- **¿Completo?** Sí en intención.
- **¿Falta algún detalle?** El plan dice "confirmar que los 3 alias
  apuntan al nuevo deployment" como si fuera una verificación de 3 pasos
  independientes, pero no aclara **si la reasignación es automática para
  los 3 a la vez** (los 3 alias están vinculados al mismo target de
  Production del proyecto, así que debería ser una sola operación
  automática al promoverse el deployment) o si podría quedar alguno
  rezagado.
- **¿Supuesto no verificado?** Que los 3 alias se actualizan atómicamente
  juntos. Alta probabilidad de ser cierto (es el comportamiento estándar de
  Vercel para alias de un mismo proyecto/target), pero no se verificó
  empíricamente en este proyecto (no se ha hecho ningún cambio de
  Framework Preset todavía).
- **¿Puede fallar?** Bajo riesgo, pero el plan debería decir explícitamente
  "verificar los 3, no asumir que 1 implica los otros 2".
- **Validación:** ya pide repetir el curl contra el alias — extenderlo a los
  3, no solo al primero, sin asumir equivalencia.

---

## Intentos de romper el plan, por categoría

- **Build de Next.js:** único riesgo real (no solo teórico) es `images:check`/`sharp` en un entorno Linux limpio, nunca probado — ver Paso 0/4.
- **Configuración de Vercel:** el slug exacto `"framework": "nextjs"` tiene alta confianza pero no evidencia de primera mano local — ver Paso 2.
- **Root Directory:** sin problema — `.` es correcto para ambos frameworks conviviendo en la raíz, y cada `next build` local ya lo ejercita exactamente así. Sin hallazgos.
- **Framework Preset:** cubierto arriba.
- **Build Command:** correcto en diseño (`npm run build:next` en vez de dejar el genérico `build` ambiguo) — sin hallazgos nuevos más allá de la verificación de que Vercel reconoce el output aun con el comando envuelto en un script npm con `pre`-hook (ver Paso 4).
- **Output:** sin config explícita — correcto para Next.js (no usa un `outputDirectory` convencional). Sin hallazgos.
- **Variables de entorno:** las 16 ya existentes (Postgres/Supabase) no se usan en ningún código — confirmado de nuevo, cero riesgo de que rompan el build. `NEXT_PUBLIC_SITE_URL` es la única relevante, cubierta en el Paso 1.
- **`NEXT_PUBLIC_SITE_URL`:** el valor elegido (`art-marketplace-ruddy.vercel.app`) es una elección razonable pero no la única defendible — ver supuesto oculto en el Paso 1.
- **API Routes:** colisión de `/api/subscribe` ya identificada y resuelta en el plan; verifiqué de nuevo (grep fresco) que no hay ningún otro endpoint legacy fuera de `subscribe`/`chat` — sin hallazgos nuevos.
- **Colisiones de rutas:** ninguna otra encontrada más allá de `/api/subscribe`.
- **Rewrites:** el plan elimina correctamente el catch-all — verificado que `vercel.json` no tiene ningún otro rewrite oculto (el archivo completo ya se leyó, son solo 2 reglas).
- **Redirects:** decisión de no agregar ninguno — sigue siendo defendible (0 dominios, sin indexación conocida, confirmado otra vez con `vercel domains ls` en la auditoría anterior).
- **Middleware:** **verificado ahora, no estaba en el plan original** — no existe ningún `middleware.ts` en el repo. Cero riesgo, pero el plan debería decir explícitamente "no hay middleware, verificado" en vez de no mencionarlo.
- **App Router:** sin hallazgos — cada ruta ya se verificó en cada fase.
- **Metadata:** el bug de `metadataBase` está cubierto; el bug del favicon (ver Paso 2) **no estaba cubierto** y es el hallazgo principal de esta revisión.
- **Open Graph:** depende de `metadataBase` (correcto una vez el Paso 1 se ejecute) y de `artwork.images[0].src` (ya verificado con datos reales en Fase I.1/I.2) — sin hallazgos nuevos.
- **Sitemap:** no existe en Next.js (confirmado en `ESTADO-ACTUAL.md`) — **tampoco existe en Vite hoy** (verificado ahora: `public/` no contiene ningún `sitemap.xml`). El cutover no regresiona nada aquí — es un gap preexistente (Fase K), no algo que el cutover empeore.
- **Robots:** mismo caso que sitemap — ninguno de los dos frameworks lo sirve hoy. Sin regresión, gap preexistente.
- **Imágenes:** cubierto (Vercel Image Optimization automática, sin config custom) — el riesgo real ya identificado es `sharp` en build (Paso 0/4), no la optimización en sí.
- **Assets:** **favicon es el hallazgo real** (ver Paso 2). El resto de `public/` (`artists/`, `icons.svg`) se sirve igual en ambos frameworks porque `public/` es literalmente la misma carpeta compartida — sin riesgo ahí.
- **Caché:** el plan no menciona explícitamente el comportamiento de caché de Vercel al reasignar el alias — supuesto oculto (ver abajo).
- **Dependencias:** `sharp`/`tsx` están correctamente en `devDependencies` (se necesitan solo en build, no en runtime) — razonamiento válido, sin hallazgos nuevos, pero nunca antes verificado explícitamente en un log de Vercel real.
- **TypeScript:** verificado ahora (no estaba en el plan original) — `tsconfig.json`'s `include` solo matchea `**/*.ts`/`**/*.tsx`/`**/*.mts`; los archivos legacy (`.jsx`) y las funciones legacy (`api/*.js`) **nunca fueron parte del type-check**, confirmando que borrarlos no puede romper `tsc --noEmit` por ausencia, y que su presencia previa tampoco lo afectaba. Sin riesgo, pero vale la pena documentarlo explícitamente en vez de asumirlo.
- **Producción:** cubierto en profundidad por el plan (atomicidad de Vercel, no-downtime en el caso exitoso) — sin hallazgos adicionales más allá de los ya mencionados.
- **Rollback:** el mecanismo de dos niveles es sólido; verifiqué el razonamiento de que un rollback de Nivel 1 no depende del estado actual del repo (los deployments de Vercel son inmutables, construidos en su momento) — confirmado como correcto, no como suposición.
- **SEO:** neutral (ver sitemap/robots arriba) — el cutover ni mejora ni empeora el estado SEO actual, salvo por la corrección de `metadataBase` (mejora real, ya en el plan).
- **Accesibilidad:** **hallazgo real** — toda la verificación de Fase I.2 fue contra `next dev`, nunca contra producción (ver Paso 5).
- **Performance:** no hay ninguna medición base (Lighthouse, Core Web Vitals) ni en Vite ni en Next.js — el plan no lo menciona porque no hay nada contra qué comparar. No es un defecto del plan, es un gap general del proyecto (consistente con "cero infraestructura de pruebas" ya documentado en `ESTADO-ACTUAL.md`) — no bloqueante para el cutover, pero tampoco algo que el plan pueda validar hoy.

---

## Supuestos ocultos (explícitos, para que dejen de ser ocultos)

1. Que un build local exitoso (sobre `node_modules` incremental de macOS) predice un build exitoso en Vercel (Linux, instalación limpia) — nunca antes ejercitado end-to-end en este proyecto.
2. Que `"framework": "nextjs"` es el slug exacto — alta confianza, sin verificación de primera mano local.
3. Que Vercel reconoce correctamente el output de Next.js cuando el build command está envuelto en un script de npm con `pre`-hook, en vez de invocar `next build` directamente.
4. Que los 3 alias existentes se actualizan atómicamente juntos al promoverse un nuevo deployment de Production — comportamiento esperado, no verificado en este proyecto.
5. Que el comportamiento de accesibilidad verificado en `next dev` durante Fase I.2 (foco atrapado, Escape, `aria-hidden` en el resto del árbol) se traslada sin cambios a un build de producción.
6. Que no hay ninguna capa de caché de Vercel (edge cache de HTML) que pueda servir una versión vieja del sitio por un período después de la reasignación del alias — el plan asume propagación inmediata sin haberlo puesto a prueba.
7. Que `https://art-marketplace-ruddy.vercel.app` es la elección correcta de "alias canónico" para `NEXT_PUBLIC_SITE_URL` — es razonable (el más antiguo), pero no hay ninguna señal explícita en Vercel de que sea "el principal" frente a los otros dos.

---

## Checklist final del día del cutover (consolidada, sin improvisar)

**Antes de tocar cualquier configuración:**
- [ ] Build limpio verificado: `rm -rf node_modules && npm install && npm run build:next` (no solo el build incremental ya usado en cada fase).
- [ ] `npx tsc --noEmit` limpio sobre ese mismo estado limpio.
- [ ] Revisar visualmente el `<head>` del HTML generado — decidir conscientemente sobre el favicon (corregirlo agregando `metadata.icons`, o aceptar la regresión con conocimiento de causa).
- [ ] Deployment ID/URL actual de producción (Vite) anotado, para rollback de Nivel 1.
- [ ] `vercel env ls` confirmado sin `NEXT_PUBLIC_SITE_URL` todavía.
- [ ] `vercel domains ls` re-confirmado en 0.
- [ ] Confirmado (grep fresco) que no hay otros endpoints `/api/` legacy fuera de `subscribe`/`chat`.
- [ ] Ventana de tiempo sin trabajo concurrente sobre `main`.

**Durante:**
- [ ] `NEXT_PUBLIC_SITE_URL` agregada en Vercel — verificada con `vercel env ls` antes de continuar.
- [ ] `vercel.json` reemplazado; `api/subscribe.js` y `api/chat.js` borrados; (si se decidió corregir) favicon agregado a `metadata`.
- [ ] Commit + push a `main`.
- [ ] Build monitoreado hasta `Ready` — log revisado explícitamente por la línea de `images:check` y cualquier advertencia de `sharp`.
- [ ] Verificación funcional contra la **URL del deployment** (no el alias todavía): rutas, imagen optimizada, `/api/subscribe`, lightbox — **más foco/Escape/ARIA del lightbox repetido en este build real**, **más presencia/ausencia del favicon confirmada**.
- [ ] Alias de producción confirmado — los **3 alias**, no solo el primero.
- [ ] Checklist funcional repetida contra el alias de producción real.

**Después:**
- [ ] Logs de Vercel revisados por errores de runtime no capturados en la verificación inicial.
- [ ] Envío real de prueba a `/api/subscribe` y `/api/contact`.
- [ ] `docs/ESTADO-ACTUAL.md` actualizado — Prioridad 1 marcada como resuelta.
- [ ] Decisión explícita, por separado, sobre cuándo abordar Fase M (limpieza de `src/legacy-*`) y sobre si corregir el favicon si no se hizo en el momento del corte.

---

## Conclusión

### B

**El plan requiere pequeñas correcciones antes de ejecutarse.**

Justificación, usando solo evidencia de esta revisión y de los documentos
existentes: la estrategia central del plan (Alternativa A, cutover en el
mismo proyecto, orden de pasos, mecanismo de rollback de dos niveles) es
sólida y no encontré ningún defecto estructural en ella — el análisis de
colisión de `/api`, la secuencia de `NEXT_PUBLIC_SITE_URL` antes del build,
y la separación entre verificar el deployment individual antes de confiar en
el alias, están todos correctamente razonados y se sostienen bajo esta
revisión adversarial.

Pero encontré una **regresión real y confirmada** (favicon: funciona hoy en
Vite, no funcionaría en Next.js sin un cambio de una línea) que el plan no
contempla, y **cinco supuestos no verificados** que son razonables pero no
están respaldados por evidencia de primera mano en este proyecto específico
(build limpio en Linux, slug exacto de framework, reconocimiento de output
con buildCommand envuelto, atomicidad de los 3 alias, paridad dev/producción
de accesibilidad). Ninguno de estos amerita descartar el plan (opción C) —
son correcciones puntuales y verificaciones adicionales, no un rediseño de
la estrategia. Pero tampoco es honesto decir que el plan está listo para
ejecutarse "sin cambios" (opción A) cuando ya se identificó, con evidencia
concreta del propio repositorio, una regresión real que el documento
original no menciona.
