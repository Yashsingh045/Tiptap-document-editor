import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FlexRow, BlockContainer } from './extensions/LayoutExtensions'
import { StyledParagraph, StyledHeading, StyledListItem, StyledBulletList, StyledOrderedList } from './extensions/StyleExtensions'
import Toolbar from './components/Toolbar'
import Page from './extensions/Page'
import Document from './extensions/Document'
import Pagination from './extensions/Pagination'
import DocumentSettings from './components/DocumentSettings'
import { useState, useEffect } from 'react'
import TemplateGallery from './components/TemplateGallery'
import { ArrowLeft } from 'lucide-react'

const App = () => {
  const [currentDocId, setCurrentDocId] = useState(null)
  const [showGallery, setShowGallery] = useState(true)

  const editor = useEditor({
    extensions: [
      Document,
      StarterKit.configure({
        document: false,
        paragraph: false,
        heading: false,
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      StyledParagraph,
      StyledHeading,
      StyledListItem,
      StyledBulletList,
      StyledOrderedList,
      Page,
      Pagination,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockContainer', 'flexRow'],
      }),
      TextStyle,
      Color,
      FlexRow,
      BlockContainer,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
  })

  // Save document to localStorage
  const saveDocument = () => {
    if (!editor) return

    const content = editor.getHTML()
    const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/) || content.match(/<p[^>]*>(.*?)<\/p>/)
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : 'Untitled Document'

    // Simple UUID generator fallback for non-secure contexts
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
      }
      return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    const docId = currentDocId || generateId()
    if (!currentDocId) setCurrentDocId(docId)

    const newDoc = {
      id: docId,
      title: title || 'Untitled Document',
      content,
      lastModified: Date.now(),
      preview: editor.getText().slice(0, 100)
    }

    try {
      const existingDocs = JSON.parse(localStorage.getItem('tiptap-recent-docs') || '[]')
      const otherDocs = existingDocs.filter(d => d.id !== docId)
      const updatedDocs = [newDoc, ...otherDocs].slice(0, 50) // Limit to 50
      localStorage.setItem('tiptap-recent-docs', JSON.stringify(updatedDocs))
    } catch (e) {
      console.error('Failed to save document:', e)
    }
  }

  // Auto-save on content change
  useEffect(() => {
    if (!editor) return

    const handleUpdate = () => {
      // Debounce could be improved, but this is simple enough for now
      // or we rely on Tiptap's update frequency. 
      // Let's use a timeout to debounce.
      clearTimeout(window._saveTimeout)
      window._saveTimeout = setTimeout(saveDocument, 1000)
    }

    editor.on('update', handleUpdate)

    return () => {
      editor.off('update', handleUpdate)
      clearTimeout(window._saveTimeout)
    }
  }, [editor, currentDocId])

  const handleTemplateSelect = (content) => {
    if (editor) {
      editor.commands.setContent(content)
      setCurrentDocId(null) // Reset ID for new document
      setShowGallery(false)
      // Force an immediate save to create the entry? No, let user type first.
      // Actually, saving immediately ensures it appears in "Recent" even if they don't type.
      // Let's allow update listener to catch it, or force saving after a moment.
      setTimeout(saveDocument, 500)
    }
  }

  const handleLoadDocument = (doc) => {
    if (editor) {
      editor.commands.setContent(doc.content)
      setCurrentDocId(doc.id)
      setShowGallery(false)
    }
  }

  if (showGallery) {
    return <TemplateGallery onSelect={handleTemplateSelect} onLoad={handleLoadDocument} />
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased">
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center gap-4 no-print sticky top-0 z-60">
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

      <main className="flex-1 overflow-auto p-0 block md:flex md:justify-center pb-32 no-scrollbar-x">
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
