import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Toolbar from './components/Toolbar'
import Page from './extensions/Page'
import DocumentSettings from './components/DocumentSettings'

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
        <h1>Legal Document Template</h1>
        <p>This is a professional document editor with real-time pagination support. You can type here, and if the content overflows the page, you can insert a page break manually using the toolbar.</p>
        <p><strong>To test pagination:</strong> Add a lot of text or use the "Insert Page Break" button (scissors icon).</p>
        <table>
          <tbody>
            <tr>
              <th>Provision</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>Confidentiality</td>
              <td>All terms are strictly confidential.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-slate focus:outline-none max-w-none editor-root',
      },
    },
  })

  return (
    <div className="min-h-screen bg-slate-200 flex flex-col antialiased">
      <Toolbar editor={editor} />

      <main className="flex-1 overflow-auto p-4 md:p-8 flex justify-center pb-24">
        <EditorContent editor={editor} />
      </main>

      <DocumentSettings editor={editor} />

      <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-md px-3 py-1 rounded-full text-xs text-gray-500 border z-50 select-none">
        A4 | 1" Margins | <span className="text-primary font-medium">Draft</span>
      </div>
    </div>
  )
}

export default App
