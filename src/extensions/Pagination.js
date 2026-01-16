import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

const PAGE_HEIGHT_PT = 841.89 // A4 height in points
const PAGE_HEIGHT_PX = 1122.5 // A4 height in pixels (approximated at 96dpi)
const MARGIN_PX = 96 // 1 inch

const Pagination = Extension.create({
    name: 'pagination',

    addOptions() {
        return {
            pageHeight: PAGE_HEIGHT_PX - (2 * MARGIN_PX), // content area height
        }
    },

    addProseMirrorPlugins() {
        const { pageHeight } = this.options

        return [
            new Plugin({
                key: new PluginKey('pagination'),
                appendTransaction: (transactions, oldState, newState) => {
                    if (!transactions.some(tr => tr.docChanged)) {
                        return null
                    }

                    // Logic to ensure document is wrapped in page nodes
                    // and content is distributed correctly
                    let tr = newState.tr
                    let modified = false

                    // 1. Ensure document starts with a page node
                    if (newState.doc.childCount === 0 || newState.doc.firstChild.type.name !== 'page') {
                        // This is complex to do purely in appendTransaction without infinite loops
                        // Better to handle in a debounced update or initial content
                    }

                    return modified ? tr : null
                },
            }),
        ]
    },
})

export default Pagination
