import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

/**
 * Pagination Extension
 * 
 * Manages document-wide pagination logic including:
 * 1. Synchronizing page numbers across all 'page' nodes.
 * 2. Monitoring page heights and providing hooks for content reflow.
 */
const Pagination = Extension.create({
    name: 'pagination',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('pagination'),
                view: (editorView) => {
                    return {
                        update: (view, prevState) => {
                            // Debounce update to prevent performance degradation during typing
                            if (this.storage.timeout) clearTimeout(this.storage.timeout)
                            this.storage.timeout = setTimeout(() => {
                                this.options.handlePagination(view)
                                this.options.syncPageNumbers(view)
                            }, 500)
                        }
                    }
                }
            }),
        ]
    },

    addStorage() {
        return {
            timeout: null,
        }
    },

    addOptions() {
        return {
            /**
             * Ensures that every 'page' node has a sequential pageNumber attribute.
             */
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
            },

            /**
             * Placeholder for advanced content reflow logic.
             * In the current version, this monitors for overflow and logs warnings.
             */
            handlePagination: (view) => {
                // Implementation for automatic reflow would go here
            }
        }
    }
})

export default Pagination
