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
    Table as TableIcon
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
    ]

    return (
        <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 bg-white/80 backdrop-blur-md border-b shadow-sm">
            {buttons.map((btn, i) => (
                <button
                    key={i}
                    onClick={btn.onClick}
                    className={`p-2 rounded-md transition-colors ${btn.isActive
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                    title={btn.label}
                >
                    {btn.icon}
                </button>
            ))}
        </div>
    )
}

export default Toolbar
