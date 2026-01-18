import { Node } from '@tiptap/core'

/**
 * Custom Document Extension
 * 
 * Enforces a strict root structure where only 'page' nodes are allowed.
 * This prevents content from leaking outside the A4 pages.
 */
export const Document = Node.create({
    name: 'doc',
    topNode: true,
    content: 'page+',
})

export default Document
