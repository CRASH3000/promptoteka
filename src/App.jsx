import { Suspense, lazy } from 'react'
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import promptotekaLogoSticker from './assets/promptoteka-logo-sticker-optimized.png'
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
} from './components/forms/AuthForms'
import {
  FavoriteTemplatesPage,
  TemplateCatalogPage,
  TemplateDetailPage,
} from './components/templates/TemplateCatalog'
import { KnowledgeBasePage } from './pages/KnowledgeBasePage'
import { ResearchPage } from './pages/ResearchPage'

const TemplateCreationForm = lazy(() =>
  import('./components/forms/TemplateCreationForm').then((module) => ({
    default: module.TemplateCreationForm,
  })),
)

const mainNavigation = [
  { path: '/', label: 'Главная' },
  { path: '/hub', label: 'Промпт-хаб' },
  { path: '/research', label: 'Исследования' },
  { path: '/templates', label: 'Шаблоны' },
  { path: '/knowledge', label: 'База знаний' },
]

const profileNavigation = [
  { path: '/profile', label: 'Профиль' },
  { path: '/profile/templates', label: 'Мои шаблоны' },
  { path: '/profile/templates/new', label: 'Создать шаблон' },
  { path: '/profile/favorites', label: 'Избранное' },
]

const breadcrumbsMap = {
  '/': [{ label: 'Главная' }],
  '/hub': [
    { label: 'Главная', to: '/' },
    { label: 'Промпт-хаб' },
  ],
  '/hub/demo-prompt': [
    { label: 'Главная', to: '/' },
    { label: 'Промпт-хаб', to: '/hub' },
    { label: 'Карточка промпта' },
  ],
  '/research': [
    { label: 'Главная', to: '/' },
    { label: 'Исследования' },
  ],
  '/research/demo-research': [
    { label: 'Главная', to: '/' },
    { label: 'Исследования', to: '/research' },
    { label: 'Карточка исследования' },
  ],
  '/templates': [
    { label: 'Главная', to: '/' },
    { label: 'Шаблоны' },
  ],
  '/knowledge': [
    { label: 'Главная', to: '/' },
    { label: 'База знаний' },
  ],
  '/auth/login': [
    { label: 'Главная', to: '/' },
    { label: 'Вход' },
  ],
  '/auth/register': [
    { label: 'Главная', to: '/' },
    { label: 'Регистрация' },
  ],
  '/auth/forgot-password': [
    { label: 'Главная', to: '/' },
    { label: 'Восстановление пароля' },
  ],
  '/profile': [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет' },
  ],
  '/profile/edit': [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет', to: '/profile' },
    { label: 'Редактирование профиля' },
  ],
  '/profile/templates': [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет', to: '/profile' },
    { label: 'Мои шаблоны' },
  ],
  '/profile/templates/new': [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет', to: '/profile' },
    { label: 'Мои шаблоны', to: '/profile/templates' },
    { label: 'Создать шаблон' },
  ],
  '/profile/favorites': [
    { label: 'Главная', to: '/' },
    { label: 'Личный кабинет', to: '/profile' },
    { label: 'Избранное' },
  ],
}

function App() {
  return (
    <div className="app app--drawer-only">
      <div className="app__body">
        <Sidebar />

        <main className="main">
          <div className="main__inner">
            <Breadcrumbs />

            <Routes>
              <Route path="/" element={<HomeInstructionPage />} />

              <Route
                path="/hub"
                element={
                  <TemplateCatalogPage
                    label="Публичный ящик"
                    title="Промпт-хаб"
                    paperMark="PUBLIC"
                    description="Публичный каталог промптов от пользователей: можно посмотреть список карточек, найти нужный промпт, открыть детальную страницу, скопировать текст и добавить карточку в избранное."
                  />
                }
              />

              <Route
                path="/hub/demo-prompt"
                element={
                  <Page
                    label="Карточка промпта"
                    title="Демо-промпт"
                    description="На этой странице будет текст промпта, результат, инструмент, сфера применения и действия: скопировать, добавить в избранное, использовать как основу для нового шаблона."
                    actions={[
                      {
                        to: '/hub',
                        label: 'Назад в каталог',
                      },
                      {
                        to: '/profile/templates/new',
                        label: 'Создать похожий шаблон',
                        variant: 'primary',
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/editor"
                element={<Navigate to="/profile/templates/new" replace />}
              />

              <Route path="/research" element={<ResearchPage />} />

              <Route
                path="/research/demo-research"
                element={
                  <Page
                    label="Карточка исследования"
                    title="Демо-исследование"
                    description="Здесь будет описание исследования, краткий вывод и связанные шаблоны или промпты."
                    actions={[
                      {
                        to: '/research',
                        label: 'Назад к исследованиям',
                      },
                      {
                        to: '/profile/templates/new',
                        label: 'Создать шаблон по исследованию',
                        variant: 'primary',
                      },
                    ]}
                  />
                }
              />

              <Route path="/templates" element={<TemplateCatalogPage />} />
              <Route path="/templates/:templateId" element={<TemplateDetailPage />} />

              <Route path="/knowledge" element={<KnowledgeBasePage />} />

              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/auth/register" element={<RegisterForm />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordForm />} />

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
                        to: '/profile',
                        label: 'Назад в кабинет',
                        variant: 'primary',
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
                    description="[В РАЗРАБОТКЕ] Список шаблонов, которые пользователь создал сам."
                    actions={[
                      {
                        to: '/profile/templates/new',
                        label: 'Создать шаблон',
                        variant: 'primary',
                      },
                      {
                        to: '/profile',
                        label: 'Назад в кабинет',
                      },
                    ]}
                  />
                }
              />

              <Route
                path="/profile/templates/new"
                element={
                  <Suspense fallback={<EditorLoadingCard />}>
                    <TemplateCreationForm />
                  </Suspense>
                }
              />

              <Route
                path="/profile/favorites"
                element={<FavoriteTemplatesPage />}
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
                        to: '/',
                        label: 'На главную',
                        variant: 'primary',
                      },
                      {
                        to: '/templates',
                        label: 'К шаблонам',
                      },
                    ]}
                  />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar cabinet-sidebar">
      <Link to="/" className="cabinet-brand cabinet-brand--sticker">
        <img
          className="cabinet-brand__sticker"
          src={promptotekaLogoSticker}
          alt="Промптотека — картотека промптов"
          width="800"
          height="533"
          loading="eager"
        />
      </Link>

      <section className="sidebar__section">
        <p className="sidebar__title">Основные ящики</p>

        <nav className="sidebar__nav cabinet-drawer-nav" aria-label="Разделы сайта">
          {mainNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `drawer-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="drawer-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </section>

      <section className="sidebar__section">
        <p className="sidebar__title">Личный раздел</p>

        <nav className="sidebar__nav cabinet-drawer-nav" aria-label="Личный кабинет">
          {profileNavigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `drawer-link drawer-link--profile-label ${isActive ? 'active' : ''}`
              }
            >
              <span className="drawer-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </section>

      <div className="cabinet-sidebar__bottom">
        <Link to="/auth/login" className="cabinet-login-ticket">
          Войти
        </Link>
      </div>
    </aside>
  )
}

function Breadcrumbs() {
  const location = useLocation()
  const breadcrumbs = createBreadcrumbsByPath(location.pathname)

  return (
    <div className="breadcrumbs" aria-label="Хлебные крошки">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          <span key={`${item.label}-${index}`} className="breadcrumbs__item">
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}

            {!isLast && <span className="breadcrumbs__separator">/</span>}
          </span>
        )
      })}
    </div>
  )
}

function createBreadcrumbsByPath(pathname) {
  if (breadcrumbsMap[pathname]) {
    return breadcrumbsMap[pathname]
  }

  if (pathname.startsWith('/templates/')) {
    return [
      { label: 'Главная', to: '/' },
      { label: 'Шаблоны', to: '/templates' },
      { label: 'Карточка шаблона' },
    ]
  }

  return [
    { label: 'Главная', to: '/' },
    { label: 'Неизвестная страница' },
  ]
}

function HomeInstructionPage() {
  return (
    <section className="instruction-spread" aria-labelledby="home-page-title">
      <div className="instruction-spread__header">
        <p className="instruction-spread__code">SYSTEM / PROMPTOTEKA / MODEL 01</p>

        <h1 id="home-page-title">Промптотека</h1>

        <p className="instruction-spread__lead">
          Карточная система для промптов, шаблонов, исследований и рабочих
          инструкций для ИИ-инструментов.
        </p>
      </div>

      <div className="instruction-spread__pages" aria-label="Как пользоваться Промптотекой">
        <article className="instruction-page instruction-page--first">
          <div className="instruction-page__stamp">SECTION 01</div>

          <h2>Найдите готовую карточку</h2>

          <p>
            Откройте каталог шаблонов, используйте поиск и фильтры, чтобы быстро
            найти подходящий промпт под свою задачу.
          </p>

          <ul className="instruction-page__list">
            <li>поиск по названию и описанию;</li>
            <li>фильтрация по сфере и инструменту;</li>
            <li>просмотр детальной карточки.</li>
          </ul>

          <Link to="/templates" className="button button--primary">
            Открыть шаблоны
          </Link>
        </article>

        <article className="instruction-page instruction-page--second">
          <div className="instruction-page__stamp">SECTION 02</div>

          <h2>Создайте свой шаблон</h2>

          <p>
            Форма создания шаблона уже содержит редактор промпта, быстрые вставки
            и предпросмотр подсветки синтаксиса.
          </p>

          <div className="instruction-page__example">
            <span>## Роль</span>
            <span>{'{{переменная}}'}</span>
            <span>+++Format</span>
          </div>

          <Link to="/profile/templates/new" className="button">
            Создать шаблон
          </Link>
        </article>

        <article className="instruction-page instruction-page--third">
          <div className="instruction-page__stamp">SECTION 03</div>

          <h2>Сохраните результат</h2>

          <p>
            Удачный промпт можно оформить как шаблон: заполнить название,
            выбрать параметры и сохранить карточку в личную картотеку.
          </p>

          <ul className="instruction-page__list">
            <li>название шаблона;</li>
            <li>сфера применения;</li>
            <li>пример результата.</li>
          </ul>

          <Link to="/profile/templates/new" className="button">
            Создать карточку
          </Link>
        </article>
      </div>

      <div className="instruction-spread__footer">
        <p>
          Принцип простой: открыл ящик → выбрал карточку → применил промпт →
          сохранил удачный вариант.
        </p>
      </div>
    </section>
  )
}

function EditorLoadingCard() {
  return (
    <section className="page-card">
      <div className="page-card__top">
        <span className="page-card__label">Загрузка бланка</span>
        <span className="page-card__paper-mark">LOADING</span>
      </div>

      <div className="page-card__content">
        <h1>Готовим редактор</h1>
        <p>Секунду, достаём рабочую карточку из картотеки.</p>
      </div>
    </section>
  )
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
            className={`button ${action.variant === 'primary' ? 'button--primary' : ''}`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  )
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
        <p>[В РАЗРАБОТКЕ] Профиль пользователя, его шаблоны и избранные материалы.</p>
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
  )
}

export default App
