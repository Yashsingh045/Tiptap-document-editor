import { Node, mergeAttributes } from '@tiptap/core'

const Page = Node.create({
    name: 'page',

    group: 'block',

    content: 'block+',

    defining: true,

    addAttributes() {
        return {
            pageNumber: {
                default: 1,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="page"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'page', class: 'page' }), 0]
    },
})

export default Page
