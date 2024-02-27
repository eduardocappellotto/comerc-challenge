// eslint-disable-next-line no-undef
export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generates a Vue component',
    prompts: [
      {
        type: 'input',
        name: 'component',
        message: 'Component name, e.g. NatureBanner'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase component}}/{{pascalCase component}}.vue',
        templateFile: 'plop-templates/component.hbs'
      }
    ]
  })
}
