import type { App } from 'vue'

const importViews = import.meta.glob('@/views/**/*.vue')

export const registerViews = async (app: App<Element>): Promise<void> => {
  for (const fileName of Object.keys(importViews)) {
    const componentConfig = await importViews[fileName]()
    const componentName = fileName
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '') as string

    app.component(`${componentName}`, (componentConfig as any)?.default)
  }
}
