import React, { useEffect, useState } from 'react'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Undo,
    Redo,
    Table as TableIcon,
    Scissors,
    Printer,
    FileText
} from 'lucide-react'

const Toolbar = ({ editor }) => {
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        if (!editor) return

        const updatePageCount = () => {
            let count = 0
            editor.state.doc.descendants((node) => {
                if (node.type.name === 'page') {
                    count++
                }
            })
            setPageCount(count)
        }

        updatePageCount()
        editor.on('update', updatePageCount)
        return () => {
            editor.off('update', updatePageCount)
        }
    }, [editor])

    if (!editor) {
        return null
    }

    const buttons = [
        {
            icon: <Heading1 size={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive('heading', { level: 1 }),
            label: 'Heading 1',
        },
        {
            icon: <Heading2 size={18} />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive('heading', { level: 2 }),
            label: 'Heading 2',
        },
        {
            icon: <Bold size={18} />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive('bold'),
            label: 'Bold',
        },
        {
            icon: <Italic size={18} />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive('italic'),
            label: 'Italic',
        },
        {
            icon: <List size={18} />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive('bulletList'),
            label: 'Bullet List',
        },
        {
            icon: <ListOrdered size={18} />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive('orderedList'),
            label: 'Ordered List',
        },
        {
            icon: <TableIcon size={18} />,
            onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
            isActive: editor.isActive('table'),
            label: 'Insert Table',
        },
        {
            icon: <Scissors size={18} />,
            onClick: () => {
                const { from } = editor.state.selection
                editor.chain().focus().splitPage(from).run()
            },
            isActive: false,
            label: 'Insert Page Break',
        },
        {
            type: 'separator',
        },
        {
            icon: <Undo size={18} />,
            onClick: () => editor.chain().focus().undo().run(),
            isActive: false,
            label: 'Undo',
        },
        {
            icon: <Redo size={18} />,
            onClick: () => editor.chain().focus().redo().run(),
            isActive: false,
            label: 'Redo',
        },
        {
            type: 'spacer',
        },
        {
            component: (
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-xs font-medium text-gray-500 mr-2 shrink-0">
                    <FileText size={14} className="text-primary" />
                    <span>{pageCount} {pageCount === 1 ? 'Page' : 'Pages'}</span>
                </div>
            )
        },
        {
            icon: <Printer size={18} />,
            onClick: () => window.print(),
            isActive: false,
            label: 'Print Document',
            className: 'bg-primary text-white hover:bg-primary/90 ml-auto shadow-sm',
        },
    ]

    return (
        <div className="sticky top-0 z-10 flex items-center gap-1 p-2 bg-white/80 backdrop-blur-md border-b shadow-sm w-full overflow-x-auto no-scrollbar">
            {buttons.map((btn, i) => {
                if (btn.type === 'separator') {
                    return <div key={i} className="w-px h-6 bg-gray-200 mx-1" />
                }
                if (btn.type === 'spacer') {
                    return <div key={i} className="flex-1" />
                }
                if (btn.component) {
                    return <React.Fragment key={i}>{btn.component}</React.Fragment>
                }
                return (
                    <button
                        key={i}
                        onClick={btn.onClick}
                        className={`p-2 rounded-md transition-all shrink-0 ${btn.isActive
                                ? 'bg-primary/10 text-primary'
                                : btn.className || 'hover:bg-gray-100 text-gray-600'
                            }`}
                        title={btn.label}
                    >
                        {btn.icon}
                    </button>
                )
            })}
        </div>
    )
}

export default Toolbar
