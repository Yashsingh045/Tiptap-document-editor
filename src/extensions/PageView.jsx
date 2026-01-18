import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

const PAGE_HEIGHT_PX = 1122

const PageView = ({ node, updateAttributes, editor, getPos }) => {
    const pageRef = useRef(null)
    const { header, footer, pageNumber } = node.attrs

    useEffect(() => {
        const checkOverflow = () => {
            if (!pageRef.current || !editor.isEditable || !editor.isFocused) return

            const contentArea = pageRef.current.querySelector('.page-content')
            if (!contentArea) return

            // Available height for content: A4 height (1122px) - Padding/Margins
            // We use the offsetHeight of the content area as the limit
            const maxHeight = contentArea.offsetHeight
            const currentHeight = contentArea.scrollHeight

            if (currentHeight > maxHeight) {
                const { selection } = editor.state
                const pos = getPos()

                // Only split if content is within the current page boundary
                if (selection.from >= pos && selection.from <= pos + node.nodeSize) {
                    editor.chain().focus().splitPage(selection.from).run()
                }
            }
        }

        const observer = new ResizeObserver(() => {
            // Debounce to prevent performance hits
            clearTimeout(window._paginationTimeout)
            window._paginationTimeout = setTimeout(checkOverflow, 100)
        })

        const contentArea = pageRef.current?.querySelector('.page-content')
        if (contentArea) {
            observer.observe(contentArea)
        }

        return () => observer.disconnect()
    }, [editor.isEditable, node.attrs, getPos, editor, node.nodeSize])

    return (
        <NodeViewWrapper className="page-wrapper group relative">
            <div
                ref={pageRef}
                className="page shadow-lg bg-white mx-auto my-8 relative border border-gray-100 print:shadow-none print:my-0"
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    padding: '25.4mm',
                    boxSizing: 'border-box'
                }}
            >
                {/* Margin Guides (Visible on hover) */}
                <div className="margin-line opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Header */}
                <div className="absolute top-8 left-[25.4mm] right-[25.4mm] flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-50 pb-1 italic select-none">
                    <span>{header}</span>
                    <span className="font-semibold text-gray-300">INTERNAL USE</span>
                </div>

                {/* Content Area */}
                <NodeViewContent
                    className="outline-none min-h-[calc(297mm-50.8mm)] page-content"
                    data-page-id={pageNumber}
                />

                {/* Footer */}
                <div className="absolute bottom-8 left-[25.4mm] right-[25.4mm] flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-50 pt-2 select-none">
                    <span>{footer}</span>
                    <span className="bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100 font-medium">Page {pageNumber}</span>
                </div>
            </div>
        </NodeViewWrapper>
    )
}

export default PageView
