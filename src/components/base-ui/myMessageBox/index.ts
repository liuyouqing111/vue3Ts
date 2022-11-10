import messageBox from './src/index.vue'
import { createVNode, render } from 'vue'

let mountNode: HTMLElement | null

interface Ioptions {
  title: string
  message: string
}

const $messageBox = (options?: Ioptions) => {
  return new Promise<void>((resolve, reject) => {
    function destoryNode() {
      if (mountNode) {
        document.body.removeChild(mountNode)
        mountNode = null
      }
    }
    destoryNode()
    const app = createVNode(messageBox, {
      ...options,
      confirm: () => {
        resolve()
        app.component?.exposed?.ok()
        destoryNode()
      },
      cancel() {
        reject()
        app.component?.exposed?.ok()
        destoryNode()
      }
    })
    mountNode = document.createElement('div')
    render(app, mountNode)
    document.body.appendChild(mountNode)
  })
}

export default $messageBox
