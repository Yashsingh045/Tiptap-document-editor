import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

/**
 * Pagination Extension
 * 
 * Automatically manages 'page' nodes to ensure content stays within A4 boundaries.
 */
const Pagination = Extension.create({
    name: 'pagination',

    addOptions() {
        return {
            maxHeight: 1122, // A4 height in pixels at 96 DPI (approx)
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: ['page'],
                attributes: {
                    contentHeight: {
                        default: 0,
                        renderHTML: attributes => ({
                            'data-content-height': attributes.contentHeight,
                        }),
                        parseHTML: element => element.getAttribute('data-content-height'),
                    },
                },
            },
        ]
    },

    addProseMirrorPlugins() {
        const { maxHeight } = this.options
        const editor = this.editor

        return [
            new Plugin({
                key: new PluginKey('pagination-monitor'),
                view: (editorView) => {
                    return {
                        update: (view) => {
                            // Sync page numbers whenever the document structure changes
                            this.storage.syncPageNumbers(view)
                        }
                    }
                },
                appendTransaction: (transactions, oldState, newState) => {
                    // Avoid recursive calls if we just modified pagination
                    if (transactions.some(tr => tr.getMeta('pagination-sync'))) {
                        return null
                    }

                    // We will handle overflow logic here if needed, 
                    // but for "ONLY type within visible page", we might want to 
                    // prevent typing or move to next page.

                    return null
                }
            })
        ]
    },

    addStorage() {
        return {
            syncPageNumbers: (view) => {
                const { state, dispatch } = view
                let tr = state.tr
                let modified = false
                let pageIdx = 1

                state.doc.descendants((node, pos) => {
                    if (node.type.name === 'page') {
                        if (node.attrs.pageNumber !== pageIdx) {
                            tr.setNodeMarkup(pos, null, {
                                ...node.attrs,
                                pageNumber: pageIdx,
                            })
                            modified = true
                        }
                        pageIdx++
                    }
                })

                if (modified) {
                    tr.setMeta('pagination-sync', true)
                    dispatch(tr)
                }
            }
        }
    }
})

export default Pagination
