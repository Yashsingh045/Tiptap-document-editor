import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Toolbar from './components/Toolbar'
import Page from './extensions/Page'

const App = () => {
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
    ],
    content: `
      <div data-type="page" data-page-number="1">
        <h1>Legal Document</h1>
        <p>This is page 1 content. Start typing here to see how it works. If you add enough content, a new page should ideally be created.</p>
      </div>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate focus:outline-none max-w-none editor-root',
      },
    },
  })

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col">
      <Toolbar editor={editor} />

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <EditorContent editor={editor} />
      </main>

      <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-md px-3 py-1 rounded-full text-xs text-gray-500 border z-50">
        A4 | 1" Margins
      </div>
    </div>
  )
}

export default App
