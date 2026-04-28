import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Phone, Award, Users, Target, Clock, CheckCircle2, Star,
  MapPin, Trophy, Calendar, Instagram,
} from "lucide-react";
import { Link } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { blogPosts } from "../data/blogs";
import { CallbackDialog } from "../components/CallbackDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

// ── data ──────────────────────────────────────────────────────────────────────

const stats = [
  { value: "15+", label: "років досвіду", icon: Award },
  { value: "200+", label: "вихованців", icon: Users },
  { value: "50+", label: "турнірних перемог", icon: Trophy },
  { value: "7/7", label: "днів на тиждень", icon: Calendar },
];

const skillLevels = [
  {
    level: "01",
    title: "Початківець",
    duration: "1–2 місяці",
    badgeClass: "bg-blue-500/10 text-blue-400",
    borderHover: "hover:border-blue-500/50",
    skills: [
      "Правильна стійка та баланс",
      "Постановка руки та хват кія",
      "Базова техніка прицілювання",
      "Прямий удар та контроль сили",
    ],
  },
  {
    level: "02",
    title: "Середній",
    duration: "3–6 місяців",
    badgeClass: "bg-emerald-500/10 text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
    skills: [
      "Ефекти: верх, низ, правий, лівий",
      "Позиційна гра та серії",
      "Тактичне мислення та планування",
      "Захисна гра (snooker)",
    ],
  },
  {
    level: "03",
    title: "Просунутий",
    duration: "6–12 місяців",
    badgeClass: "bg-amber-500/10 text-amber-400",
    borderHover: "hover:border-amber-500/50",
    skills: [
      "Турнірна психологія",
      "Складні комбінації та маси",
      "Аналіз гри і розбір помилок",
      "Підготовка до змагань",
    ],
  },
];

const weekdays = [
  { day: "Пн" }, { day: "Вт" }, { day: "Ср" }, { day: "Чт" },
  { day: "Пт" }, { day: "Сб" }, { day: "Нд" },
];

const reviews = [
  {
    name: "Олександр Петренко",
    text: "Чудова школа! Валерій Ковтун — професіонал своєї справи. За 3 місяці навчання мій рівень виріс у рази. Рекомендую всім, хто хоче серйозно займатися більярдом.",
    rating: 5,
  },
  {
    name: "Марія Іваненко",
    text: "Дуже комфортна атмосфера, сучасне обладнання і відмінний тренер. Спочатку думала, що більярд — це не для мене, але тепер граю з задоволенням!",
    rating: 5,
  },
  {
    name: "Дмитро Коваленко",
    text: "Тренуюся вже рік. Взяв участь у кількох турнірах і навіть зайняв призові місця. Все завдяки правильній методиці навчання та підтримці тренера.",
    rating: 5,
  },
  {
    name: "Анна Сидоренко",
    text: "Привела сина на заняття — тепер він не уявляє свого життя без більярду. Валерій знаходить підхід до кожного учня, незалежно від віку.",
    rating: 5,
  },
];

const faqItems = [
  {
    question: "Чи потрібен досвід для початку навчання?",
    answer:
      "Ні, досвід не потрібен. Ми приймаємо учнів будь-якого рівня — від абсолютних новачків до тих, хто вже грає і хоче покращити техніку. Перше пробне заняття допоможе тренеру оцінити ваш рівень.",
  },
  {
    question: "Яке спорядження потрібно мати?",
    answer:
      "Нічого купувати не потрібно. Школа повністю забезпечена інвентарем: кіями, крейдою та столами преміум-класу. Якщо захочете придбати власний кій — тренер допоможе з вибором.",
  },
  {
    question: "Скільки часу потрібно, щоб навчитися добре грати?",
    answer:
      "Перші результати помітні вже після 4–6 занять. Базову техніку можна опанувати за 2–3 місяці регулярних тренувань. Для участі у змаганнях, як правило, потрібно від 6 місяців до року цілеспрямованих тренувань.",
  },
  {
    question: "Чи займаються діти?",
    answer:
      "Так, Валерій Ковтун має великий досвід роботи з учнями різного віку. Для дітей складається індивідуальна програма з урахуванням їхніх особливостей і темпу навчання.",
  },
  {
    question: "Де саме знаходиться школа?",
    answer:
      "Ми розташовані в Xpark, парк Дружби Народів, вул. Юр'ївська 29, Київ. Зручний під'їзд з усіх районів міста, поряд є паркінг.",
  },
  {
    question: "Як записатися на пробне заняття?",
    answer:
      "Натисніть кнопку «Записатися» на сайті або зателефонуйте нам: +38 063 434 96 23. Пробне заняття (30 хв) коштує 150 грн — найкращий спосіб познайомитися з тренером і форматом навчання.",
  },
];

// ── animation helper ──────────────────────────────────────────────────────────

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true },
  } as const;
}

// ── component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const reviewSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  const blogSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="pt-20">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1664728507977-598931805ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Більярдний стіл"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Школа більярду в Xpark, Київ
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent leading-tight tracking-tight"
          >
            Rhino Billiard School
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl mb-3 text-gray-300"
          >
            Навчання більярду від майстра спорту Валерія Ковтуна
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg text-emerald-400 mb-10 font-medium"
          >
            Пробне заняття — лише 150 грн
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-10 py-7"
              onClick={() => setIsCallbackOpen(true)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Записатися на пробне
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 text-lg px-10 py-7"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              Переглянути ціни
            </Button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-zinc-900/80 border-y border-zinc-800 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center">
              <Icon className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
              <p className="text-4xl font-bold text-white mb-1">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()}>
              <h2 className="text-3xl sm:text-5xl mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Про школу та тренера
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Вітаємо у школі більярду Rhino! Ми спеціалізуємось на
                професійному навчанні гри в більярд для учнів будь-якого рівня —
                від початківців до досвідчених гравців.
              </p>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Наш головний тренер —{" "}
                <span className="text-emerald-400 font-semibold">
                  Валерій Ковтун
                </span>
                , майстер спорту з багаторічним досвідом викладання та участі у
                турнірах різного рівня.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                За роки роботи школа підготувала десятки успішних гравців, які
                перемагають на обласних та всеукраїнських змаганнях.
              </p>
              <a
                href="https://www.instagram.com/billiard_rhino_school/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @billiard_rhino_school
              </a>
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="relative h-[500px] rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770802999352-a9de8335d116?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Тренер більярду"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skill Levels ──────────────────────────────────────────────────── */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Що ви навчитесь
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Структурована програма від нуля до турнірного рівня
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillLevels.map((lvl, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)}>
                <Card
                  className={`bg-zinc-900/50 border-zinc-800 ${lvl.borderHover} transition-all h-full`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-5xl font-bold text-white/10">{lvl.level}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${lvl.badgeClass}`}>
                        {lvl.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl text-white mb-6">{lvl.title}</h3>
                    <ul className="space-y-3">
                      {lvl.skills.map((skill, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Ціни
            </h2>
            <p className="text-gray-400 text-xl">
              Оберіть формат навчання, який підходить саме вам
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Individual */}
            <motion.div {...fadeUp(0.1)}>
              <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-600/50 transition-all h-full">
                <CardContent className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl mb-2 text-white">Індивідуальні заняття</h3>
                      <p className="text-gray-400">Персональний підхід до кожного учня</p>
                    </div>
                    <Target className="w-12 h-12 text-emerald-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-3 mb-8">
                    {[
                      "1 заняття (1 год) — 350 грн",
                      "8 занять (абонемент) — 2400 грн",
                      "Гнучкий графік тренувань",
                      "Індивідуальний план розвитку",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-6"
                    onClick={() => setIsCallbackOpen(true)}
                  >
                    Записатися
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Group — highlighted as popular */}
            <motion.div {...fadeUp(0.2)} className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                <span className="bg-emerald-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                  ⭐ Популярний вибір
                </span>
              </div>
              <Card className="bg-zinc-900/50 border-2 border-emerald-600 h-full">
                <CardContent className="p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl mb-2 text-white">Групові заняття</h3>
                      <p className="text-gray-400">Навчання в малих групах до 6 осіб</p>
                    </div>
                    <Users className="w-12 h-12 text-emerald-500 flex-shrink-0" />
                  </div>
                  <div className="space-y-3 mb-8">
                    {[
                      "1 заняття (1.5 год) — 200 грн",
                      "8 занять (абонемент) — 1400 грн",
                      "Фіксований розклад",
                      "Ігрова практика з партнерами",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 py-6"
                    onClick={() => setIsCallbackOpen(true)}
                  >
                    Записатися
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Additional Services */}
          <motion.div
            {...fadeUp(0.3)}
            className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-10"
          >
            <h3 className="text-3xl mb-8 text-white">Додаткові послуги</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Пробне заняття",
                  price: "150 грн (30 хв)",
                  desc: "Познайомтеся з тренером та оцініть формат навчання",
                },
                {
                  title: "Майстер-клас",
                  price: "500 грн (2 год)",
                  desc: "Інтенсивне заняття з конкретної техніки або теми",
                },
                {
                  title: "Підготовка до турнірів",
                  price: "Індивідуально",
                  desc: "Спеціальна програма для підготовки до змагань",
                },
                {
                  title: "Корпоративні заняття",
                  price: "Від 3000 грн",
                  desc: "Організація заходів для компаній та команд",
                },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl text-white mb-1">{s.title}</h4>
                    <p className="text-emerald-400 font-medium mb-1">{s.price}</p>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Advantages ────────────────────────────────────────────────────── */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeUp()}
            className="text-3xl sm:text-5xl text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Чому обирають нас
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Досвідчений тренер", desc: "Більше 15 років викладання та участі у змаганнях" },
              { icon: Target, title: "Сучасне обладнання", desc: "Професійні столи та інвентар преміум-класу" },
              { icon: Users, title: "Малі групи", desc: "До 6 осіб у групі для максимальної уваги" },
              { icon: Clock, title: "Зручний графік", desc: "Щодня з 10:00 до 22:00 без вихідних" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl mb-3 text-white">{title}</h3>
                <p className="text-gray-400 text-lg">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Розклад занять
            </h2>
            <p className="text-gray-400 text-xl">Ми працюємо кожного дня без вихідних</p>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="overflow-x-auto pb-2">
            <div className="grid grid-cols-7 gap-2 min-w-[360px]">
              {weekdays.map(({ day }, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center hover:border-emerald-600/50 transition-all"
                >
                  <p className="text-emerald-400 font-semibold text-base mb-2">{day}</p>
                  <p className="text-white text-xs leading-relaxed">10:00</p>
                  <p className="text-zinc-600 text-xs">–</p>
                  <p className="text-white text-xs">22:00</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="mt-10 text-center">
            <p className="text-gray-400 mb-6">
              Записатись можна на будь-який зручний час у межах робочих годин
            </p>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg"
              onClick={() => setIsCallbackOpen(true)}
            >
              <Phone className="w-5 h-5 mr-2" />
              Обрати час для заняття
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────────────── */}
      <section id="reviews" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            {...fadeUp()}
            className="text-3xl sm:text-5xl text-center mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Відгуки учнів
          </motion.h2>
          <Slider {...reviewSettings}>
            {reviews.map((review, i) => (
              <div key={i} className="px-4">
                <Card className="bg-zinc-900/50 border-zinc-800 h-full">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">{review.text}</p>
                    <p className="text-emerald-400 font-semibold text-lg">{review.name}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Часті запитання
            </h2>
            <p className="text-gray-400 text-xl">Відповіді на найпоширеніші питання</p>
          </motion.div>
          <motion.div {...fadeUp(0.2)}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl px-6 data-[state=open]:border-emerald-600/50 transition-colors"
                >
                  <AccordionTrigger className="text-white text-left hover:text-emerald-400 hover:no-underline py-5 text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-base pb-5 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ── Location ──────────────────────────────────────────────────────── */}
      <section id="location" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Як нас знайти
            </h2>
            <p className="text-gray-400 text-xl">Xpark, парк Дружби Народів, Київ</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div {...fadeUp(0.1)} className="space-y-6">
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">Адреса</p>
                      <p className="text-gray-400">Юр'ївська, 29, Київ, 02000</p>
                      <p className="text-gray-400">Xpark, Парк Дружби Народів</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">Телефон</p>
                      <a
                        href="tel:+380634349623"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors text-lg"
                      >
                        +38 063 434 96 23
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">Години роботи</p>
                      <p className="text-gray-400">Щодня: 10:00 – 22:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Instagram className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-semibold mb-1">Instagram</p>
                      <a
                        href="https://www.instagram.com/billiard_rhino_school/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        @billiard_rhino_school
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <a
                href="https://maps.app.goo.gl/xBvPu7u91r6JtG3dA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Відкрити в Google Maps
                </Button>
              </a>
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="rounded-2xl overflow-hidden border border-zinc-800 h-[420px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=50.4979361,30.5469284&hl=uk&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Розташування Rhino Billiard School"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 bg-gradient-to-br from-emerald-950 via-zinc-950 to-zinc-950 border-t border-emerald-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl mb-6 text-white leading-tight">
              Готові розпочати?
            </h2>
            <p className="text-xl text-gray-400 mb-3">
              Перше пробне заняття — лише{" "}
              <span className="text-emerald-400 font-semibold">150 грн</span>
            </p>
            <p className="text-gray-500 mb-10">
              Переконайтеся, що більярд — це ваше, перш ніж оплачувати повний курс
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-10 py-7"
                onClick={() => setIsCallbackOpen(true)}
              >
                <Phone className="w-5 h-5 mr-2" />
                Записатися на пробне
              </Button>
              <a href="tel:+380634349623">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/10 text-lg px-10 py-7 w-full sm:w-auto"
                >
                  +38 063 434 96 23
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Blog ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <motion.h2
              {...fadeUp()}
              className="text-3xl sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            >
              Корисні статті
            </motion.h2>
            <Link to="/blogs">
              <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10">
                Всі статті
              </Button>
            </Link>
          </div>
          <Slider {...blogSettings}>
            {blogPosts.map((post) => (
              <div key={post.slug} className="px-4">
                <Link to={`/blogs/${post.slug}`}>
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:border-emerald-600/50 transition-all h-full overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-emerald-400 text-sm mb-2">{post.date}</p>
                      <h3 className="text-xl mb-3 text-white line-clamp-2">{post.title}</h3>
                      <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <CallbackDialog open={isCallbackOpen} onOpenChange={setIsCallbackOpen} />
    </div>
  );
}
