import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";

const mainNavigation = [
  { path: "/", label: "Главная" },
  { path: "/hub", label: "Промпт-хаб" },
  { path: "/editor", label: "Редактор" },
  { path: "/research", label: "Исследования" },
  { path: "/templates", label: "Шаблоны" },
  { path: "/knowledge", label: "База знаний" },
];

const profileNavigation = [
  { path: "/profile", label: "Профиль" },
  { path: "/profile/templates", label: "Мои шаблоны" },
  { path: "/profile/templates/new", label: "Создать шаблон" },
  { path: "/profile/favorites", label: "Избранное" },
];

const breadcrumbsMap = {
  "/": [{ label: "Главная" }],

  "/hub": [{ label: "Главная", to: "/" }, { label: "Промпт-хаб" }],
  "/hub/demo-prompt": [
    { label: "Главная", to: "/" },
    { label: "Промпт-хаб", to: "/hub" },
    { label: "Карточка промпта" },
  ],

  "/editor": [{ label: "Главная", to: "/" }, { label: "Редактор промптов" }],

  "/research": [{ label: "Главная", to: "/" }, { label: "Исследования" }],
  "/research/demo-research": [
    { label: "Главная", to: "/" },
    { label: "Исследования", to: "/research" },
    { label: "Карточка исследования" },
  ],

  "/templates": [{ label: "Главная", to: "/" }, { label: "Шаблоны" }],
  "/templates/demo-template": [
    { label: "Главная", to: "/" },
    { label: "Шаблоны", to: "/templates" },
    { label: "Карточка шаблона" },
  ],

  "/knowledge": [{ label: "Главная", to: "/" }, { label: "База знаний" }],

  "/auth/login": [{ label: "Главная", to: "/" }, { label: "Вход" }],
  "/auth/register": [{ label: "Главная", to: "/" }, { label: "Регистрация" }],
  "/auth/forgot-password": [
    { label: "Главная", to: "/" },
    { label: "Восстановление пароля" },
  ],

  "/profile": [{ label: "Главная", to: "/" }, { label: "Личный кабинет" }],
  "/profile/edit": [
    { label: "Главная", to: "/" },
    { label: "Личный кабинет", to: "/profile" },
    { label: "Редактирование профиля" },
  ],
  "/profile/templates": [
    { label: "Главная", to: "/" },
    { label: "Личный кабинет", to: "/profile" },
    { label: "Мои шаблоны" },
  ],
  "/profile/templates/new": [
    { label: "Главная", to: "/" },
    { label: "Личный кабинет", to: "/profile" },
    { label: "Мои шаблоны", to: "/profile/templates" },
    { label: "Создать шаблон" },
  ],
  "/profile/favorites": [
    { label: "Главная", to: "/" },
    { label: "Личный кабинет", to: "/profile" },
    { label: "Избранное" },
  ],
};

function App() {
  return (
    <div className="app">
      <Header />

      <div className="app__body">
        <Sidebar />

        <main className="main">
          <div className="main__inner">
            <Breadcrumbs />

            <Routes>
              <Route
                path="/"
                element={
                  <Page
                    label="Стартовая карточка"
                    title="Промптотека"
                    description="Картотека промптов для ИИ-инструментов. Здесь пользователь может находить готовые промпты, создавать свои шаблоны и сохранять полезные материалы."
                    actions={[
                      {
                        to: "/hub",
                        label: "Открыть промпт-хаб",
                        variant: "primary",
                      },
                      {
                        to: "/editor",
                        label: "Перейти в редактор",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/hub"
                element={
                  <Page
                    label="Публичный ящик"
                    title="Промпт-хаб"
                    description="Каталог публичных промптов с поиском и фильтрацией по сфере применения, инструменту и типу конвертации."
                    actions={[
                      {
                        to: "/hub/demo-prompt",
                        label: "Открыть карточку промпта",
                        variant: "primary",
                      },
                      {
                        to: "/editor",
                        label: "Использовать в редакторе",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/hub/demo-prompt"
                element={
                  <Page
                    label="Карточка промпта"
                    title="Демо-промпт"
                    description="На этой странице будет текст промпта, результат, инструмент, сфера применения и действия: скопировать, добавить в избранное, открыть в редакторе."
                    actions={[
                      {
                        to: "/hub",
                        label: "Назад в каталог",
                      },
                      {
                        to: "/editor",
                        label: "Открыть в редакторе",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/editor"
                element={
                  <Page
                    label="Рабочая карточка"
                    title="Редактор промптов"
                    description="Место, где пользователь пишет промпт, использует подсветку синтаксиса, быстрые действия и сохраняет удачный результат как шаблон."
                    actions={[
                      {
                        to: "/templates",
                        label: "Выбрать шаблон",
                      },
                      {
                        to: "/profile/templates/new",
                        label: "Создать шаблон",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/research"
                element={
                  <Page
                    label="Справочный ящик"
                    title="Исследования"
                    description="Раздел с исследованиями и краткими выводами по промпт-инжинирингу и работе с ИИ-инструментами."
                    actions={[
                      {
                        to: "/research/demo-research",
                        label: "Открыть исследование",
                        variant: "primary",
                      },
                      {
                        to: "/editor",
                        label: "Попробовать в редакторе",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/research/demo-research"
                element={
                  <Page
                    label="Карточка исследования"
                    title="Демо-исследование"
                    description="Здесь будет описание исследования, краткий вывод и связанные шаблоны или промпты."
                    actions={[
                      {
                        to: "/research",
                        label: "Назад к исследованиям",
                      },
                      {
                        to: "/editor",
                        label: "Применить в редакторе",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/templates"
                element={
                  <Page
                    label="Ящик шаблонов"
                    title="Шаблоны"
                    description="Готовые структуры промптов, которые пользователь может открыть, изменить и использовать для своих задач."
                    actions={[
                      {
                        to: "/templates/demo-template",
                        label: "Открыть шаблон",
                        variant: "primary",
                      },
                      {
                        to: "/profile/templates/new",
                        label: "Создать свой",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/templates/demo-template"
                element={
                  <Page
                    label="Карточка шаблона"
                    title="Демо-шаблон"
                    description="Страница одного шаблона с текстом промпта, примером результата и кнопкой перехода в редактор."
                    actions={[
                      {
                        to: "/templates",
                        label: "Назад к шаблонам",
                      },
                      {
                        to: "/editor",
                        label: "Открыть в редакторе",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/knowledge"
                element={
                  <Page
                    label="Учебный ящик"
                    title="База знаний"
                    description="Раздел со статьями по форматированию промптов, структуре инструкций и приёмам работы с ИИ."
                    actions={[
                      {
                        to: "/research",
                        label: "Открыть исследования",
                      },
                      {
                        to: "/editor",
                        label: "Перейти к практике",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/auth/login"
                element={
                  <Page
                    label="Сервисная карточка"
                    title="Вход"
                    description="Форма входа пользователя по email и паролю."
                    actions={[
                      {
                        to: "/auth/register",
                        label: "Создать аккаунт",
                      },
                      {
                        to: "/profile",
                        label: "Войти в кабинет",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/auth/register"
                element={
                  <Page
                    label="Сервисная карточка"
                    title="Регистрация"
                    description="Форма создания аккаунта для сохранения шаблонов и избранного."
                    actions={[
                      {
                        to: "/auth/login",
                        label: "Уже есть аккаунт",
                      },
                      {
                        to: "/profile",
                        label: "Перейти в кабинет",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/auth/forgot-password"
                element={
                  <Page
                    label="Сервисная карточка"
                    title="Восстановление пароля"
                    description="Форма восстановления доступа к аккаунту."
                    actions={[
                      {
                        to: "/auth/login",
                        label: "Вернуться ко входу",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route path="/profile" element={<ProfilePage />} />

              <Route
                path="/profile/edit"
                element={
                  <Page
                    label="Личная карточка"
                    title="Редактирование профиля"
                    description="Здесь пользователь сможет изменить имя, фото и данные профиля."
                    actions={[
                      {
                        to: "/profile",
                        label: "Назад в кабинет",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/profile/templates"
                element={
                  <Page
                    label="Личный ящик"
                    title="Мои шаблоны"
                    description="Список шаблонов, которые пользователь создал сам."
                    actions={[
                      {
                        to: "/profile/templates/new",
                        label: "Создать шаблон",
                        variant: "primary",
                      },
                      {
                        to: "/profile",
                        label: "Назад в кабинет",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/profile/templates/new"
                element={
                  <Page
                    label="Новая карточка"
                    title="Создать шаблон"
                    description="Форма создания собственного шаблона промпта. Позже здесь появится textarea, валидация и редактор с подсветкой."
                    actions={[
                      {
                        to: "/profile/templates",
                        label: "Мои шаблоны",
                      },
                      {
                        to: "/editor",
                        label: "Открыть редактор",
                        variant: "primary",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/profile/favorites"
                element={
                  <Page
                    label="Избранный ящик"
                    title="Избранное"
                    description="Здесь будут храниться шаблоны других пользователей, которые были добавлены в избранное."
                    actions={[
                      {
                        to: "/hub",
                        label: "Найти промпты",
                        variant: "primary",
                      },
                      {
                        to: "/profile",
                        label: "Назад в кабинет",
                      },
                    ]}
                  />
                }
              />

              <Route
                path="*"
                element={
                  <Page
                    label="Потерянная карточка"
                    title="404"
                    description="Такой страницы пока нет. Пользователь не должен оставаться в тупике, поэтому здесь есть переходы назад."
                    actions={[
                      {
                        to: "/",
                        label: "На главную",
                        variant: "primary",
                      },
                      {
                        to: "/hub",
                        label: "В промпт-хаб",
                      },
                    ]}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <span className="logo__icon">▤</span>

        <span>
          <strong>Промптотека</strong>
          <small>картотека промптов</small>
        </span>
      </Link>

      <nav className="header__nav" aria-label="Главная навигация">
        <NavLink to="/hub">Промпт-хаб</NavLink>
        <NavLink to="/editor">Редактор</NavLink>
        <NavLink to="/research">Исследования</NavLink>
        <NavLink to="/templates">Шаблоны</NavLink>
      </nav>

      <nav className="header__auth" aria-label="Навигация пользователя">
        <Link to="/auth/login" className="button button--small">
          Войти
        </Link>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <section className="sidebar__section">
        <p className="sidebar__title">Основные ящики</p>

        <nav className="sidebar__nav" aria-label="Разделы сайта">
          {mainNavigation.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </section>

      <section className="sidebar__section">
        <p className="sidebar__title">Личный раздел</p>

        <nav className="sidebar__nav" aria-label="Личный кабинет">
          {profileNavigation.map((item) => (
            <NavLink key={item.path} to={item.path} end>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </section>
    </aside>
  );
}

function Breadcrumbs() {
  const location = useLocation();
  const breadcrumbs = breadcrumbsMap[location.pathname] || [
    { label: "Главная", to: "/" },
    { label: "Неизвестная страница" },
  ];

  return (
    <div className="breadcrumbs" aria-label="Хлебные крошки">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="breadcrumbs__item">
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}

            {!isLast && <span className="breadcrumbs__separator">/</span>}
          </span>
        );
      })}
    </div>
  );
}

function Page({ label, title, description, actions = [] }) {
  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">{label}</span>
        <span className="page-card__paper-mark">PROMPTOTEKA</span>
      </div>

      <div className="page-card__content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="page-card__actions">
        {actions.map((action) => (
          <Link
            key={`${action.to}-${action.label}`}
            to={action.to}
            className={`button ${action.variant === "primary" ? "button--primary" : ""}`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Личный ящик</span>
        <span className="page-card__paper-mark">PROFILE</span>
      </div>

      <div className="page-card__content">
        <h1>Личный кабинет</h1>
        <p>
          Здесь будут профиль пользователя, его шаблоны и избранные материалы.
        </p>
      </div>

      <div className="tabs">
        {profileNavigation.map((item) => (
          <NavLink key={item.path} to={item.path} end>
            {item.label}
          </NavLink>
        ))}

        <NavLink to="/profile/edit">Редактировать профиль</NavLink>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Промптотека — учебный проект</span>

      <nav aria-label="Служебная навигация">
        <Link to="/knowledge">База знаний</Link>
        <Link to="/research">Исследования</Link>
        <Link to="/hub">Промпт-хаб</Link>
      </nav>
    </footer>
  );
}

export default App;
