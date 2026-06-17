import { useState, useRef, MouseEvent } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/f9a6bc05-67f6-444c-9b47-63201b4552ca/files/181a36d1-2a71-45c3-a114-22ce830ea59b.jpg';

const portfolio = [
  {
    img: 'https://cdn.poehali.dev/projects/f9a6bc05-67f6-444c-9b47-63201b4552ca/files/181a36d1-2a71-45c3-a114-22ce830ea59b.jpg',
    title: 'Гостиная «Аврора»',
    cat: 'Мягкая мебель',
  },
  {
    img: 'https://cdn.poehali.dev/projects/f9a6bc05-67f6-444c-9b47-63201b4552ca/files/a450abf5-4927-4308-8160-cce30cd5edbc.jpg',
    title: 'Кухня «Монолит»',
    cat: 'Кухонные гарнитуры',
  },
  {
    img: 'https://cdn.poehali.dev/projects/f9a6bc05-67f6-444c-9b47-63201b4552ca/files/f1549a8a-f294-418d-96c5-4e73dd8d1495.jpg',
    title: 'Гардеробная «Эклипс»',
    cat: 'Системы хранения',
  },
];

const services = [
  { icon: 'PencilRuler', title: 'Авторский дизайн', text: 'Создаём индивидуальный проект под вашу геометрию и стиль интерьера.' },
  { icon: 'Hammer', title: 'Собственное производство', text: 'Цех в Уфе с европейским оборудованием и контролем на каждом этапе.' },
  { icon: 'Gem', title: 'Премиальные материалы', text: 'Массив дерева, итальянский шпон, фурнитура Blum и Hettich.' },
  { icon: 'Box', title: '3D-визуализация', text: 'Видите будущую мебель в фотореалистичном 3D до начала работ.' },
  { icon: 'Truck', title: 'Доставка и монтаж', text: 'Аккуратная доставка по Уфе и РФ, сборка «под ключ» нашей бригадой.' },
  { icon: 'ShieldCheck', title: 'Гарантия 5 лет', text: 'Отвечаем за качество каждого изделия и обслуживаем после установки.' },
];

const steps = [
  { n: '01', title: 'Заявка и замер', text: 'Бесплатный выезд дизайнера-замерщика на объект.' },
  { n: '02', title: 'Проект и 3D', text: 'Разрабатываем дизайн-проект и фотореалистичную визуализацию.' },
  { n: '03', title: 'Производство', text: 'Изготавливаем мебель в собственном цехе за 14–30 дней.' },
  { n: '04', title: 'Монтаж', text: 'Доставляем и собираем мебель, наводим финальный лоск.' },
];

function TiltCard({ item, i }: { item: typeof portfolio[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 12;
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`,
    });
  };

  const onLeave = () =>
    setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0) scale(1)' });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, animationDelay: `${i * 120}ms` }}
      className="group relative overflow-hidden rounded-sm bg-graphite transition-transform duration-200 ease-out animate-fade-up will-change-transform"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-125"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-bronze-light">{item.cat}</p>
        <h3 className="font-display text-3xl text-white">{item.title}</h3>
      </div>
      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-bronze/40 bg-ink/40 text-bronze-light backdrop-blur-sm opacity-0 transition-all duration-500 group-hover:opacity-100">
        <Icon name="Maximize2" size={18} />
      </div>
    </div>
  );
}

export default function Index() {
  const nav = [
    { label: 'О производстве', id: 'about' },
    { label: 'Портфолио', id: 'portfolio' },
    { label: 'Услуги', id: 'services' },
    { label: 'Доставка', id: 'delivery' },
    { label: 'Контакты', id: 'contacts' },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-ink text-stone-200 antialiased">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-md">
        <div className="container flex items-center justify-between py-5">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
            <span className="font-display text-2xl tracking-wide text-white">ATELIER</span>
            <span className="text-xs uppercase tracking-[0.35em] text-bronze">мебель</span>
          </button>
          <nav className="hidden gap-9 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm tracking-wide text-stone-300 transition-colors hover:text-bronze-light"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo('contacts')}
            className="border border-bronze/50 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-bronze-light transition-all hover:bg-bronze hover:text-ink"
          >
            Заказать
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover animate-kenburns" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="mb-6 animate-fade-in text-sm uppercase tracking-[0.4em] text-bronze">
              Производство мебели · Уфа
            </p>
            <h1 className="animate-fade-up font-display text-6xl leading-[0.95] text-white md:text-8xl">
              Мебель, <span className="gold-text">достойная</span><br />вашего дома
            </h1>
            <p
              className="mt-8 max-w-xl animate-fade-up text-lg leading-relaxed text-stone-300"
              style={{ animationDelay: '150ms' }}
            >
              Эксклюзивная мебель ручной работы под ключ. От авторского дизайна
              и 3D-визуализации до монтажа в вашем интерьере.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => scrollTo('portfolio')}
                className="bg-bronze px-9 py-4 text-sm uppercase tracking-[0.2em] text-ink transition-all hover:bg-bronze-light"
              >
                Смотреть работы
              </button>
              <button
                onClick={() => scrollTo('contacts')}
                className="border border-white/30 px-9 py-4 text-sm uppercase tracking-[0.2em] text-white transition-all hover:border-bronze hover:text-bronze-light"
              >
                Бесплатный замер
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bronze/60">
          <Icon name="ChevronDown" size={28} className="animate-bounce" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-white/5 bg-graphite py-28">
        <div className="container grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-bronze">О производстве</p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-6xl">
              Собственный цех<br />в сердце Уфы
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-stone-400">
              Более 12 лет мы создаём мебель премиум-класса для частных интерьеров,
              ресторанов и бутиков. Каждое изделие — это союз ручного мастерства,
              современных технологий и безупречных материалов.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { v: '12+', l: 'лет на рынке' },
                { v: '800+', l: 'проектов' },
                { v: '5', l: 'лет гарантии' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="gold-text font-display text-5xl">{s.v}</div>
                  <div className="mt-1 text-sm text-stone-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-sm">
              <img
                src={portfolio[1].img}
                alt="Производство"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden border border-bronze/30 bg-ink/90 p-7 backdrop-blur md:block">
              <div className="flex items-center gap-3 text-bronze-light">
                <Icon name="Award" size={26} />
                <span className="font-display text-2xl text-white">Ручная работа</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO — interactive gallery */}
      <section id="portfolio" className="bg-ink py-28">
        <div className="container">
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-bronze">Портфолио</p>
            <h2 className="font-display text-5xl text-white md:text-6xl">Избранные проекты</h2>
            <div className="gold-line mt-6 h-px w-24" />
            <p className="mt-5 max-w-lg text-stone-400">
              Наведите курсор на проект — изображение приближается, как при 3D-осмотре.
            </p>
          </div>
          <div className="grid gap-7 md:grid-cols-3">
            {portfolio.map((item, i) => (
              <TiltCard key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-white/5 bg-graphite py-28">
        <div className="container">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-bronze">Услуги</p>
            <h2 className="font-display text-5xl text-white md:text-6xl">Что мы делаем</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-sm border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group bg-graphite p-9 transition-colors hover:bg-ink"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-bronze/30 text-bronze-light transition-all group-hover:bg-bronze group-hover:text-ink">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-400">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY / PROCESS */}
      <section id="delivery" className="bg-ink py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-bronze">Доставка и процесс</p>
            <h2 className="font-display text-5xl text-white md:text-6xl">Как мы работаем</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="font-display text-7xl text-bronze/25">{s.n}</div>
                <div className="gold-line my-5 h-px w-12" />
                <h3 className="font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stone-400">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-center gap-6 rounded-sm border border-bronze/20 bg-graphite p-10 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-5">
              <Icon name="Truck" size={40} className="text-bronze-light" />
              <div>
                <h3 className="font-display text-2xl text-white">Доставка по Уфе и всей России</h3>
                <p className="mt-1 text-stone-400">Бережная упаковка, страхование, профессиональный монтаж.</p>
              </div>
            </div>
            <button
              onClick={() => scrollTo('contacts')}
              className="whitespace-nowrap bg-bronze px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink transition-all hover:bg-bronze-light"
            >
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative overflow-hidden border-t border-white/5 bg-graphite py-28">
        <div className="container grid gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-bronze">Контакты</p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-6xl">
              Обсудим<br />ваш проект?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-400">
              Оставьте заявку — дизайнер свяжется с вами, проведёт бесплатный замер
              и подготовит концепцию вашей будущей мебели.
            </p>
            <div className="mt-10 space-y-5">
              {[
                { icon: 'MapPin', t: 'г. Уфа, ул. Производственная, 1' },
                { icon: 'Phone', t: '+7 (347) 000-00-00' },
                { icon: 'Mail', t: 'info@atelier-ufa.ru' },
                { icon: 'Clock', t: 'Пн–Сб, 09:00 – 20:00' },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bronze/30 text-bronze-light">
                    <Icon name={c.icon} size={18} />
                  </div>
                  <span className="text-stone-300">{c.t}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 rounded-sm border border-white/10 bg-ink/60 p-8 backdrop-blur"
          >
            {[
              { ph: 'Ваше имя', type: 'text' },
              { ph: 'Телефон', type: 'tel' },
              { ph: 'E-mail', type: 'email' },
            ].map((f) => (
              <input
                key={f.ph}
                type={f.type}
                placeholder={f.ph}
                className="w-full border-b border-white/15 bg-transparent py-3 text-white placeholder:text-stone-500 transition-colors focus:border-bronze focus:outline-none"
              />
            ))}
            <textarea
              rows={3}
              placeholder="Расскажите о проекте"
              className="w-full resize-none border-b border-white/15 bg-transparent py-3 text-white placeholder:text-stone-500 transition-colors focus:border-bronze focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-bronze py-4 text-sm uppercase tracking-[0.2em] text-ink transition-all hover:bg-bronze-light"
            >
              Отправить заявку
            </button>
            <p className="text-center text-xs text-stone-500">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
            </p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-ink py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-stone-500 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl text-white">ATELIER</span>
            <span className="text-xs uppercase tracking-[0.3em] text-bronze">мебель · Уфа</span>
          </div>
          <p>© 2026 ATELIER. Производство мебели под ключ.</p>
        </div>
      </footer>
    </div>
  );
}
