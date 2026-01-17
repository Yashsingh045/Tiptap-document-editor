import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

const PAGE_HEIGHT_PX = 1122

const PageView = ({ node, updateAttributes, editor, getPos }) => {
    const pageRef = useRef(null)
    const { header, footer, pageNumber } = node.attrs

    useEffect(() => {
        const checkOverflow = () => {
            if (!pageRef.current || !editor.isEditable) return

            const contentHeight = pageRef.current.scrollHeight
            const maxHeight = PAGE_HEIGHT_PX

            if (contentHeight > maxHeight) {
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
                    <span className="font-semibold text-gray-300">CONFIDENTIAL</span>
                </div>

                {/* Content Area */}
                <NodeViewContent className="outline-none min-h-[calc(297mm-50.8mm)]" />

                {/* Footer */}
                <div className="absolute bottom-8 left-[25.4mm] right-[25.4mm] flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-50 pt-2 select-none">
                    <span>{footer}</span>
                    <span>Page {pageNumber}</span>
                </div>
            </div>
        </NodeViewWrapper>
    )
}

export default PageView
