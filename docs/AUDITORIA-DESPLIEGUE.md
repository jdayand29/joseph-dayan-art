# Auditoría de Despliegue — Prioridad 1

Auditoría puramente investigativa (2026-07-20). **No se modificó ningún
archivo, no se hizo ningún commit, no se cambió ninguna configuración de
Vercel ni de GitHub.** Toda la evidencia de esta sección proviene de
comandos de solo lectura: `git remote`/`git log`/`git ls-remote`, lectura de
archivos del repo, y `vercel inspect`/`vercel project inspect`/`vercel env
ls`/`vercel domains ls`/`curl` contra la URL pública — todos ellos
informativos, ninguno modifica estado.

---

## 1-6. Hechos verificados

**1. ¿Qué proyecto está desplegando Vercel?** Un único proyecto,
`joseph-dayan-art` (`prj_TklvwovFPkQivVnNiUmMG35U8xD6`, org `josephd`),
creado el **08 julio 2026 18:40:38** — el mismo día que el commit inicial del
repositorio.

**2. ¿Qué repositorio está conectado?** `github.com/jdayand29/joseph-dayan-art`
(confirmado por `git remote -v`), rama `main` — es la única rama que existe
en GitHub (`git ls-remote --heads origin`: un solo resultado).

**3. Root Directory:** `.` — la raíz del repo. No hay una subcarpeta
designada; Vite y Next.js conviven en el mismo árbol (`src/` para ambos,
diferenciados por convención de carpetas, no por Root Directory de Vercel).

**4. Build Command:** `npm run build` (equivalente a `vite build`, confirmado
en `package.json`). **No está sobreescrito manualmente** — Vercel lo muestra
como el comando por defecto de su Framework Preset detectado.

**5. Output Directory:** "None" en la configuración del proyecto — es decir,
usa el default del Framework Preset (`Vite` → `dist/`, confirmado
empíricamente: `npm run build` local genera `dist/index.html` +
`dist/assets/*`).

**6. Framework Preset (el dato central):** **`Vite`**. Esto no está en
ningún archivo del repo — es una configuración que vive únicamente en el
proyecto de Vercel (dashboard/API), consultada aquí vía
`vercel project inspect joseph-dayan-art`.

**Qué termina sirviendo realmente al usuario:** confirmado con
`curl https://art-marketplace-ruddy.vercel.app/` — el HTML servido es el
shell de Vite (`<div id="root"></div>` vacío + `<script type="module"
src="/assets/index-*.js">`), no HTML renderizado por Next.js. Ese bundle
monta `src/App.jsx`, que envuelve todo en `AppStateProvider` +
`RoleGate`/`BrowserRouter` con las rutas `/`, `/explorar`, `/subastas`,
`/obra/:id`, `/perfil/:id`, `/publicar`, `/carrito`, `/galeria/:id`,
`/museo/:id` — el prototipo "Artora" original. El `<title>` del HTML sí dice
"Joseph Dayan" (quedó actualizado en el rename técnico del 07-15), pero el
contenido real que se monta en `#root` es el marketplace prototipo, no las
páginas de `src/app/` construidas en las Fases A-I.2.

No existe ningún dominio propio: `vercel domains ls` devuelve **0 dominios**
en toda la cuenta. La única superficie pública son subdominios
`*.vercel.app` (`art-marketplace-ruddy.vercel.app`,
`joseph-dayan-art-josephd.vercel.app`,
`joseph-dayan-art-git-main-josephd.vercel.app`).

---

## 7. Por qué se publica "Artora" en vez de Joseph Dayan Art

Encadenando 1-6: el proyecto de Vercel fue creado el 08 de julio apuntando a
este repo cuando el repo **era** el prototipo "Artora" (`vite build` era el
único build posible en ese momento). El Framework Preset `Vite` quedó fijado
entonces. Todo el trabajo posterior — el pivot de marca, el scaffold de
Next.js, las 12 fases del Sistema de Diseño — se construyó **dentro del mismo
repo, sin que nadie volviera a tocar esa configuración de Vercel**. `vercel
build`/`vite build` siguen siendo, hoy, literalmente el mismo comando que
corría el día 1. No es un bug ni una regresión: es un paso que el plan
siempre reservó para el final (Fase M, "cutover") y que todavía no ha
ocurrido.

## 8. Decisiones históricas que llevaron a esta situación

Reconstruido con `git log --date=short`:

- **08 jul** — `a8ee1f2` "Initial commit: Artora, marketplace de arte
  prototipo". El proyecto de Vercel nace aquí, configurado para Vite porque
  es lo único que existía.
- **08-09 jul** — Iteración sobre el prototipo (filtros, carrito, chat,
  rediseño de roles, remoción de datos ficticios).
- **15 jul** — `5eb1965` "Rename proyecto a Joseph Dayan": decisión
  estratégica de pivotar el repo hacia la marca personal. Inmediatamente
  después, `240e7a9` "Scaffold Next.js app alongside Vite (not yet wired to
  routes)": **decisión deliberada de construir Next.js dentro del mismo repo,
  en paralelo, en vez de empezar un repo/proyecto nuevo** — una estrategia
  razonable para migrar de forma incremental sin perder historia ni tener que
  reconectar todo desde cero. Esta decisión es la raíz técnica de por qué hoy
  existen dos builds posibles (`build` y `build:next`) en el mismo
  `package.json`.
- **15-17 jul** — Fases A-I.2 completas, cada una verificando `tsc`/`next
  build`/`vite build` limpios antes de cada commit (mismo patrón en las 12
  fases) — es decir, el plan siempre mantuvo *ambos* builds funcionando como
  red de seguridad, pero **nunca incluyó, hasta ahora, el paso de cambiar cuál
  de los dos build Vercel usa en producción**. Ese paso simplemente no se ha
  ejecutado todavía.

No hay ninguna decisión errónea identificable aquí — es un paso pendiente del
plan original (Fase M), no una consecuencia de un error.

---

## 9. Alternativas para corregirlo

### Alternativa A — Cutover en el mismo proyecto de Vercel (cambiar Framework Preset a Next.js in situ)

Cambiar el Framework Preset del proyecto existente a `Next.js`, ajustar
`vercel.json` (el rewrite catch-all a `/index.html` debe eliminarse — con
Next.js serviría contra una ruta que ya no existe) y resolver la colisión de
`/api` (ver Riesgos).

- **Ventajas:** una sola URL histórica preservada; cero proyectos duplicados
  que mantener; reutiliza las variables de entorno ya configuradas
  (Supabase/Postgres, 16 variables) sin duplicarlas; el artefacto a servir
  (`next build`) ya está verificado limpio en cada una de las últimas 6 fases.
- **Desventajas:** el cambio ocurre sobre el único proyecto en producción —
  exige coordinar 2-3 ajustes a la vez (Framework Preset + `vercel.json` +
  decisión sobre `api/*.js` legacy) para que el resultado quede coherente en
  un solo paso.
- **Riesgos:** **colisión real y verificada** — existe `api/subscribe.js`
  (función serverless suelta, convención de Vercel) y
  `src/app/api/subscribe/route.ts` (ruta de Next.js) resolviendo la misma
  URL pública `/api/subscribe`; hay que decidir explícitamente cuál se
  conserva antes o durante el corte. `api/chat.js` no tiene equivalente en
  Next.js (y no hay `ANTHROPIC_API_KEY` configurada — confirmado en `vercel
  env ls` — por lo que hoy es una función inerte de cualquier forma).
- **Esfuerzo estimado:** Bajo — configuración + limpieza de 2 archivos, sin
  tocar código de aplicación.
- **Impacto en GitHub:** Ninguno estructural; como mucho un commit para
  `vercel.json` y la decisión sobre `api/*.js`.
- **Impacto en Vercel:** Se reconfigura el proyecto existente; no se crea ni
  se borra ningún proyecto.
- **Impacto en SEO:** Neutral-positivo — no hay dominio propio ni indexación
  conocida todavía (0 dominios), así que no hay nada que perder; es el
  momento más barato posible para hacer este cambio, antes de que exista
  indexación real que gestionar con redirects.
- **Impacto en actualizaciones futuras:** Cierra la brecha entre "lo que se
  construye" (Next.js, verificado en cada fase) y "lo que se despliega"
  (Vite); `vite build` puede conservarse como red de seguridad temporal hasta
  Fase M o retirarse ahí mismo.

### Alternativa B — Proyecto de Vercel nuevo y paralelo, mismo repo, framework Next.js desde el inicio

Crear un segundo proyecto de Vercel conectado al mismo repo, con Next.js
como preset desde el origen; validar ahí con calma; decidir el corte después
(mover el uso de la URL nueva, deprecar la vieja).

- **Ventajas:** cero riesgo para el sitio ya servido durante la validación —
  el proyecto viejo queda intacto hasta que se decida el corte; rollback
  trivial mientras dura la prueba (no se toca nada del proyecto existente).
- **Desventajas:** duplica las 16 variables de entorno en el proyecto nuevo
  (riesgo de desincronización si una cambia en un lugar y no en el otro
  mientras ambos coexisten); dos proyectos en el dashboard apuntando al mismo
  repo durante la transición; sigue exigiendo, al final, una decisión de
  corte equivalente a la Alternativa A — no es una solución final por sí
  sola, es un paso intermedio.
- **Riesgos:** la colisión de `/api` no desaparece, solo se prueba en
  aislamiento primero; riesgo organizacional de que el proyecto viejo quede
  "vivo por inercia" si nunca se ejecuta el paso final de deprecarlo.
- **Esfuerzo estimado:** Medio — mismo trabajo de configuración que A, más
  crear el proyecto, replicar 16 variables de entorno, y un segundo paso de
  decisión/corte posterior.
- **Impacto en GitHub:** Ninguno — Vercel soporta múltiples proyectos
  apuntando al mismo repo sin conflicto.
- **Impacto en Vercel:** Un proyecto nuevo se crea; el viejo permanece sin
  tocar hasta la decisión final (borrarlo o dejarlo inactivo).
- **Impacto en SEO:** Igual de neutral que A hoy (0 dominios), con una
  desventaja marginal: si algo indexara una URL `*.vercel.app` antes del
  corte, tener dos URLs distintas fragmentaría esa indexación — algo que A no
  puede sufrir porque la URL nunca cambia.
- **Impacto en actualizaciones futuras:** mismo beneficio de fondo que A una
  vez completado el corte, con una ventana intermedia de dos fuentes de
  despliegue que hay que recordar cerrar.

### Alternativa C — Repositorio separado para el Next.js (evaluada, no recomendada)

- **Ventajas:** aislamiento total de historia/CI.
- **Desventajas:** fragmenta la historia de commits que hoy documenta
  exactamente el razonamiento de cada fase (`ARCHITECTURE.md`,
  `ESTADO-ACTUAL.md` viven junto al código que describen); contradice la
  estrategia ya deliberada el 15 de julio de mantener todo en un mismo repo
  durante la migración.
- **Riesgos:** documentación desincronizada entre dos repos si alguien edita
  uno y no el otro.
- **Esfuerzo estimado:** Alto — separar historia de git con cuidado
  (subtree/filter-repo) para no perder blame, reconectar Vercel desde cero.
- **Impacto en GitHub:** Alto — repo nuevo, riesgo de pérdida de historia si
  no se hace con cuidado.
- **Impacto en Vercel:** proyecto nuevo necesario de todas formas.
- **Impacto en SEO:** igual que B.
- **Impacto en actualizaciones futuras:** negativo neto — dos repos que
  sincronizar (incluyendo `tailwind.config.js`, compartido hoy entre Vite y
  Next dentro del mismo repo) sin que ninguna decisión anterior del proyecto
  lo justifique.

### Alternativa D — Diferir el corte hasta completar Fase M (borrar legacy primero)

- **Ventajas:** el corte ocurre una sola vez, cuando el código legacy ya no
  exista — sin el paso intermedio de decidir qué hacer con `api/*.js`
  mientras Next.js ya sirve.
- **Desventajas:** mantiene exactamente el riesgo ya cuantificado en
  `ESTADO-ACTUAL.md` (producción sirviendo "Artora") por un tiempo
  indefinido, atado a completar Fases J, K y la limpieza de código.
- **Riesgos:** es el riesgo #1 ya identificado, simplemente extendido —
  ningún trabajo de J/K depende técnicamente de que el corte ya haya
  ocurrido.
- **Esfuerzo estimado:** Bajo hoy (no se hace nada), pero no elimina el
  esfuerzo — solo lo posterga.
- **Impacto en GitHub/Vercel:** ninguno inmediato.
- **Impacto en SEO:** igual de neutral hoy, con exposición creciente (aunque
  leve) a que algo indexe la URL equivocada mientras más tiempo pase.
- **Impacto en actualizaciones futuras:** priva a Fase K (SEO) de tener
  efecto real — un `sitemap`/`robots`/JSON-LD no tiene ningún impacto
  mientras Next.js no esté sirviendo tráfico real.

---

## Recomendación única

**Alternativa A — cutover en el mismo proyecto de Vercel.**

La razón decisiva es un hecho verificado en esta misma auditoría: **no existe
ningún dominio propio** (`vercel domains ls` → 0). La justificación clásica
para un proyecto paralelo (Alternativa B) es evitar tocar DNS/dominio en
caliente — ese riesgo simplemente no existe aquí, porque no hay dominio que
mover. Sin ese riesgo, B solo aporta costo adicional (variables duplicadas,
dos proyectos, un paso de corte posterior de todas formas) sin ningún
beneficio real que A no tenga ya. C no tiene ninguna ventaja que las otras no
cubran, y contradice una decisión ya tomada por el propio proyecto. D
mantiene activo, sin necesidad técnica, el riesgo más severo ya identificado
en `ESTADO-ACTUAL.md`.

La colisión de `/api` (único riesgo real y verificado) existe **en las
cuatro alternativas por igual** — no es un factor que decante hacia ninguna;
hay que resolverla como parte de cualquiera de ellas.

Como arquitecto principal, ejecutaría A: cambiar el Framework Preset a
Next.js, quitar el rewrite catch-all de `vercel.json`, y resolver la
duplicación de `/api/subscribe` a favor de la ruta de Next.js (retirando
`api/subscribe.js`; `api/chat.js` puede retirarse en el mismo paso al no
tener `ANTHROPIC_API_KEY` configurada ni consumidor en la UI actual). Es el
camino de menor esfuerzo, menor superficie operativa, y — dado que no hay
dominio ni indexación que proteger todavía — el de menor riesgo real, no solo
el más simple.

**No se ha ejecutado nada de esto.** Es una recomendación a la espera de tu
aprobación explícita antes de tocar cualquier configuración.
