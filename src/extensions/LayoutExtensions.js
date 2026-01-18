import { Node, mergeAttributes } from '@tiptap/core'

export const FlexRow = Node.create({
    name: 'flexRow',
    group: 'block',
    content: 'inline*',

    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
            class: {
                default: null,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    // Match if it has display: flex or if it's explicitly a content row we want to treat as text block
                    const style = element.getAttribute('style') || ''
                    if (style.includes('display: flex')) {
                        return {}
                    }
                    return false
                },
                priority: 60
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    }
})

export const BlockContainer = Node.create({
    name: 'blockContainer',
    group: 'block',
    content: 'block+',

    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
            class: {
                default: null,
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    // Avoid matching the page node
                    if (element.hasAttribute('data-type')) return false
                    // If it matched FlexRow, this shouldn't run if priorities are right, 
                    // but let's be safe: this matches other divs
                    return {}
                },
                priority: 50
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes), 0]
    }
})
