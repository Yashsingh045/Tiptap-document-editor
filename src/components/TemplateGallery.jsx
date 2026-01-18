import React from 'react'
import { Plus, FileText, Mail, ArrowLeft, MoreVertical, LayoutGrid } from 'lucide-react'
import clsx from 'clsx'

const TEMPLATES = [
    {
        id: 'blank',
        name: 'Blank document',
        subtitle: '',
        icon: <Plus size={48} className="text-emerald-500" />,
        bgColor: 'bg-white',
        content: `
            <div data-type="page" data-page-number="1">
                <h1>Untitled Document</h1>
                <p>Start typing your content here...</p>
            </div>
        `
    },
    {
        id: 'resume',
        name: 'Resume',
        subtitle: 'Professional',
        icon: <FileText size={48} className="text-blue-500" />,
        bgColor: 'bg-blue-50/30',
        content: `
            <div data-type="page" data-page-number="1">
                <h1 style="text-align: center">YOUR NAME</h1>
                <p style="text-align: center; font-size: 14px; color: #666">City, Country | phone | email | linkedin.com/in/name</p>
                <hr />
                <h3>Experience</h3>
                <p><strong>Senior Software Engineer</strong> | tech Corp | 2021 – Present</p>
                <ul>
                    <li>Led the development of a high-performance document editor.</li>
                    <li>Managed a team of 5 developers to deliver features on time.</li>
                </ul>
                <h3>Education</h3>
                <p><strong>Bachelor of Science in Computer Science</strong> | University of tech | 2017 – 2021</p>
                <h3>Skills</h3>
                <p>React, Tiptap, Tailwind CSS, Node.js, ProseMirror</p>
            </div>
        `
    },
    {
        id: 'letter',
        name: 'Letter',
        subtitle: 'Spearmint',
        icon: <Mail size={48} className="text-rose-500" />,
        bgColor: 'bg-rose-50/30',
        content: `
            <div data-type="page" data-page-number="1">
                <p>Your Name<br />Your Address<br />City, ZIP</p>
                <p style="margin-top: 40px">Date: ${new Date().toLocaleDateString()}</p>
                <p style="margin-top: 40px"><strong>Recipient Name</strong><br />Recipient Address<br />City, ZIP</p>
                <p style="margin-top: 40px">Dear [Recipient Name],</p>
                <p>This is a professional letter template. You can start typing your message here. The layout is optimized for A4 paper and follows industry standards for formal correspondence.</p>
                <p>Sincerely,</p>
                <p style="margin-top: 40px">[Your Name]</p>
            </div>
        `
    }
]

const TemplateGallery = ({ onSelect }) => {
    return (
        <div className="flex-1 flex flex-col bg-slate-50 overflow-auto">
            {/* Top Bar */}
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl">
                        <FileText className="text-primary" size={24} />
                    </div>
                    <h1 className="text-lg font-bold text-slate-900 tracking-tight">Docs Editor</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                        <LayoutGrid size={20} />
                    </button>
                    <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            {/* Gallery Section */}
            <section className="bg-slate-100/50 py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-base font-semibold text-slate-700 uppercase tracking-widest">Start a new document</h2>
                        {/* <button className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                            Template gallery
                            <MoreVertical size={14} className="rotate-90" />
                        </button> */}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {TEMPLATES.map((tpl) => (
                            <button
                                key={tpl.id}
                                onClick={() => onSelect(tpl.content)}
                                className="group flex flex-col items-start gap-3 transition-transform active:scale-95 text-left"
                            >
                                <div className={clsx(
                                    "w-full aspect-[1/1.41] rounded-lg border border-slate-200 shadow-sm transition-all duration-300 overflow-hidden relative",
                                    "group-hover:border-primary group-hover:ring-2 group-hover:ring-primary/20 bg-white",
                                    tpl.bgColor
                                )}>
                                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                        {tpl.icon}
                                    </div>
                                    {/* Subtle paper reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/30 pointer-events-none" />
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight truncate">
                                        {tpl.name}
                                    </div>
                                    {tpl.subtitle && (
                                        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                                            {tpl.subtitle}
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Documents Mockup */}
            <section className="flex-1 py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                        <h2 className="text-lg font-bold text-slate-800">Recent documents</h2>
                        {/* <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                            <span className="cursor-pointer hover:text-slate-800">Owned by anyone</span>
                            <span className="cursor-pointer hover:text-slate-800">Last opened by me</span>
                        </div> */}
                    </div>

                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                        <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                            <FileText size={40} className="text-slate-200" />
                        </div>
                        <p className="text-sm font-medium tracking-tight">No recent documents found</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TemplateGallery
