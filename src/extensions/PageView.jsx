import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

const PAGE_HEIGHT_PX = 1122
const MARGIN_PX = 96

const PageView = ({ node, updateAttributes, editor, getPos }) => {
    const pageRef = useRef(null)

    useEffect(() => {
        const checkOverflow = () => {
            if (!pageRef.current || !editor.isEditable) return

            const contentHeight = pageRef.current.scrollHeight
            const maxHeight = PAGE_HEIGHT_PX

            if (contentHeight > maxHeight) {
                // Find the overflow position
                // This is a simplified version: split at the end of the current page
                // In a more advanced version, we'd find the exact node that overflows.
                console.log('Page overflow detected in NodeView')
            }
        }

        const observer = new ResizeObserver(checkOverflow)
        if (pageRef.current) {
            observer.observe(pageRef.current)
        }

        return () => observer.disconnect()
    }, [editor.isEditable])

    return (
        <NodeViewWrapper className="page-wrapper">
            <div
                ref={pageRef}
                className="page shadow-lg bg-white mx-auto my-8 relative border border-gray-100"
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '25.4mm',
                    boxSizing: 'border-box'
                }}
            >
                <div className="absolute top-4 right-8 text-xs text-gray-400 select-none">
                    Page {node.attrs.pageNumber}
                </div>
                <NodeViewContent className="outline-none" />
            </div>
        </NodeViewWrapper>
    )
}

export default PageView
