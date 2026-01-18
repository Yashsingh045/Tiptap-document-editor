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
    content: 'block+',
    defining: true,
    isolating: true,
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
                default: 'Page Footer',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="page"]',
                contentElement: '.page-content'
            },
            // Fallback for legacy/flat pages
            {
                tag: 'div[data-type="page"]'
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-type': 'page', class: 'page' }),
            ['div', { class: 'page-content' }, 0]
        ]
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
            insertPage: () => ({ commands, state }) => {
                return commands.insertContentAt(state.doc.content.size, {
                    type: this.name,
                    content: [{ type: 'paragraph' }]
                })
            },
            splitPage: (pos) => ({ tr, state, dispatch }) => {
                if (dispatch) {
                    let pagePos = -1
                    state.doc.descendants((node, p) => {
                        if (node.type.name === 'page' && pos >= p && pos <= p + node.nodeSize) {
                            pagePos = p
                        }
                    })

                    if (pagePos !== -1) {
                        try {
                            // Correctly pass the node type (not .type)
                            tr.split(pos, 2, [{ type: state.schema.nodes.page }])
                            return true
                        } catch (e) {
                            console.error('splitPage failed:', e)
                        }
                    }
                }
                return false
            },
            deletePage: (pos) => ({ tr, state, dispatch }) => {
                if (dispatch) {
                    let pagePos = -1
                    let pageNode = null
                    state.doc.descendants((node, p) => {
                        if (node.type.name === 'page' && pos >= p && pos <= p + node.nodeSize) {
                            pagePos = p
                            pageNode = node
                        }
                    })

                    if (pagePos !== -1) {
                        tr.delete(pagePos, pagePos + pageNode.nodeSize)
                        return true
                    }
                }
                return false
            }
        }
    },
})

export default Page
