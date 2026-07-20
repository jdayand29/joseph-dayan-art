# PRODUCT-ROADMAP.md — Joseph Dayan Art

**Hoja de ruta oficial del producto.** Desde este documento en adelante, el
trabajo se organiza por versiones de producto, no por fases del Sistema de
Diseño. Las Fases A-I.2 (`docs/ARCHITECTURE.md`) cerraron la base técnica;
Joseph Dayan Art ya es el sitio real en producción
(`docs/CUTOVER-PLAN.md`). Este documento no repite esas auditorías — las
usa como insumo y mira hacia adelante.

---

## La pregunta que responde este documento

**¿Qué debemos construir a partir de hoy para convertir Joseph Dayan Art en
un producto profesional de primer nivel?**

Respuesta corta, desarrollada en el resto del documento: hoy el sitio es una
**vitrina excelente sin una puerta de venta**. La base técnica (Design
System, accesibilidad, performance, arquitectura de datos lista para
Supabase) es más sólida que la de la mayoría de sitios de artistas
independientes — pero un comprador listo para pagar hoy no tiene ningún
camino para hacerlo, el sitio no tiene dominio propio, y la credibilidad
institucional (exposiciones, prensa, biografía real) que el propio
Documento Maestro define como parte central del posicionamiento
(`docs/MASTER-PLAN.md`, secciones 4-5) todavía no existe en el contenido
real. Convertir esto en un producto de primer nivel es, en ese orden,
**cerrar la vitrina (dominio + SEO + limpieza), abrir la puerta de venta
(comercio real), y llenar la credibilidad (contenido institucional)** —
antes de construir nada nuevo y más ambicioso.

---

## Evaluación del producto por perspectiva

Basada en el estado real del sitio hoy (`art-marketplace-ruddy.vercel.app`),
no en aspiraciones.

### Como visitante

La experiencia de navegación es genuinamente buena: masonry con proporciones
reales (no recortes cuadrados forzados), transiciones cuidadas, lightbox con
foco atrapado y transición de elemento compartido, navegación móvil
correcta. Pero el sitio se siente **nuevo y sin historia** — no hay
biografía real, no hay exposiciones, no hay prensa, `/diario` está vacío.
Un visitante que llega por primera vez no tiene ninguna señal de que Joseph
Dayan sea un artista establecido, más allá de la calidad visual del sitio
mismo.

### Como coleccionista

Puede ver la obra con el nivel de cuidado que el Documento Maestro promete
(cartela técnica, fotografía protagonista, sin ruido decorativo). Pero no
hay ninguna forma de **expresar interés formal** más allá de un formulario
de contacto genérico, no hay indicación de disponibilidad más allá de
"vendida"/"no disponible"/precio, y no hay ningún historial de procedencia
o certificación más allá de la ficha técnica.

### Como comprador potencial (listo para pagar hoy)

Este es el hallazgo más importante de todo el documento: **el botón
"Adquirir esta obra" lleva a una página que dice literalmente "el flujo de
adquisición... está en construcción... escríbeme directamente"**
(`src/app/adquirir/page.tsx`, sin cambios desde su creación). No existe
Stripe, no existe Printful, no existe ningún mecanismo de pago (confirmado:
cero referencias a `stripe`/`printful` en `package.json`). Doce días de
ingeniería construyeron una vitrina impecable con **cero puerta de venta**.
Cualquier comprador real hoy termina, en el mejor caso, escribiendo un
correo y esperando una respuesta manual.

### Como galería evaluando representación

Buscaría exactamente lo que hoy falta: historial de exposiciones, prensa,
un statement de práctica artística real. `Artist.biography`,
`Artist.statement`, `Artist.exhibitions`, `Artist.awards`, `Artist.press`
existen como campos en el modelo de datos desde Fase C — **todos `null`/`[]`
hoy**, no por decisión de diseño sino porque el contenido real todavía no
se ha redactado/provisto.

### Como curador

Buscaría el mismo contenido que una galería, más textos curatoriales por
colección — que sí existen (`Collection.description`) pero son de una sola
oración cada uno, no el storytelling de museo que el Documento Maestro
describe en su sección 8.

### Como artista que quiere mostrar su trabajo (evaluando este sitio como referencia/plantilla)

Aquí el proyecto sí cumple lo prometido: el Sistema de Diseño fue construido
deliberadamente portable (tokens, repositorio desacoplado de la fuente de
datos, arquitectura lista para Supabase) — confirmado en
`docs/MASTER-PLAN.md` sección 23 y validado en la práctica durante las
Fases A-I.2. **Esta es una fortaleza real, no algo por corregir.**

---

## Funcionalidades priorizadas por impacto

En orden, con la razón por la que cada una merece construirse antes que la
siguiente:

1. **Comercio real (Stripe Checkout para originales).** Es la brecha de
   mayor impacto de negocio posible: hoy no existe ningún camino de compra.
   Todo lo demás en este documento importa menos si un comprador listo no
   puede completar una transacción.
2. **Dominio propio.** El sitio vive en `art-marketplace-ruddy.vercel.app`
   — una URL que activamente contradice el posicionamiento de "sitio
   oficial de un artista reconocido" (`MASTER-PLAN.md`, sección 4). Es
   barato, rápido, y cada día sin él es una oportunidad perdida de
   credibilidad de marca.
3. **SEO real (sitemap, robots, JSON-LD, dominio en metadata).** Sin esto,
   el sitio es prácticamente invisible para descubrimiento orgánico —
   irrelevante mientras no haya dominio propio (se benefician mutuamente,
   por eso van juntos en la misma versión).
4. **Eliminar el código legacy de Vite/Artora.** No es solo limpieza: el
   propio Documento Maestro (sección 22) ya había decidido explícitamente
   qué eliminar ("roles, galerías/museos, explorador cruzado, subastas,
   carrito multi-ítem, pagos simulados"), y desde el cutover ese código no
   cumple ningún propósito operativo — solo riesgo de confusión y peso
   muerto en el repositorio.
5. **Contenido institucional real (biografía, exposiciones, prensa).**
   Alto impacto de credibilidad, pero requiere que Joseph provea el
   contenido — es una dependencia de negocio, no de ingeniería; se prioriza
   después de comercio/dominio porque sin comercio, tener más credibilidad
   sin forma de convertirla en venta tiene menos retorno inmediato.
6. **Prints numerados (Printful).** Segunda línea comercial ya definida
   como prioridad V1 en el Documento Maestro — puerta de entrada de precio
   más bajo que los originales.
7. **Formularios reales + Toast (Fase J, ya diseñada).** Mejora de
   confianza percibida (validación de errores, feedback claro) — impacto
   real pero menor que comercio/dominio/SEO.
8. **Commissions estructurados.** Alto valor pero depende de que ya exista
   un flujo de pago (originales) probado primero — no tiene sentido
   estructurar encargos antes de saber que el comercio directo funciona.
9. **Círculo de coleccionistas / lista privada con nivel.** Requiere una
   base de coleccionistas real primero (que a su vez requiere que el
   comercio ya esté funcionando) — prematuro antes de tener compradores
   reales que "graduar" a un círculo.

---

## Clasificación

### Imprescindible (próximos meses)

- Comercio real: Stripe Checkout para originales.
- Dominio propio.
- SEO real (sitemap, robots, JSON-LD, metadata ya corregida en el cutover).
- Eliminar código legacy de Vite/Artora (Fase M).
- Formularios reales (Input/Textarea/Button) + `ToastProvider` montado (Fase J).
- Contenido institucional real: biografía, statement, exposiciones, prensa (dependencia de Joseph, no solo de ingeniería).

### Importante (aporta mucho valor, puede esperar)

- Prints numerados vía Printful.
- Commissions estructurados (formulario + estado, no solo email).
- Infraestructura de pruebas automatizadas/CI (ningún test existe hoy;
  importante pero no bloquea al usuario final).
- `/diario` con contenido real (proceso, textos curatoriales) — depende de
  contenido real, mismo tipo de dependencia que el punto institucional de
  arriba.
- Migración a Supabase (cuando el catálogo lo justifique — hoy 8 obras no
  lo justifican).

### Futuro (cuando el producto madure)

- Círculo de coleccionistas / membresía con acceso anticipado.
- Internacionalización (`/en`) — explícitamente diferido a "fase 2" desde
  el Documento Maestro original, decisión que se sostiene.
- Escultura, libros/publicaciones, licensing, merchandising premium,
  experiencias privadas — todos explícitamente V2-V3 en el Documento
  Maestro, sin evidencia hoy de que adelantarlos aporte más que las
  prioridades de arriba.
- NFTs/certificado on-chain — "evaluación continua" en el Documento
  Maestro, correctamente sin comprometerse todavía.
- Integración API con ColectArts.
- Dark mode (tokens ya existen, sin `ThemeProvider` — cosmético, sin
  urgencia de negocio detrás).

---

## Roadmap por versiones

### v1.1 — Cerrar la vitrina

**Objetivo:** que el sitio deje de tener deuda de lanzamiento — dominio
propio, SEO real, y cero código legacy — antes de construir nada nuevo.

**Funcionalidades:** ninguna funcionalidad de cara al usuario final; esta
versión es infraestructura y limpieza.

**Mejoras técnicas:**
- Dominio propio configurado y apuntando al proyecto de Vercel.
- `sitemap.ts`, `robots.ts`, JSON-LD (`VisualArtwork`/`Person`) por ruta.
- Eliminación completa de `src/legacy-pages/`, `src/legacy-data/`,
  `src/store/`, `src/App.jsx`, `src/main.jsx`, dependencias de Vite ya sin
  uso (`react-router-dom`, `@vitejs/plugin-react`, etc.), `vite.config`.
- `package.json` simplificado a un solo pipeline de build (Next.js).

**Mejoras de UX:** ninguna directa — el usuario final no debería notar
ningún cambio funcional.

**Mejoras de negocio:** la URL del sitio pasa de una URL de infraestructura
(`art-marketplace-ruddy.vercel.app`) a una URL de marca — el primer
requisito no negociable para que cualquier material de prensa, tarjeta de
presentación o publicación pueda referenciar el sitio.

**Riesgos:** bajo — mismo perfil de riesgo ya gestionado durante el
cutover (rollback disponible, verificación antes de promover). El borrado
de Vite/legacy es irreversible en el sentido de que ese código no vuelve,
pero ya no tiene ningún consumidor real desde el cutover.

**Dependencias:** ninguna — todo el trabajo ya está identificado y
parcialmente diseñado (SEO ya tenía un helper previsto,
`config/seo.ts:3`).

**Criterio de aceptación:** dominio propio resuelve y sirve el sitio;
`sitemap.xml`/`robots.txt` accesibles; Lighthouse SEO ≥ 95; cero archivos de
Vite/legacy en el repositorio; `npm run build` (único pipeline) limpio.

**Prioridad:** **Máxima.** Es la versión de menor riesgo y mayor certeza de
todo el roadmap — no depende de que Joseph provea nada, no depende de
integraciones externas, y elimina deuda que ya no tiene ninguna
justificación para seguir existiendo.

---

### v1.2 — Abrir la puerta de venta

**Objetivo:** que un comprador listo hoy pueda completar una compra de un
original sin escribir un correo y esperar.

**Funcionalidades:**
- Stripe Checkout para obras originales disponibles.
- Webhook que marca la obra como `sold` automáticamente al completarse el pago.
- Página de confirmación de compra.
- Actualización del bloque de precio/CTA en `/obra/[slug]` (hoy hardcodeado,
  candidato natural para adoptar `Card`/`Surface` en el mismo cambio, ya
  identificado como oportunidad menor en Fase I.1).

**Mejoras técnicas:** primera integración de pagos del proyecto; primer
consumidor real de un webhook; decisión de dónde vive el estado de una
transacción (probablemente el primer caso de uso real que justifique
adelantar la migración a Supabase, o al menos una tabla mínima fuera del
array en memoria actual).

**Mejoras de UX:** el CTA "Adquirir esta obra" deja de ser una promesa
rota; estado de carga/error del checkout con el mismo cuidado ya aplicado
al lightbox y los formularios.

**Mejoras de negocio:** convierte la vitrina en un canal de venta real —
es, con evidencia, la brecha de mayor impacto de todo el producto.

**Riesgos:** el más alto del roadmap — dinero real, necesidad de manejar
errores de pago, disputas, reembolsos, y de decidir dónde vive el estado
transaccional de forma confiable (no en un array en memoria que se resetea
en cada build). Requiere manejo cuidadoso de webhooks (idempotencia,
verificación de firma).

**Dependencias:** cuenta de Stripe configurada; decisión sobre persistencia
del estado de "vendida" (hoy vive en `data/artworks.ts`, un archivo de
código — no es sostenible una vez que las ventas ocurren en tiempo real).

**Criterio de aceptación:** una compra de prueba (modo test de Stripe)
completa el flujo end-to-end y la obra pasa a `status: 'sold'` sin
intervención manual; manejo de error visible y claro si el pago falla.

**Prioridad:** **Máxima**, inmediatamente después de v1.1. Es la versión
que más justifica todo el trabajo de diseño ya invertido.

---

### v1.3 — Credibilidad institucional + segunda línea comercial

**Objetivo:** que el sitio deje de sentirse "nuevo" y refleje una práctica
artística real y documentada, y que exista una segunda vía de compra de
menor precio de entrada.

**Funcionalidades:**
- Biografía, statement y exposiciones reales de Joseph (contenido
  provisto por Joseph, no generado).
- Entidades `Exhibition`/`Publication` (ya nombradas en el modelo de datos
  del Documento Maestro, sección 14, nunca construidas) para historial de
  exposiciones y prensa.
- Prints numerados vía Printful, con certificado de edición.
- Formularios (`ContactForm`/`SubscribeForm`) migrados a los primitivos del
  Design System + `ToastProvider` montado (Fase J, ya diseñada).

**Mejoras técnicas:** dos entidades nuevas en el modelo de datos
(`Exhibition`, `Publication`); integración con Printful (fulfillment,
webhook de estado de edición).

**Mejoras de UX:** `/sobre` deja de ser un perfil mínimo y pasa a tener
biografía real, exposiciones, prensa; feedback de formularios vía Toast en
vez de un párrafo condicional hardcodeado.

**Mejoras de negocio:** activa la línea comercial de "puerta de entrada"
que el Documento Maestro definió como prioridad V1 (prints) y cierra la
brecha de credibilidad identificada en la evaluación por perspectiva
(galería/curador) de este mismo documento.

**Riesgos:** el contenido institucional depende enteramente de que Joseph
lo redacte/provea — no es un riesgo técnico, es una dependencia de negocio
que puede volverse el cuello de botella real de esta versión.

**Dependencias:** contenido real de Joseph (biografía, exposiciones,
prensa); cuenta de Printful configurada.

**Criterio de aceptación:** `/sobre` muestra biografía/exposiciones/prensa
reales (no `null`); un pedido de prueba de print numerado completa su flujo
con Printful; `ContactForm`/`SubscribeForm` usan `Input`/`Textarea`/`Button`
y notifican vía Toast.

**Prioridad:** **Alta**, en paralelo con o inmediatamente después de v1.2 —
no bloquea la venta de originales, pero cierra la segunda brecha más
importante identificada (credibilidad + segunda línea de precio).

---

### v2.0 — Escala y relación de largo plazo

**Objetivo:** pasar de "sitio que vende obras" a "infraestructura de
relación con coleccionistas", una vez que exista una base real de
compradores desde v1.2.

**Funcionalidades:**
- Commissions estructurados (formulario + estado del encargo, no solo un
  correo).
- Círculo de coleccionistas / lista privada con nivel de acceso.
- Internacionalización (`/en`), activando lo que el Documento Maestro ya
  preparó desde el diseño de marca (sección 6) pero decidió no activar en
  v1.
- Migración a Supabase si el catálogo ya lo justifica para entonces.

**Mejoras técnicas:** autenticación mínima para el círculo de
coleccionistas (sin construir una red social — el propio Documento Maestro,
sección 20, ya descarta explícitamente foros/comentarios públicos);
infraestructura de pruebas automatizadas/CI, si no se abordó antes.

**Mejoras de UX:** relación continuada con coleccionistas existentes
(acceso anticipado a obra nueva), no solo transacción única.

**Mejoras de negocio:** convierte compradores puntuales en relación de
largo plazo — exactamente el modelo de negocio ya definido
(`MASTER-PLAN.md`, sección 18: "pirámide de compromiso creciente").

**Riesgos:** alcance ambicioso si se intenta todo a la vez — recomendable
dividir en v2.0/v2.1 según qué madure primero (comisiones vs. círculo vs.
i18n).

**Dependencias:** v1.2 (comercio) debe estar generando ventas reales antes
de que un "círculo de coleccionistas" tenga sentido — no se puede construir
comunidad de compradores sin compradores.

**Criterio de aceptación:** a definir con más detalle cuando v1.2/v1.3
generen datos reales de uso — prematuro fijar criterios de aceptación
precisos hoy para funcionalidades que dependen de comportamiento de
usuarios que todavía no existen.

**Prioridad:** **Media** — importante, pero solo tiene sentido después de
v1.2/v1.3, no en paralelo.

---

### Futuro — Extensión de marca (sin versión numerada todavía)

Escultura, libros/publicaciones, licensing/colaboraciones, merchandising
premium, experiencias privadas para el círculo de coleccionistas,
evaluación de NFTs/procedencia on-chain, integración API con ColectArts.
Todos ya tienen un lugar explícito en el Documento Maestro (secciones 17,
23) con su propio horizonte (V2-V3) — no se detalla más aquí porque
construir sobre esto hoy, antes de v1.1-v2.0, sería exactamente el tipo de
"ruido ajeno a la obra" que la Dirección Creativa del propio proyecto
(`MASTER-PLAN.md`, sección 9) ya se comprometió a evitar.

---

## Recomendación final — si yo fuera el CTO responsable durante el próximo año

**Qué construiría:** en este orden, sin solaparlos: v1.1 (dominio + SEO +
borrar legacy) primero porque es barato, rápido, y de riesgo casi nulo;
v1.2 (Stripe) inmediatamente después porque es la brecha de mayor impacto
de negocio de todo el producto; v1.3 (contenido institucional + Printful +
Fase J) en paralelo con el cierre de v1.2, ya que gran parte depende de
Joseph y no de mí. v2.0 solo después de que v1.2 esté generando datos
reales de compradores.

**Qué NO construiría:** ningún componente nuevo del Design System sin un
consumidor real inmediato (mismo principio que ya rigió las Fases D-I.2,
que no debería abandonarse solo porque cambiamos de "fases" a
"versiones"); ninguna funcionalidad de comunidad pública (comentarios,
foros, feed social) — el Documento Maestro ya decidió explícitamente que la
comunidad es una lista curada de relaciones reales, no una red social, y no
he encontrado evidencia que amerite revisar esa decisión; ningún chatbot de
ventas (`api/chat.js` existía en el prototipo legacy, dependía de una
`ANTHROPIC_API_KEY` nunca configurada, y un asistente conversacional de
"venta" es tonalmente inconsistente con la voz de marca ya definida —
"frases cortas, sin superlativos de venta", `MASTER-PLAN.md` sección 6).

**Qué eliminaría:** todo `src/legacy-pages/`, `src/legacy-data/`,
`src/store/`, `src/App.jsx`, `src/main.jsx` y las dependencias de Vite que
solo ellos usan — no como limpieza cosmética, sino porque el propio
Documento Maestro (sección 22) ya había decidido eliminar exactamente ese
contenido ("roles, galerías/museos, explorador cruzado, subastas, carrito
multi-ítem, pagos simulados"), y desde el cutover no cumplen ningún
propósito operativo.

**Qué simplificaría:** las 6 páginas que hoy usan anchos ad-hoc en vez de
`Container`/`Prose` (identificadas en Fase I.1) — no ameritan una versión
propia; se resuelven de paso cuando v1.3 reabra `/sobre` para el contenido
institucional real, y cuando cualquier versión futura reabra
`/adquirir`/`/diario`/`/contacto` por una razón funcional (no antes, por el
mismo criterio ya aplicado durante I.1: no tocar un archivo solo porque
"ya que estamos").

**Qué dejaría exactamente como está:** la base del Sistema de Diseño
(tokens, `MasonryGrid`, `ArtworkLightbox`, el patrón de repositorio
desacoplado de la fuente de datos, la arquitectura ya lista para migrar a
Supabase sin tocar componentes). Es sólida, ya validada con evidencia real
en cada fase, y deliberadamente portable para futuros micrositios de
artista — tocarla ahora, sin una razón funcional nueva que lo exija, sería
exactamente el tipo de refactor innecesario que este documento no debe
proponer.
