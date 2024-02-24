import type { App } from 'vue'

const importComponents = import.meta.glob('@/layouts/*.vue')

export const registerLayouts = async (app: App<Element>): Promise<void> => {
  for (const fileName of Object.keys(importComponents)) {
    const componentConfig = await importComponents[fileName]()
    const componentName = fileName
      .split('/')
      .pop()
      ?.replace(/\.\w+$/, '') as string

    app.component(`${componentName}`, (componentConfig as any)?.default)
  }
}
