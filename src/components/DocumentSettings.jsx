import React, { useState } from 'react'
import { Settings, X, Check } from 'lucide-react'

const DocumentSettings = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [header, setHeader] = useState('Draft Document')
    const [footer, setFooter] = useState('LegalBridge Document Editor')

    const applySettings = () => {
        if (!editor) return

        // Apply to all page nodes
        editor.commands.command(({ tr, state }) => {
            state.doc.descendants((node, pos) => {
                if (node.type.name === 'page') {
                    tr.setNodeMarkup(pos, null, {
                        ...node.attrs,
                        header,
                        footer,
                    })
                }
            })
            return true
        })
        setIsOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 left-4 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 transition-all z-50 border border-gray-200"
                title="Document Settings"
            >
                <Settings size={20} className="text-gray-600" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-bold">Document Settings</h2>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Document Header</label>
                                <input
                                    type="text"
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Document Footer</label>
                                <input
                                    type="text"
                                    value={footer}
                                    onChange={(e) => setFooter(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={applySettings}
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center gap-2"
                            >
                                <Check size={18} />
                                Apply Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DocumentSettings
