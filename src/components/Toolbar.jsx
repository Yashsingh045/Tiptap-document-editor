import React from 'react'
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
    Printer
} from 'lucide-react'

const Toolbar = ({ editor }) => {
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
            icon: <Printer size={18} />,
            onClick: () => window.print(),
            isActive: false,
            label: 'Print Document',
            className: 'bg-primary text-white hover:bg-primary/90 ml-auto',
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
