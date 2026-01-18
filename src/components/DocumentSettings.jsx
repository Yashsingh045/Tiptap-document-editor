import React, { useState } from 'react'
import { Settings, X, Check } from 'lucide-react'

const DocumentSettings = ({ editor }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [header, setHeader] = useState('Untitled Document')
    const [footer, setFooter] = useState('Page Footer')

    const applySettings = () => {
        if (!editor) return

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
                className="fixed bottom-6 left-6 bg-white/90 backdrop-blur shadow-xl p-3.5 rounded-2xl hover:bg-white hover:scale-110 transition-all z-50 border border-slate-200 group no-print"
                title="Document Settings"
            >
                <Settings size={22} className="text-slate-600 group-hover:rotate-90 transition-transform duration-500" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 scale-in-center">
                        <div className="flex justify-between items-center p-5 border-b border-slate-50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Document Setup</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Configure headers and footers</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700">Page Header</label>
                                <input
                                    type="text"
                                    value={header}
                                    onChange={(e) => setHeader(e.target.value)}
                                    placeholder="Enter header text..."
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-slate-300 bg-slate-50/50"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700">Page Footer</label>
                                <input
                                    type="text"
                                    value={footer}
                                    onChange={(e) => setFooter(e.target.value)}
                                    placeholder="Enter footer text..."
                                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all placeholder:text-slate-300 bg-slate-50/50"
                                />
                            </div>
                        </div>

                        <div className="bg-slate-50/80 p-5 flex justify-end gap-3 border-t border-slate-100">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200/50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={applySettings}
                                className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                            >
                                <Check size={18} />
                                Update Document
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DocumentSettings
