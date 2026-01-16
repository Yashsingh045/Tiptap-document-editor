import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import PageView from './PageView'

const Page = Node.create({
    name: 'page',
    group: 'block',
    content: 'block+',
    defining: true,
    draggable: false,

    addAttributes() {
        return {
            pageNumber: {
                default: 1,
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="page"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'page', class: 'page' }), 0]
    },

    addNodeView() {
        return ReactNodeViewRenderer(PageView)
    },

    addCommands() {
        return {
            splitPage: (pos) => ({ tr, state, dispatch }) => {
                if (dispatch) {
                    tr.split(pos, 1, [{ type: state.schema.nodes.page.type }])
                    return true
                }
                return false
            },
        }
    },
})

export default Page
