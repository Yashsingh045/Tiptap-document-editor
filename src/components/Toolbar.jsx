import React, { useEffect, useState } from 'react'
import {
    Bold, Italic, List, ListOrdered, Heading1, Heading2,
    Undo, Redo, Table as TableIcon, Scissors, Printer,
    FileText, Plus, Trash2
} from 'lucide-react'
import clsx from 'clsx'

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

    if (!editor) return null

    const CommandButton = ({ onClick, isActive, icon, label, className = '' }) => (
        <button
            onClick={onClick}
            onMouseDown={(e) => e.preventDefault()}
            className={clsx(
                "p-2 rounded-lg transition-all flex items-center justify-center gap-1.5 min-w-[36px] min-h-[36px] group",
                isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-600 hover:bg-slate-100",
                className
            )}
            title={label}
        >
            {icon}
        </button>
    )

    const addPage = () => {
        editor.chain().focus().insertPage().run()
    }

    const deleteCurrentPage = () => {
        if (pageCount > 1) {
            editor.chain().focus().deletePage(editor.state.selection.from).run()
        }
    }

    return (
        <div className="sticky top-0 z-[60] p-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm flex items-center justify-center no-print">
            <div className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/40 max-w-full overflow-x-auto no-scrollbar">

                {/* Structure Group */}
                <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
                    <CommandButton
                        onClick={addPage}
                        icon={<Plus size={18} />}
                        label="New Page"
                        className="text-primary hover:bg-primary/10"
                    />
                    <CommandButton
                        onClick={deleteCurrentPage}
                        icon={<Trash2 size={18} />}
                        label="Delete Page"
                        className="text-rose-500 hover:bg-rose-50"
                    />
                    <CommandButton
                        onClick={() => editor.chain().focus().splitPage(editor.state.selection.from).run()}
                        icon={<Scissors size={18} />}
                        label="Page Break"
                    />
                </div>

                {/* Text Group */}
                <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        icon={<Heading1 size={18} />}
                        label="Heading 1"
                    />
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        icon={<Heading2 size={18} />}
                        label="Heading 2"
                    />
                </div>

                {/* Style Group */}
                <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        icon={<Bold size={18} />}
                        label="Bold"
                    />
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        icon={<Italic size={18} />}
                        label="Italic"
                    />
                </div>

                {/* List Group */}
                <div className="flex items-center gap-0.5 px-1 border-r border-slate-200">
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        icon={<List size={18} />}
                        label="Bullet List"
                    />
                    <CommandButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        icon={<ListOrdered size={18} />}
                        label="Ordered List"
                    />
                </div>

                {/* Table & Tools */}
                <div className="flex items-center gap-0.5 px-1">
                    <CommandButton
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                        isActive={editor.isActive('table')}
                        icon={<TableIcon size={18} />}
                        label="Insert Table"
                    />
                    <div className="w-px h-6 bg-slate-200 mx-1" />
                    <CommandButton onClick={() => editor.chain().focus().undo().run()} icon={<Undo size={18} />} label="Undo" />
                    <CommandButton onClick={() => editor.chain().focus().redo().run()} icon={<Redo size={18} />} label="Redo" />
                </div>

                {/* Stats */}
                <div className="flex items-center pl-3 pr-1 gap-2 border-l border-slate-200 ml-1 text-slate-400">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 shrink-0">
                        <FileText size={14} className="text-primary" />
                        <span>{pageCount} {pageCount === 1 ? 'PAGE' : 'PAGES'}</span>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                        title="Print"
                    >
                        <Printer size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar
