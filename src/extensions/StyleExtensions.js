import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { mergeAttributes } from '@tiptap/core'

export const StyledParagraph = Paragraph.extend({
    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
})

export const StyledHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            level: {
                default: 1,
                keepOnSplit: false,
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
        }
    },

    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level)
        const level = hasLevel ? node.attrs.level : this.options.levels[0]

        return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
})

export const StyledListItem = ListItem.extend({
    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
        }
    },
    renderHTML({ HTMLAttributes }) {
        return ['li', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
})

export const StyledBulletList = BulletList.extend({
    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
        }
    },
    renderHTML({ HTMLAttributes }) {
        return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
})

export const StyledOrderedList = OrderedList.extend({
    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
            },
        }
    },
    renderHTML({ HTMLAttributes }) {
        return ['ol', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    }
})
