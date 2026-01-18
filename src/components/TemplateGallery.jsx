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
                <div class="page-content">
                    <h1>Untitled Document</h1>
                    <p>Start typing your content here...</p>
                </div>
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
                <div class="page-content">
                    <h1 style="text-align: center; margin-bottom: 2px; font-size: 20px; font-weight: bold; color: #1a1a1a;">JONATHAN DOE</h1>
                    <p style="text-align: center; font-size: 10px; color: #555; margin-bottom: 8px;">
                        San Francisco, CA • (555) 123-4567 • j.doe@email.com • linkedin.com/in/jdoe
                    </p>
                    
                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 1px; margin-bottom: 4px; text-transform: uppercase;">Professional Summary</h2>
                    <p style="font-size: 11px; line-height: 1.2; color: #333; margin-bottom: 8px;">
                        Innovative Senior Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture.
                    </p>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 1px; margin-bottom: 4px; text-transform: uppercase;">Experience</h2>
                    
                    <div style="margin-bottom: 4px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                            <strong style="font-size: 11px; color: #1a1a1a;">Senior Software Engineer</strong>
                            <span style="font-size: 10px; color: #666;">2021 – Present</span>
                        </div>
                        <div style="font-size: 10px; color: #444; font-style: italic; margin-bottom: 2px;">Tech Global Corp, San Francisco, CA</div>
                        <ul style="font-size: 11px; line-height: 1.2; color: #333; margin-left: 12px;">
                            <li style="margin-bottom: 1px;">Architected a collaborative document editor using Tiptap and Y.js.</li>
                            <li style="margin-bottom: 1px;">Led team of 6 engineers in migrating infrastructure to AWS.</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 4px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                            <strong style="font-size: 11px; color: #1a1a1a;">Software Engineer II</strong>
                            <span style="font-size: 10px; color: #666;">2018 – 2021</span>
                        </div>
                        <div style="font-size: 10px; color: #444; font-style: italic; margin-bottom: 2px;">InnovateSoft Inc, Austin, TX</div>
                        <ul style="font-size: 11px; line-height: 1.2; color: #333; margin-left: 12px;">
                            <li style="margin-bottom: 1px;">Developed responsive UI components using React and Tailwind CSS.</li>
                            <li style="margin-bottom: 1px;">Optimized queries in PostgreSQL, achieving 50% faster API response.</li>
                        </ul>
                    </div>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 1px; margin-bottom: 4px; text-transform: uppercase;">Skills</h2>
                    <p style="font-size: 11px; line-height: 1.2; color: #333; margin-bottom: 8px;">
                        <strong>Languages:</strong> JavaScript, TypeScript, SQL • <strong>Frontend:</strong> React, Next.js, Tailwind<br/>
                        <strong>Backend:</strong> Node.js, Express, PostgreSQL • <strong>Tools:</strong> Docker, AWS
                    </p>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 1px; margin-bottom: 4px; text-transform: uppercase;">Education</h2>
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
                        <strong style="font-size: 11px; color: #1a1a1a;">B.S. in Computer Science</strong>
                        <span style="font-size: 10px; color: #666;">2014 – 2018</span>
                    </div>
                    <div style="font-size: 10px; color: #444;">University of California, Berkeley</div>
                </div>
            </div>
        `
    },
    {
        id: 'letter',
        name: 'Letter',
        subtitle: 'Formal',
        icon: <Mail size={48} className="text-rose-500" />,
        bgColor: 'bg-rose-50/30',
        content: `
            <div data-type="page" data-page-number="1">
                <div class="page-content">
                    <div style="text-align: right; font-size: 14px; color: #444; margin-bottom: 40px;">
                        <p><strong>Jonathan Doe</strong><br />
                        123 Business Way<br />
                        San Francisco, CA 94105<br />
                        j.doe@email.com<br />
                        (555) 123-4567</p>
                    </div>

                    <div style="font-size: 14px; color: #444; margin-bottom: 40px;">
                        <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>

                    <div style="font-size: 14px; color: #444; margin-bottom: 40px;">
                        <p><strong>Hiring Manager</strong><br />
                        Tech Global Corp<br />
                        456 Innovation Blvd<br />
                        Seattle, WA 98101</p>
                    </div>

                    <div style="font-size: 14px; line-height: 1.6; color: #1a1a1a; margin-bottom: 30px;">
                        <p>Dear Hiring Manager,</p>
                        
                        <p>I am writing to express my strong interest in the Senior Software Engineer position at Tech Global Corp. With over 8 years of experience in full-stack development and a proven track record of delivering high-quality software solutions, I am confident that I can make a significant contribution to your team.</p>
                        
                        <p>In my current role at Tech Global Corp, I have led several critical projects, including the development of a real-time collaborative document editor. I am particularly impressed by Tech Global Corp's commitment to innovation and its focus on creating user-centric products.</p>
                        
                        <p>I am eager to bring my expertise in React, Node.js, and cloud architecture to Tech Global Corp. Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and experience align with the needs of your team.</p>
                        
                        <p>Sincerely,</p>
                        
                        <p style="margin-top: 40px;"><strong>Jonathan Doe</strong></p>
                    </div>
                </div>
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
