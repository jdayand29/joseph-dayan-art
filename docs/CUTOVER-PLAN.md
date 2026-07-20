# CUTOVER-PLAN.md — Vite (Artora) → Next.js (Joseph Dayan Art)

**Versión 2** — actualizado para cerrar todos los hallazgos de
`docs/CUTOVER-REVIEW.md` (conclusión B). Documento estratégico. Construido
sobre `docs/AUDITORIA-DESPLIEGUE.md` (Alternativa A, aprobada).

**Ejecución en curso en la rama `cutover-preflight`** (no `main`, no
producción). Progreso:

- [x] **PFV-3 — Favicon corregido.** `icons: { icon: '/favicon.svg' }`
  agregado a `metadata` en `src/app/layout.tsx`. Verificado con un build de
  producción real (`next build` + `next start`, no `next dev`): el HTML
  servido ahora incluye `<link rel="icon" href="/favicon.svg">`. Commit
  hecho en `cutover-preflight`.
- [x] **Colisión de `/api/subscribe` resuelta.** `api/subscribe.js` y
  `api/chat.js` borrados. `tsc --noEmit` limpio; confirmado que
  `src/app/api/subscribe/route.ts` sigue intacto y es ahora el único
  resolutor de esa ruta; cero referencias colgantes a los archivos borrados
  en todo el repo (grep de `api/subscribe.js`/`api/chat.js`: vacío).
- [x] **`vercel.json` actualizado.** `"framework": "nextjs"` +
  `"buildCommand": "npm run build:next"`, sin `rewrites` (el catch-all a
  `/index.html` habría roto el enrutamiento de Next.js). JSON validado,
  `tsc --noEmit` limpio.
- [x] **PFV-1/PFV-2 — instalación limpia + build limpio.** `rm -rf
  node_modules && npm ci` (exit 0, mismo mecanismo de instalación que
  Vercel usa a partir del lockfile) seguido de `npm run build:next`:
  `images:check` (`sharp`) OK, `next build` OK (TypeScript incluido, 21
  páginas generadas), y `npm run build` (Vite) también OK sobre el mismo
  `node_modules` fresco. `sharp` deja de ser un supuesto: funciona en una
  instalación limpia, no solo sobre el `node_modules` incremental usado en
  cada fase anterior.
- [x] **PFV-7 — `NEXT_PUBLIC_SITE_URL` en Vercel.** Agregada con
  `vercel env add NEXT_PUBLIC_SITE_URL preview --value
  "https://art-marketplace-ruddy.vercel.app"`, **únicamente en el entorno
  Preview** (verificado con `vercel env ls`: `Environments: Preview`, sin
  Production). Se agrega antes del Preview Deployment (Bloque 6) para que
  ese build ya lea el valor correcto en `metadataBase`, no el fallback
  inexistente.
- [x] **PFV-4 — Preview Deployment real, verificado en su totalidad.** Rama
  `cutover-preflight` pusheada (`git push -u origin cutover-preflight`) —
  Vercel generó automáticamente
  `https://joseph-dayan-bfivf43pm-josephd.vercel.app` (Environment:
  Preview, Status: Ready). Log de build confirma explícitamente:
  `Detected Next.js version: 16.2.10`, `Running "npm run build:next"`
  (no cae a `vite build`), `images:check OK` (Linux real de Vercel, no
  solo macOS), TypeScript incluido en el build, 21 páginas generadas.
  Verificación funcional completa contra esa URL: las 9 rutas → `200`;
  ruta legacy `/explorar` → `404`; `POST /api/subscribe` → `200`
  `{"ok":true}` (resuelto por Next.js, `api/subscribe.js` ya no existe);
  favicon con `<link rel="icon" href="/favicon.svg">` presente; Open
  Graph correcto (`og:image` resuelve a
  `https://art-marketplace-ruddy.vercel.app/...`, confirma que
  `NEXT_PUBLIC_SITE_URL` de Preview se leyó bien); imagen optimizada
  (`/_next/image?...`) → `200` con contenido binario real; Lightbox
  probado con Playwright contra esta URL real (no `next dev`): abre,
  atrapa foco en "Cerrar", `aria-hidden` aplicado al resto del árbol,
  `Escape` cierra y devuelve el foco al trigger; `MobileMenu` probado en
  viewport 375px: abre, lista de navegación completa, botón "Cerrar"
  presente; **cero errores y cero warnings de consola** en toda la sesión
  de pruebas (Home → detalle → lightbox → navegación → menú móvil).

**Hallazgo adicional de esta sesión de ejecución:** `origin/main` en GitHub
está detenido en "Fase E" — las Fases F, G, H, I.0, I.1 e I.2 (9 commits)
solo existían en el repositorio local hasta la creación de la rama
`cutover-preflight`. El push de esa rama será la primera vez que ese
trabajo llegue a GitHub — en una rama, no en `main`. No cambia la seguridad
del plan (producción no se toca), pero es relevante: el Preview Deployment
de esta fase será también la primera vez que Vercel construye remotamente
cualquier código posterior a Fase E.

---

## 1. Estado inicial (verificado)

- **Proyecto Vercel:** `joseph-dayan-art` (`prj_TklvwovFPkQivVnNiUmMG35U8xD6`),
  único proyecto conectado a `github.com/jdayand29/joseph-dayan-art`, rama
  `main` (única rama existente en GitHub hasta ahora).
- **Framework Preset:** `Vite`. **Build Command:** `npm run build` (→
  `vite build`). **Output Directory:** default de Vite (`dist/`).
- **`vercel.json`** (raíz del repo, contenido completo):
  ```json
  {
    "rewrites": [
      { "source": "/api/(.*)", "destination": "/api/$1" },
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- **`package.json` scripts relevantes:**
  ```json
  "dev": "vite",
  "prebuild": "npm run images:check",
  "build": "vite build",
  "dev:next": "next dev",
  "prebuild:next": "npm run images:check",
  "build:next": "next build"
  ```
- **API routes duplicadas (colisión real, verificada):** `api/subscribe.js`
  (función serverless suelta en la raíz, convención de Vercel, contenido
  funcionalmente idéntico — mismo regex de validación, mismo comportamiento
  de solo-log) coexiste con `src/app/api/subscribe/route.ts` (Next.js App
  Router) — ambas resuelven la URL pública `/api/subscribe`.
  `api/chat.js` (usa `@anthropic-ai/sdk`, catálogo hardcodeado del prototipo
  "ColectArt") no tiene equivalente en Next.js y hoy está inerte: no existe
  `ANTHROPIC_API_KEY` en las variables de entorno del proyecto, y el único
  componente que lo consumía (`ChatWidget`) está comentado en `src/App.jsx`.
- **Variables de entorno configuradas (16, todas "Encrypted", Production +
  Preview + Development):** `POSTGRES_*` (7), `SUPABASE_*` (8),
  `NEXT_PUBLIC_SUPABASE_*` incluidas en esas 8. **`NEXT_PUBLIC_SITE_URL` no
  está configurada.**
- **Dominios:** 0 (`vercel domains ls`). Alias activos hoy:
  `art-marketplace-ruddy.vercel.app` (el más antiguo, 12 días),
  `joseph-dayan-art-josephd.vercel.app`,
  `joseph-dayan-art-git-main-josephd.vercel.app`.
- **Bug de metadata ya presente (independiente del cutover, pero relevante
  para él):** `config/site.ts` usa como fallback
  `https://joseph-dayan-art.vercel.app` — un alias que **no existe** en la
  lista real de arriba. Esto afecta `metadataBase` (`layout.tsx`) y por lo
  tanto las URLs absolutas de Open Graph.
- **Bug de favicon: corregido en `cutover-preflight`** (ver arriba). Antes
  de la corrección: `public/favicon.svg` existía y respondía `200`, pero
  `src/app/layout.tsx` no definía ningún campo `metadata.icons` ni existía
  `src/app/icon.*` — no había ningún `<link rel="icon">` en el HTML
  generado.
- **Paridad de entorno Node.js verificada:** local `node --version` →
  `v24.18.0`; Vercel reporta "Node.js Version: 24.x" — coinciden.
- **Lo que sirve hoy en producción:** confirmado por `curl` — el shell HTML
  de Vite, que monta `src/App.jsx` (prototipo "Artora": `RoleGate`,
  `/explorar`, `/subastas`, `/carrito`, etc.), no ninguna ruta de `src/app/`.
- **Next.js (`next build`) ya está verificado limpio** en cada una de las
  últimas 6 fases del Sistema de Diseño (I.0-I.2 incluidas), siempre sobre
  un `node_modules` incremental de macOS — la instalación limpia equivalente
  a la de Vercel es PFV-1/PFV-2, todavía pendiente.

---

## 2. Estado final esperado (de este Preview Deployment)

- El proyecto Vercel `joseph-dayan-art` recibe, en una rama `cutover-preflight`
  (no `main`), un Preview Deployment sirviendo el build de Next.js completo.
- Ese Preview Deployment muestra: favicon correcto, sin colisión de
  `/api/subscribe`, metadata/OG correctos, imágenes optimizadas
  funcionando, lightbox funcional en un build de producción real (no
  `next dev`), navegación completa, cero errores de consola/build.
- **Producción no se toca en ningún momento de esta fase** — el alias de
  producción sigue sirviendo Vite/Artora hasta que se apruebe explícitamente
  un cutover posterior (fuera del alcance de esta fase).
- El proyecto Vite y el código legacy siguen existiendo en el repo — sin
  cambios, sin relación con esta fase.

---

## 3. Lista completa de cambios (alcance de esta fase — rama `cutover-preflight`)

| Área | Cambio | Estado |
|---|---|---|
| `src/app/layout.tsx` | `icons: { icon: '/favicon.svg' }` | ✅ Hecho, commiteado en `cutover-preflight` |
| `api/subscribe.js`, `api/chat.js` | Borrados (colisión con `src/app/api/subscribe/route.ts`; `chat.js` inerte) | Pendiente |
| `vercel.json` | `"framework": "nextjs"`, `"buildCommand": "npm run build:next"`, sin `rewrites` | Pendiente |
| Instalación/build | `rm -rf node_modules && npm ci` + `npm run build:next` limpio | Pendiente |
| Vercel env vars | `NEXT_PUBLIC_SITE_URL` en entorno **Preview** (no Production todavía) | Pendiente |
| Vercel (Git) | Push de `cutover-preflight` → Preview Deployment automático | Pendiente |
| Validación funcional | Favicon, metadata, imágenes, API, Lightbox, navegación, consola, build — todo contra el Preview Deployment | Pendiente |

**Fuera de alcance de esta fase (explícito, por instrucción directa):**
cualquier cambio a `main`, cualquier cambio al alias de producción, cambiar
el Framework Preset del proyecto vía dashboard de Vercel (se prueba primero
en Preview, vía `vercel.json`), el cutover definitivo en sí.

---

## 4. Bloques de ejecución (implementar → verificar → documentar → commit)

Cada bloque se completa y valida antes de continuar al siguiente.

### Bloque 1 — Favicon ✅ Completo

- **Implementado:** `metadata.icons: { icon: '/favicon.svg' }` en
  `src/app/layout.tsx`.
- **Verificado:** `npx tsc --noEmit` limpio; build de producción local
  (`next build` + `next start`, puerto efímero) — el HTML servido en `/`
  contiene `<link rel="icon" href="/favicon.svg">`, confirmado con `curl` +
  grep contra el HTML real.
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** `8c7c355`.

### Bloque 2 — Colisión de `/api/subscribe` ✅ Completo

- **Implementado:** borrados `api/subscribe.js` y `api/chat.js`.
- **Verificado:** `tsc --noEmit` limpio; `src/app/api/subscribe/route.ts`
  confirmado intacto (único resolutor de `/api/subscribe` de aquí en
  adelante); `grep` de `api/subscribe.js`/`api/chat.js` en todo el repo
  (excluyendo `node_modules`/`.git`) sin resultados — sin referencias
  colgantes.
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** siguiente en este mismo turno.

### Bloque 3 — `vercel.json` ✅ Completo

- **Implementado:** archivo reemplazado por:
  ```json
  {
    "framework": "nextjs",
    "buildCommand": "npm run build:next"
  }
  ```
  Se elimina el bloque `rewrites` completo (el catch-all a `/index.html`
  rompería el enrutamiento de Next.js, que no tiene ese archivo).
- **Verificado:** JSON válido (parseado sin error); `tsc --noEmit` limpio.
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** siguiente en este mismo turno.

### Bloque 4 — Instalación y build limpios (PFV-1/PFV-2) ✅ Completo

- **Ejecutado:** `rm -rf node_modules && npm ci` (exit 0) → `npm run
  build:next` (exit 0, `images:check` OK, `next build` OK, TypeScript
  incluido) → `npm run build` (Vite, exit 0, mismo `node_modules`).
- **Verificado:** ningún error en ninguno de los tres; `sharp` funciona
  correctamente en una instalación limpia (no solo sobre el `node_modules`
  incremental de fases anteriores).
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** este bloque no modifica ningún archivo de código (es
  puramente verificación) — solo se commitea la actualización de este
  documento.

### Bloque 5 — `NEXT_PUBLIC_SITE_URL` en Vercel (Preview) ✅ Completo

- **Implementado:** `vercel env add NEXT_PUBLIC_SITE_URL preview --value
  "https://art-marketplace-ruddy.vercel.app"` — únicamente entorno Preview;
  Production queda sin tocar, fuera de alcance de esta fase.
- **Verificado:** `vercel env ls` confirma `Environments: Preview` para esa
  variable, sin Production.
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** este bloque no modifica archivos del repo (es una
  configuración de Vercel) — se commitea solo la actualización de este
  documento.

### Bloque 6 — Push y Preview Deployment ✅ Completo

- **Implementado:** `git push -u origin cutover-preflight`.
- **Verificado:** Vercel generó automáticamente
  `https://joseph-dayan-bfivf43pm-josephd.vercel.app`
  (Environment: Preview). Log de build confirmado línea por línea:
  `Detected Next.js version: 16.2.10`; `Running "npm run build:next"`;
  `images:check OK — 8 imágenes verificadas contra el manifest.`;
  `✓ Compiled successfully`; `Running TypeScript ... Finished TypeScript`;
  21 páginas generadas; `Build Completed`; estado final `Ready`.
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** siguiente en este mismo turno.

### Bloque 7 — Validación funcional completa contra el Preview ✅ Completo

- **Verificado, ítem por ítem (checklist obligatoria del pedido original):**
  - Instalación limpia ✓ (Bloque 4, `npm ci`).
  - Build limpio ✓ (Bloque 4 local + Bloque 6 en Vercel/Linux real).
  - TypeScript limpio ✓ (cada bloque + dentro del build de Vercel).
  - Sitio funcionando en Preview ✓ (`/` → `200`, HTML real de Next.js).
  - Favicon correcto ✓ (`<link rel="icon" href="/favicon.svg">` en el HTML del Preview).
  - Metadata correcta ✓ (`<title>`, `og:title`, `og:description`, `og:image` con la URL real).
  - Imágenes funcionando ✓ (`/_next/image?...` → `200`, contenido binario real).
  - API funcionando ✓ (`POST /api/subscribe` → `200 {"ok":true}`, resuelto por Next.js).
  - Lightbox funcionando en producción real ✓ (Playwright contra el Preview: abre, foco atrapado, `aria-hidden` en el resto, `Escape` cierra y devuelve foco).
  - Navegación completa ✓ (nav de escritorio, `MobileMenu` en 375px, Breadcrumb, todas las rutas verificadas).
  - Ausencia de errores de consola ✓ (cero errores, cero warnings, en toda la sesión).
  - Ausencia de errores de build ✓ (Bloque 6, log completo revisado).
- **Documentado:** esta sección + apartado de progreso arriba.
- **Commit:** siguiente en este mismo turno.

---

## 5. Plan de rollback (sin cambios de fondo)

Esta fase no promueve nada a producción, por lo que el "rollback" aquí es
trivial: si el Preview Deployment falla o algo no valida, se corrige en la
misma rama `cutover-preflight` y se reintenta — producción nunca estuvo en
riesgo. El plan de rollback de dos niveles (operativo inmediato vía `vercel
rollback`, y de código vía `git revert`) sigue reservado para el cutover
real a `main`, documentado en la versión previa de este archivo y sin
cambios: reasignación de alias para el nivel 1, `git revert` del commit de
cutover para el nivel 2.

---

## 6. Checklists

### Checklist de esta fase (Preview, no producción)

- [x] Favicon corregido y verificado (Bloque 1).
- [x] `api/subscribe.js`/`api/chat.js` borrados (Bloque 2).
- [x] `vercel.json` actualizado (Bloque 3).
- [x] Instalación + build limpios verificados (Bloque 4).
- [x] `NEXT_PUBLIC_SITE_URL` en Preview (Bloque 5).
- [x] Rama pusheada, Preview Deployment `Ready` (Bloque 6).
- [x] Validación funcional completa contra el Preview (Bloque 7): metadata,
      imágenes, API, Lightbox, navegación, consola, build — todo en verde.

**Los 7 bloques de esta fase están completos.** Preview Deployment
funcional: `https://joseph-dayan-bfivf43pm-josephd.vercel.app`.
Producción no se tocó en ningún momento — sigue sirviendo Vite/Artora. El
cutover real a `main`/producción queda pendiente de aprobación explícita
separada (ver checklist siguiente, fuera de alcance de esta fase).

### Checklist que queda para una fase posterior (cutover real a producción — NO parte de esta fase)

- [x] `NEXT_PUBLIC_SITE_URL` en Production — agregada (`vercel env ls`
      confirma `Production` además de `Preview`, ambas apuntando a
      `https://art-marketplace-ruddy.vercel.app`).
- [x] Deployment ID de rollback reconfirmado:
      `https://joseph-dayan-6j1c9khmb-josephd.vercel.app` (Vite, `Ready`,
      Production, el más reciente).
- [x] Alias activos reconfirmados: `art-marketplace-ruddy.vercel.app`,
      `joseph-dayan-art-josephd.vercel.app`,
      `joseph-dayan-art-git-main-josephd.vercel.app` — los 3 apuntando hoy
      al deployment de rollback de arriba.
- [ ] Replicar los cambios de esta rama en `main`.
- [ ] Commit + push a `main`.
- [ ] Monitorear build de Production.
- [ ] Verificar los 3 alias de producción.
- [x] Aprobación explícita del usuario recibida — se procede con los pasos siguientes.

---

## 5. Orden exacto de ejecución del cutover real a `main` (fase posterior, requiere aprobación explícita)

Punto de entrada: los 7 bloques de la sección 4 en verde (confirmado) — lo
que sigue ya no es "probar por primera vez", es replicar en `main` una
configuración ya validada en un Preview Deployment real.

### Paso 1 — Confirmar `NEXT_PUBLIC_SITE_URL` en Production

- **Qué cambia:** se agrega/confirma la variable de entorno
  `NEXT_PUBLIC_SITE_URL=https://art-marketplace-ruddy.vercel.app` para el
  entorno **Production** (ya existe en Preview desde el Bloque 5).
- **Por qué:** Next.js incrusta las variables `NEXT_PUBLIC_*` en tiempo de
  build, no en runtime — debe existir antes del primer build de Production,
  o quedaría horneado el fallback incorrecto.
- **Riesgo:** ninguno — agregar una variable no afecta el deployment
  actualmente en producción (sigue siendo Vite, que no la usa).
- **Cómo verificar:** `vercel env ls` debe mostrar `NEXT_PUBLIC_SITE_URL`
  con `Production` en su lista de entornos.

### Paso 2 — Reconfirmar Deployment ID de rollback y aliases activos

- **Qué cambia:** nada — es una captura de evidencia fresca, inmediatamente
  antes de tocar `main`.
- **Por qué:** el deployment ID de Vite "bueno conocido" y los alias activos
  pudieron cambiar desde la auditoría original; PFV-5/PFV-6 exigen
  reconfirmarlos el mismo día, no confiar en datos de sesiones anteriores.
- **Riesgo:** ninguno (solo lectura).
- **Cómo verificar:** `vercel ls joseph-dayan-art` (deployment de Vite en
  Production, estado `Ready`, anotar su URL/ID) y `vercel alias ls`
  (confirmar los alias vigentes).

### Paso 3 — Replicar en `main` los cambios ya validados en `cutover-preflight`

- **Qué cambia:** merge o fast-forward de `cutover-preflight` sobre `main`
  (mismos cambios ya probados en el Preview: `layout.tsx` con favicon,
  borrado de `api/subscribe.js`/`api/chat.js`, `vercel.json` actualizado).
- **Por qué:** ya se verificaron en un Preview Deployment real — este paso
  es una réplica, no un experimento.
- **Riesgo:** bajo — el único riesgo real ya se cerró en el Preview.
- **Cómo verificar:** `git diff main cutover-preflight` antes del merge para
  confirmar exactamente qué se va a aplicar; `npx tsc --noEmit` limpio
  después.

### Paso 4 — Push a `main`

- **Qué cambia:** el estado de `main` en GitHub.
- **Por qué:** Vercel está conectado a `main` vía su integración de Git —
  un push dispara automáticamente un nuevo deployment de Production.
- **Riesgo:** punto de no-retorno operativo — el código previo (Vite) sigue
  sirviendo tráfico sin interrupción hasta que el build nuevo esté listo y
  se promueva (atomicidad estándar de Vercel).
- **Cómo verificar:** `git log origin/main` refleja el commit nuevo; nuevo
  deployment visible en `vercel ls joseph-dayan-art` con `Environment:
  Production`.

### Paso 5 — Monitorear el build en Vercel

- **Qué cambia:** nada todavía en el alias público — el nuevo deployment se
  construye de forma aislada.
- **Por qué:** último punto de detección antes de que algo llegue al alias
  de producción.
- **Riesgo:** que el build falle de una forma no anticipada por el Preview
  (poco probable, misma configuración exacta, pero no descartable al 100%).
- **Cómo verificar:** `vercel inspect <url> --logs` → estado `Ready`; log
  revisado explícitamente por `Detected Next.js version`, `Running "npm run
  build:next"`, `images:check OK`.

### Paso 6 — Verificación funcional contra la URL del deployment (antes del alias)

- **Qué cambia:** nada en el alias público todavía — se verifica primero la
  URL única del deployment de Production.
- **Por qué:** "build exitoso" no garantiza "funcionalmente correcto".
- **Riesgo:** que el sitio "funcione" a nivel HTTP pero tenga un defecto
  funcional.
- **Cómo verificar (misma checklist ya ejecutada contra el Preview en el
  Bloque 7):** rutas en `200`, ruta legacy en `404`, `POST /api/subscribe`
  en `200` con el mensaje de Next.js, favicon presente, metadata/OG
  correctos, imagen optimizada en `200`, Lightbox con foco atrapado/Escape,
  navegación completa, cero errores de consola.

### Paso 7 — Confirmar que los 3 alias de producción apuntan al nuevo deployment

- **Qué cambia:** el tráfico real de los 3 alias.
- **Por qué:** es el paso que efectivamente reemplaza "Artora" por "Joseph
  Dayan Art" para cualquiera que visite esas URLs.
- **Riesgo:** si el Paso 6 no se hizo con cuidado, este es el momento en que
  un defecto no detectado se vuelve visible públicamente.
- **Cómo verificar:** `curl` contra **cada uno de los 3 alias**
  individualmente — cada uno debe devolver el mismo HTML verificado en el
  Paso 6.

---

## 6. Plan de rollback del cutover real (dos niveles, independientes)

### Nivel 1 — Rollback operativo inmediato (segundos, no requiere tocar Git)

Si el Paso 6 o el Paso 7 revelan un problema **después** de que Vercel ya
promovió el nuevo deployment a producción:

```
vercel rollback <url-o-deployment-id-del-deployment-anterior-de-Vite>
```

El deployment ID a usar es el confirmado en el Paso 2 de este mismo turno
(no uno recordado de una sesión anterior). Este comando reasigna el alias
de producción de vuelta al deployment anterior (Vite) — operación de
Vercel, no de código; no requiere revertir el commit ni esperar un build
nuevo.

Verificación post-rollback: `curl` contra los 3 alias — deben volver a
mostrar el shell de Vite.

### Nivel 2 — Rollback de código

```
git revert <hash-del-commit-del-Paso-4>
git push origin main
```

Restaura `vercel.json`, `api/subscribe.js`, `api/chat.js` y el fix de
favicon a su estado anterior en `main` — para que el próximo push no vuelva
a construir la configuración problemática. Se ejecuta *después* del
rollback de Nivel 1 (que ya resolvió lo urgente), no en su lugar.

**Regla explícita de esta ejecución:** si cualquier validación crítica del
Paso 6/7 falla, se ejecuta el rollback de Nivel 1 **inmediatamente**, antes
de intentar diagnosticar o corregir el código — el diagnóstico ocurre
después, con producción ya restaurada.

**Si el build del Paso 5 falla:** no hace falta rollback — producción nunca
dejó el deployment anterior.

---

## 7. Riesgos (de esta fase — Preview únicamente)

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `images:check` falla en Linux por `sharp` | Media hasta que se pruebe (Bloque 4/6) | Bajo — solo afecta al Preview, no a producción | Se descubre y corrige en esta misma rama, sin ningún riesgo para el sitio real |
| Vercel no reconoce el output de Next.js con `buildCommand` envuelto en un script npm | Baja, pero no probada hasta el Bloque 6 | Bajo — mismo motivo | Ídem |
| El Preview Deployment expone datos o comportamiento inesperado | Baja | Bajo — los Preview Deployments de Vercel no son públicos por defecto de la misma forma que producción (requieren la URL específica, no un alias conocido) | Verificación funcional completa antes de considerar la fase cerrada |

---

## 8. Tiempo estimado (de esta fase)

- Bloques 1-5 (implementación + verificación local): ya iniciados, estimado
  20-30 minutos en total.
- Bloque 6 (push + build remoto): 2-5 minutos de espera por el build de
  Vercel.
- Bloque 7 (validación funcional): 15-20 minutos con Playwright/`curl`
  contra el Preview.
- **Sin downtime posible en esta fase** — no se toca producción en ningún
  bloque.

---

## 9. Validación final de esta fase

Cuando los 7 bloques estén completos y en verde, esta fase (Preview
Deployment funcional) queda cerrada. El cutover real a producción **no se
ejecuta** hasta una aprobación explícita separada, con su propio documento
de progreso si corresponde — no se reabre este archivo para eso sin
instrucción directa.
