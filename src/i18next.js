import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
      en: {
        translation: {
          test_task_for: 'Test task for:',
          email: 'Email',
          enter_email: 'Enter email',
          password: 'Password',
          remember_me: 'Remember me',
          forgot_password: 'Forgot password?',
          close: 'Close',
          sign_in: 'Sign In',
          forgot_your_password: 'Forgot your password?',
          back: 'Back',
          send_reset_link: 'Send reset link',
        },
      },
      ru: {
        translation: {
          test_task_for: 'Tестовое задание для:',
          email: 'Электронная почта',
          enter_email: 'Введите адрес электронной почты',
          password: 'Пароль',
          remember_me: 'Запомнить меня',
          forgot_password: 'Забыли пароль?',
          close: 'Закрыть',
          sign_in: 'Войти в систему',
          forgot_your_password: 'Забыли свой пароль?',
          back: 'Назад',
          send_reset_link: 'Отправить ссылку сброса',
        },
      },
      de: {
        translation: {
          test_task_for: 'Testaufgabe für:',
          email: 'Email',
          enter_email: 'Email eingeben',
          password: 'Passwort',
          remember_me: 'Erinnere dich an mich',
          forgot_password: 'Passwort vergessen?',
          close: 'Schließen',
          sign_in: 'Einloggen',
          forgot_your_password: 'Haben Sie Ihr Passwort vergessen?',
          back: 'Zurück',
          send_reset_link: 'Link zum Zurücksetzen senden',
        },
      },
    },
  })

export default i18next
