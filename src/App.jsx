import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Toolbar from './components/Toolbar'
import Page from './extensions/Page'
import Pagination from './extensions/Pagination'
import DocumentSettings from './components/DocumentSettings'
import { useState } from 'react'
import TemplateGallery from './components/TemplateGallery'
import { ArrowLeft } from 'lucide-react'

const App = () => {
  const [showGallery, setShowGallery] = useState(true)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Page,
      Pagination,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-slate focus:outline-none max-w-none editor-root',
      },
    },
  })

  const handleTemplateSelect = (content) => {
    if (editor) {
      editor.commands.setContent(content)
      setShowGallery(false)
    }
  }

  if (showGallery) {
    return <TemplateGallery onSelect={handleTemplateSelect} />
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased animate-in fade-in duration-500">
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-4 no-print">
        <button
          onClick={() => setShowGallery(true)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Gallery
        </button>
        <div className="h-4 w-px bg-slate-200"></div>
        <span className="text-sm font-bold text-slate-700 tracking-tight">Docs Editor</span>
      </div>

      <Toolbar editor={editor} />

      <main className="flex-1 overflow-auto p-4 md:p-12 flex justify-center pb-32">
        <EditorContent editor={editor} className="max-w-[210mm] w-full" />
      </main>

      <DocumentSettings editor={editor} />

      <div className="fixed bottom-6 right-6 bg-white/90 backdrop-blur shadow-2xl px-4 py-2 rounded-2xl text-[10px] text-slate-500 border border-slate-200 z-50 select-none flex items-center gap-3 no-print">
        <div className="flex items-center gap-1.5 font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          A4 STANDARD
        </div>
        <div className="w-px h-3 bg-slate-200"></div>
        <div className="font-medium uppercase">1" Margins</div>
      </div>
    </div>
  )
}

export default App
