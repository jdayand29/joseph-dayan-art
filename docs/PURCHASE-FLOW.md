# PURCHASE-FLOW.md — El recorrido de compra de Joseph Dayan Art

Diseño de experiencia, no de implementación. Ningún nombre de proveedor de
pagos, ningún detalle técnico — eso viene después. Este documento responde
una sola pregunta: **¿cuál es la mejor experiencia posible desde que alguien
descubre una obra hasta que recibe la confirmación de haberla comprado?**

Se piensa como comprador de arte, no como desarrollador. Un comprador de
arte no es un comprador de e-commerce genérico: está a punto de gastar
varios cientos de dólares en un objeto físico, único, que no puede tocar ni
ver en persona antes de decidir. Cada pantalla de este recorrido tiene que
ganarse esa confianza, no solo procesar una transacción.

---

## Principios que gobiernan este diseño

Tomados directamente de la identidad ya definida del proyecto
(`docs/MASTER-PLAN.md`), no inventados para este documento:

1. **Ritmo, no velocidad.** El objetivo no es que el comprador llegue al
   pago lo más rápido posible — es que llegue **seguro** de su decisión.
   Apurar a alguien que está por gastar $450-$1,400 en una pieza única
   genera arrepentimiento, no conversión.
2. **Cero fricción decorativa, cero urgencia falsa.** Nada de countdowns,
   nada de "¡solo queda 1!" fabricado — aunque, en este caso particular, la
   escasez de una obra original **es real** (existe una sola versión física
   de cada pieza), así que comunicarla honestamente es información, no
   manipulación.
3. **Confianza como producto.** Cada pantalla debe responder, sin que el
   comprador tenga que preguntar, la duda que tendría en ese momento
   exacto del recorrido.
4. **La relación importa más que la transacción única.** Un visitante que
   no compra hoy no es una conversión perdida — es alguien que puede
   unirse a la lista privada y convertirse en comprador en el futuro
   (`docs/MASTER-PLAN.md`, sección 18: "pirámide de compromiso creciente").

---

## El recorrido completo

### Etapa 0 — Llegada

**Pantalla:** Home.

**Qué decide el usuario:** si este sitio parece el de un artista serio o
no, en los primeros segundos.

**Qué ya funciona (confirmado en la auditoría de producto):** el hero a
pantalla completa con una sola obra, tiempos de carga excelentes (148ms al
primer contenido visible), tipografía y espaciado ya transmiten cuidado.

**Riesgo de abandono:** que el visitante no entienda de inmediato "esto es
obra original en venta, no un blog ni un portafolio pasivo" — hoy el hero
no tiene ningún CTA propio, solo el header.

**Cómo reducir fricción / aumentar confianza aquí:** ninguna decisión de
compra ocurre todavía — el único trabajo de esta pantalla es dar ganas de
seguir mirando. No se debe introducir ningún elemento de venta en el hero;
sería prematuro y rompería el ritmo curatorial ya establecido.

---

### Etapa 1 — Exploración

**Pantalla:** catálogo (`/obra`), con filtro por estilo.

**Qué decide el usuario:** qué obra(s) le llaman la atención lo suficiente
para entrar a ver más.

**Qué ya funciona:** masonry con proporciones reales (no recortes forzados
— cada obra se ve como realmente es), filtro por estilo instantáneo.

**Interacción clave:** el clic en una obra específica — la transición de
"estoy mirando muchas obras" a "esta obra en particular me interesa".

**Riesgo de abandono:** ninguno especialmente alto en esta etapa — es
exploración de bajo compromiso. El riesgo real es no encontrar nada que
enganche, lo cual es un problema de contenido (cuántas obras hay, qué tan
bien fotografiadas están), no de flujo.

---

### Etapa 2 — Enamorarse de la obra (el momento más importante de todo el recorrido)

**Pantalla:** detalle de obra (`/obra/[slug]`).

**Qué decide el usuario:** si esta obra específica vale lo que cuesta —
la decisión emocional real ocurre aquí, no en el checkout.

**Qué ya funciona:** cartela técnica clara (técnica, tamaño, año, estilo),
precio visible sin tener que preguntar, lightbox que amplía la imagen con
una transición cuidada.

**Lo que falta para que esta etapa cumpla su función:**

- **Una sola fotografía por obra no alcanza** para un comprador que va a
  pagar cientos de dólares por una pieza física que nunca tocará antes de
  comprar. Un comprador de arte serio quiere ver: la obra completa, un
  detalle de la textura (la "textura de espátula" es literalmente parte de
  la identidad visual de Joseph — hoy no se puede apreciar en una sola
  foto general), y una referencia de escala (¿cómo se ve en una pared
  real, junto a un mueble o una figura humana?).
- **Sin ninguna palabra del artista sobre esa obra en particular.** Hoy la
  cartela es puramente técnica (medio, tamaño, año). Falta el espacio para
  que Joseph diga, en una o dos frases, qué significa esa pieza — el
  mismo tipo de texto curatorial que el Documento Maestro ya define para
  las colecciones (sección 8), pero a nivel de obra individual.
- **Ninguna señal de autenticidad más allá de la cartela.** Un comprador
  quiere saber que lo que compra es un original certificado, no solo leer
  "acrílico sobre lienzo".

**Riesgo de abandono más alto de todo el recorrido:** el visitante mira la
imagen, lee el precio, y se va — no porque el precio le parezca alto, sino
porque no tiene suficiente información sensorial ni emocional para
convencerse de que vale la pena decidir *ahora*.

**Cómo mitigarlo:** más fotografía (detalle + escala), una frase curatorial
por obra, y una mención explícita y visible de certificado de autenticidad
— todo esto sin tocar el precio ni la cartela ya existentes, que funcionan
bien.

---

### Etapa 3 — Consideración (el puente entre "me gusta" y "voy a pagar")

Esta etapa no existe hoy como una pantalla propia — el sitio salta
directamente de "ver la obra" a "un botón que no funciona". Se propone que
exista, de forma explícita, entre el detalle de obra y el checkout.

**Qué decide el usuario:** si tiene alguna duda antes de comprometerse, y
si confía lo suficiente en el proceso de pago/envío como para dar sus
datos.

**Preguntas reales que un comprador tiene en este momento, y que el
recorrido debe responder sin que tenga que ir a buscar la respuesta:**

- ¿Esto es un pago seguro?
- ¿Cómo se envía una pintura original sin que se dañe?
- ¿Quién paga el envío, y cuánto cuesta?
- ¿Qué pasa si al recibirla no es lo que esperaba?
- ¿Recibo algún certificado o comprobante de que es una obra original?
- ¿Puedo escribirle a Joseph directamente si tengo una pregunta antes de
  decidir?

**Diseño de esta etapa:** un bloque de confianza, visible antes del botón
de pago final (no escondido en una página de políticas aparte), que
responda estas seis preguntas en una frase cada una. Y, crucialmente, **una
salida explícita que no sea abandonar la página**: un enlace/botón
secundario, al mismo nivel visual que "Comprar", que diga algo como
"Tengo una pregunta antes de decidir" y lleve a un contacto ya
contextualizado con la obra (ver Etapa 4).

**Riesgo de abandono:** que el único camino visible sea "pagar ahora" o
"irse" — sin una tercera opción, un comprador dudoso simplemente se va, en
vez de quedarse en el embudo como un contacto interesado.

---

### Etapa 4 — La decisión: comprar o preguntar primero

Este es el punto de bifurcación real del flujo — hoy el sitio solo tiene
la mitad de este árbol construida (la mitad que no funciona).

**Camino A — "Tengo una pregunta primero":** lleva a un formulario de
contacto que ya sabe de qué obra se trata (título, imagen pequeña, precio
visibles arriba del formulario) — a diferencia de hoy, donde ese contexto
se pierde por completo. Este camino no es un fracaso del flujo de compra:
es una conversión legítima y más baja de fricción hacia la relación de
largo plazo que el modelo de negocio ya prioriza.

**Camino B — "Comprar esta obra":** entra al checkout (Etapa 5). Antes de
llegar ahí, si la obra es única (siempre lo es, en el caso de originales),
el sistema debe **reservarla temporalmente** apenas alguien entra al
checkout — nadie más debería poder comprar la misma pieza mientras un
comprador ya está completando sus datos. Esto no es un detalle técnico
menor: comprar arte único y enterarse después de que "ya se vendió" es una
de las peores experiencias posibles para la confianza en el sitio.

---

### Etapa 5 — Checkout

**Qué decide el usuario:** completar sus datos de envío y pago, o
abandonar por fricción.

**Principio de diseño:** el checkout debe sentirse como el *cierre* de una
decisión ya tomada en la Etapa 2-3, no como el *inicio* de una nueva
negociación. Todo lo que sorprenda aquí (un costo no mencionado antes, un
campo inesperado) reintroduce la duda que ya se había resuelto.

**Secuencia ideal, en el orden que reduce fricción:**

1. **Resumen de lo que está comprando** — imagen pequeña, título, precio,
   siempre visible arriba o al costado, para que el comprador nunca pierda
   el contexto de qué está pagando (a diferencia de hoy, donde `/adquirir`
   no muestra nada de esto).
2. **Costo total transparente antes de pedir cualquier dato** — precio de
   la obra + envío + cualquier cargo, sumados y mostrados de una vez. Nunca
   un costo nuevo que aparezca después de que el comprador ya escribió su
   tarjeta.
3. **Datos de envío** — nombre, dirección, y nada más de lo estrictamente
   necesario para despachar una obra física. Sin crear una cuenta
   obligatoria — un comprador de una sola obra no debería tener que
   "registrarse" para comprarla.
4. **Pago** — el paso final, no el primero. (El método específico se
   diseña en un documento aparte, deliberadamente fuera de este.)
5. **Confirmación explícita antes de cobrar** — un último resumen ("vas a
   pagar $X por 'Nebulosa Dorada', envío incluido") con un botón de
   confirmación final. Esto reduce el arrepentimiento inmediato post-compra
   (buyer's remorse) porque el comprador tuvo un momento consciente de
   decir "sí, esto es lo que quiero" en vez de que el pago ocurra como
   efecto secundario de rellenar un formulario.

**Riesgos de abandono en esta etapa, y cómo mitigarlos:**

- **Demasiados campos:** limitar estrictamente a lo necesario para
  envío + pago. Nada de "¿cómo nos conociste?" ni campos opcionales de
  marketing en este momento — eso se pide después, en la confirmación,
  cuando ya no hay riesgo de que sea la razón del abandono.
- **No poder pagar como invitado:** debe existir siempre esa opción, sin
  forzar una cuenta.
- **Costos sorpresa:** ya cubierto arriba — todo el costo se muestra antes
  de pedir el método de pago, nunca después.
- **Dudar de la seguridad del pago:** señales de confianza visibles
  (candado, procesador reconocible) en el mismo paso donde se pide la
  tarjeta, no en una página de políticas separada.

---

### Etapa 6 — Confirmación (fin de este recorrido)

**Pantalla:** confirmación de compra, inmediatamente después del pago.

**Qué necesita sentir el comprador en este momento:** alivio y
entusiasmo — acaba de adquirir una pieza única de un artista real, y quiere
sentir que hizo bien, no que "completó una transacción".

**Contenido de esta pantalla, en orden de importancia:**

1. **Un agradecimiento personal, en la voz de Joseph** (primera persona,
   consistente con la voz de marca ya definida: "primera persona cuando
   habla Joseph" — `docs/MASTER-PLAN.md`, sección 6) — no un genérico
   "¡Gracias por tu compra!" corporativo.
2. **Resumen claro de qué compró** — imagen, título, precio pagado.
3. **Qué pasa ahora, en lenguaje simple:** cuándo se empaca, cuándo se
   envía, cómo se le avisará (email), y que recibirá un certificado de
   autenticidad junto con la obra.
4. **Una invitación suave, no forzada, a la lista privada** — si no está
   ya suscrito, este es el momento correcto para invitarlo (acaba de
   demostrar el mayor nivel de confianza posible); si ya lo está, se omite
   por completo para no ser redundante.

**Email de confirmación:** debe reflejar exactamente lo mismo que la
pantalla — no un recibo frío generado automáticamente sin personalidad.

**Este es también el momento de mayor valor para pedir lo que normalmente
generaría fricción antes** (una reseña futura, permiso para usar su nombre
como "coleccionista" en comunicación futura, etc.) — pero eso es contenido
de una etapa posterior a la compra, fuera del alcance de este documento
("termina cuando recibe la confirmación").

---

## El caso del visitante que no compra hoy

No todo el tráfico de la Etapa 2-3 debe terminar en "compró" o "se fue sin
dejar rastro". El sitio ya tiene la pieza de infraestructura correcta para
esto (`SubscribeForm`, probado y funcional en la auditoría de producto) —
lo que falta es **ofrecerla en el momento correcto del recorrido de
compra**, no solo en `/contacto`. Por ejemplo: si alguien pasa un tiempo
considerable en el detalle de una obra sin decidirse, o si intenta comprar
una obra que ya no está disponible, ese es el momento natural para
ofrecer "avísame de obra nueva" — convierte un abandono en una relación de
largo plazo, exactamente el modelo de negocio ya definido.

---

## Propuesta de flujo ideal para Joseph Dayan Art

En una sola secuencia, de principio a fin:

```
Home (descubrir)
   ↓
Catálogo con filtro (explorar)
   ↓
Detalle de obra — ahora con: varias fotos (general + detalle + escala),
una frase curatorial de Joseph sobre esa pieza, mención de certificado
de autenticidad
   ↓
Bloque de confianza (envío, pago seguro, política de satisfacción,
certificado) + dos caminos igual de visibles:
   ↓                                    ↓
"Tengo una pregunta primero"      "Comprar esta obra"
   ↓                                    ↓
Contacto ya con el contexto        La obra se reserva temporalmente
de la obra (imagen, título,               ↓
precio precargados)                Checkout: resumen fijo de la obra +
                                    costo total transparente + datos de
                                    envío mínimos + pago + confirmación
                                    final antes de cobrar
                                           ↓
                                    Confirmación personal (voz de Joseph)
                                    + resumen + próximos pasos +
                                    invitación suave a la lista privada
```

La idea central de esta propuesta: **el checkout no es donde se construye
la confianza — es donde se cobra una confianza que ya se construyó antes**,
en el detalle de la obra y en el bloque de consideración. Si esas dos
etapas cumplen su función, el checkout puede ser corto, simple y directo
sin sentirse apresurado, porque el comprador ya tomó su decisión antes de
llegar ahí.
