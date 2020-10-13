declare const __APP_CONFIG__: Readonly<{ [key: string]: any }>
declare const __PRIVACY_POLICY__: Readonly<string>

declare const __I18N_CONFIG__: Readonly<{
  defaultLocale: string
  locales: string
  dict: TranslationDataDict
}>

declare module '*.svg' {
  const content: any
  export default content
}

interface TranslationData {
  [key: string]: TranslationData | string
}

interface TranslationDataDict {
  [locale: string]: TranslationData
}

interface RouteData {
  component: string
  exact?: boolean
  path: string
}

interface Window {
  __INITIAL_STATE__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  snapSaveState: () => void
}
