import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const PAGE_HEIGHT_PX = 1122
const MARGIN_PX = 96

const Pagination = Extension.create({
    name: 'pagination',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('pagination'),
                view: (editorView) => {
                    return {
                        update: (view, prevState) => {
                            // Debounce to avoid stuttering
                            if (this.storage.timeout) clearTimeout(this.storage.timeout)
                            this.storage.timeout = setTimeout(() => {
                                this.options.handlePagination(view)
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
            handlePagination: (view) => {
                const { state, dispatch } = view
                const { doc, tr } = state

                // Avoid nested calls
                if (tr.getMeta('pagination')) return

                let modified = false
                const pageElements = view.dom.querySelectorAll('.page')

                if (pageElements.length === 0) {
                    // Wrap everything in a page if missing
                    // tr.setNodeMarkup(0, state.schema.nodes.page)
                    return
                }

                // Very basic reflow: if the last page overflows, add a new one?
                // Actually, the current CSS handles the visual part.
                // What we need is to make sure the PRINT output matches.

                // For the purpose of this assignment, I will focus on the VISUAL PAGINATION
                // that matches print specs.
            }
        }
    }
})

export default Pagination
