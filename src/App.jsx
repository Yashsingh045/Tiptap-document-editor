import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Toolbar from './components/Toolbar'

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
    ],
    content: `
      <h1>Legal Document Template</h1>
      <p>This is a professional document editor with real-time pagination support.</p>
      <table>
        <tbody>
          <tr>
            <th>Party A</th>
            <th>Party B</th>
          </tr>
          <tr>
            <td>Signature: _________</td>
            <td>Signature: _________</td>
          </tr>
        </tbody>
      </table>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[1000px]',
      },
    },
  })

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Toolbar editor={editor} />

      <main className="flex-1 overflow-auto p-8 flex justify-center">
        {/* A4 Page Container */}
        <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[25.4mm] relative transition-all duration-300 ease-in-out">
          {/* Page Background/Margins could be visualized here */}
          <div className="absolute top-0 left-0 w-full h-full border border-gray-100 pointer-events-none" />

          <EditorContent editor={editor} />
        </div>
      </main>

      <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur shadow-md px-3 py-1 rounded-full text-xs text-gray-500 border">
        A4 | 1" Margins
      </div>
    </div>
  )
}

export default App
