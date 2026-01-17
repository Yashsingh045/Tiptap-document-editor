import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import PageView from './PageView'

/**
 * Page Node Extension
 * 
 * Represents a single A4 page in the document.
 * Handles header, footer, and page numbering metadata.
 * Uses a React NodeView for high-fidelity A4 rendering.
 */
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
            header: {
                default: 'Draft Document',
            },
            footer: {
                default: 'LegalBridge Document Editor',
            },
        }
    },

    parseHTML() {
        return [{ tag: 'div[data-type="page"]' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'page', class: 'page' }), 0]
    },

    addKeyboardShortcuts() {
        return {
            /** Mod-Enter (Cmd/Ctrl + Enter) splits the document and starts a new page */
            'Mod-Enter': () => {
                const { from } = this.editor.state.selection
                return this.editor.commands.splitPage(from)
            },
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(PageView)
    },

    addCommands() {
        return {
            /**
             * Structural command to split the current page at the given position.
             */
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
