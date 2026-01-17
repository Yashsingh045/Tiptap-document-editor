import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const Pagination = Extension.create({
    name: 'pagination',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('pagination'),
                view: (editorView) => {
                    return {
                        update: (view, prevState) => {
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
            handlePagination: (view) => {
                // ... (existing logic or placeholder)
            }
        }
    }
})

export default Pagination
