import React, { useState, useEffect } from 'react'
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
                    <h1 style="margin-bottom: 2px; font-size: 24px;">Untitled Document</h1>
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
                    <h1 style="text-align: center; margin-bottom: 2px; font-size: 24px; font-weight: bold; color: #1a1a1a;">JONATHAN DOE</h1>
                    <p style="text-align: center; font-size: 10px; color: #555; margin-bottom: 16px;">
                        San Francisco, CA • (555) 123-4567 • j.doe@email.com • linkedin.com/in/jdoe • github.com/jdoe
                    </p>
                    
                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase;">Professional Summary</h2>
                    <p style="font-size: 11px; line-height: 1.4; color: #333; margin-bottom: 12px;">
                        Innovative Senior Software Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud architecture. Proven track record of leading teams, optimizing performance, and delivering high-quality software solutions in fast-paced environments. Passionate about open-source contribution and technical mentorship.
                    </p>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase;">Experience</h2>
                    
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                            <strong style="font-size: 12px; color: #1a1a1a;">Senior Software Engineer</strong>
                            <span style="font-size: 10px; color: #666;">2021 – Present</span>
                        </div>
                        <div style="font-size: 10px; color: #444; font-style: italic; margin-bottom: 4px;">Tech Global Corp, San Francisco, CA</div>
                        <div style="font-size: 11px; line-height: 1.4; color: #333; margin-left: 16px;">
                            Architected a real-time collaborative document editor using Tiptap and Y.js, supporting 50+ concurrent users per document.
                            <br/>Led a team of 6 engineers in migrating legacy infrastructure to AWS, reducing server costs by 30% and improving uptime to 99.99%.
                            <br/>Implemented a CI/CD pipeline using GitHub Actions and Docker, cutting deployment time from 1 hour to 10 minutes.
                            <br/>Mentored junior developers, conducting code reviews and organizing weekly technical workshops.
                        </div>
                    </div>

                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                            <strong style="font-size: 12px; color: #1a1a1a;">Software Engineer II</strong>
                            <span style="font-size: 10px; color: #666;">2018 – 2021</span>
                        </div>
                        <div style="font-size: 10px; color: #444; font-style: italic; margin-bottom: 4px;">InnovateSoft Inc, Austin, TX</div>
                        <div style="font-size: 11px; line-height: 1.4; color: #333; margin-left: 16px;">
                            Developed responsive UI components using React and Tailwind CSS for a SaaS dashboard used by 10,000+ customers.
                            <br/>Optimized database queries in PostgreSQL, achieving 50% faster API response times for critical endpoints.
                            <br/>Integrated Stripe API for subscription payments, handling over $1M in annual recurring revenue.
                            <br/>Collaborated with UX designers to implement a dark mode, increasing user engagement by 15%.
                        </div>
                    </div>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase;">Projects</h2>
                    
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                            <strong style="font-size: 12px; color: #1a1a1a;">Open Source Design System</strong>
                            <span style="font-size: 10px; color: #666;">2023</span>
                        </div>
                        <p style="font-size: 11px; line-height: 1.4; color: #333;">
                            Created a comprehensive React component library focusing on accessibility and performance. 
                            Used by 500+ developers. 
                            <a href="#" style="color: #2563eb; text-decoration: none;">github.com/jdoe/design-system</a>
                        </p>
                    </div>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase;">Skills</h2>
                    <p style="font-size: 11px; line-height: 1.6; color: #333; margin-bottom: 12px;">
                        <strong>Languages:</strong> JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3<br/>
                        <strong>Frontend:</strong> React, Next.js, Vue.js, Tailwind CSS, Redux, Webpack<br/>
                        <strong>Backend:</strong> Node.js, Express, Django, PostgreSQL, MongoDB, Redis<br/>
                        <strong>DevOps & Tools:</strong> Docker, Kubernetes, AWS (EC2, S3, Lambda), Git, Jenkins
                    </p>

                    <h2 style="font-size: 12px; font-weight: bold; color: #2563eb; border-bottom: 1px solid #2563eb; padding-bottom: 2px; margin-bottom: 8px; text-transform: uppercase;">Education</h2>
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
                        <strong style="font-size: 12px; color: #1a1a1a;">B.S. in Computer Science</strong>
                        <span style="font-size: 10px; color: #666;">2014 – 2018</span>
                    </div>
                    <div style="font-size: 10px; color: #444;">University of California, Berkeley</div>
                    <p style="font-size: 11px; color: #555; margin-top: 2px;">Graduated with Honors, GPA 3.8/4.0</p>
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
                    <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 25px;">
                        <div style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 4px;">JONATHAN DOE</div>
                         <div style="font-size: 11px; color: #555;">
                            123 Business Way, San Francisco, CA 94105 &bull; j.doe@email.com &bull; (555) 123-4567
                        </div>
                    </div>

                    <div style="font-size: 11px; color: #444; margin-bottom: 20px;">
                        ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>

                    <div style="font-size: 12px; color: #222; margin-bottom: 20px; line-height: 1.5;">
                        <strong>Hiring Manager</strong><br />
                        Tech Global Corp<br />
                        456 Innovation Blvd<br />
                        Seattle, WA 98101
                    </div>
                    
                    <div style="font-size: 12px; font-weight: bold; color: #222; margin-bottom: 15px;">
                        Re: Application for Senior Software Engineer Position
                    </div>

                    <div style="font-size: 11px; line-height: 1.8; color: #333; margin-bottom: 30px;">
                        <p style="margin-bottom: 12px;">Dear Hiring Manager,</p>
                        
                        <p style="margin-bottom: 12px;">I am writing to express my strong interest in the Senior Software Engineer position at Tech Global Corp. With over 8 years of experience in full-stack development and a proven track record of delivering high-quality software solutions, I am confident that I can make a significant contribution to your team.</p>
                        
                        <p style="margin-bottom: 12px;">In my current role at Tech Global Corp, I have led several critical projects, including the development of a real-time collaborative document editor. I am particularly impressed by Tech Global Corp's commitment to innovation and its focus on creating user-centric products. My experience in React, Node.js, and cloud architecture aligns perfectly with the requirements of this role.</p>
                        
                        <p style="margin-bottom: 12px;">Beyond my technical skills, I am a proactive problem solver and a dedicated team player. I thrive in collaborative environments where I can mentor junior developers and contribute to the collective growth of the engineering team. I am eager to bring my expertise to Tech Global Corp and help drive the success of your upcoming projects.</p>
                        
                        <p style="margin-bottom: 12px;">Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and experience align with the needs of your team. Please find my resume attached for your review.</p>
                        
                        <p>Sincerely,</p>
                        
                    </div>
                    
                    
                </div>
            </div>
        `
    }
]

const TemplateGallery = ({ onSelect, onLoad }) => {
    const [recentDocs, setRecentDocs] = useState([])

    useEffect(() => {
        try {
            const docs = JSON.parse(localStorage.getItem('tiptap-recent-docs') || '[]')
            setRecentDocs(docs)
        } catch (e) {
            console.error('Failed to load recent docs', e)
        }
    }, [])

    const handleDelete = (e, docId) => {
        e.stopPropagation()
        if (window.confirm('Are you sure you want to delete this document?')) {
            const updatedDocs = recentDocs.filter(d => d.id !== docId)
            setRecentDocs(updatedDocs)
            localStorage.setItem('tiptap-recent-docs', JSON.stringify(updatedDocs))
        }
    }

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
                    {/* <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                        <LayoutGrid size={20} />
                    </button> */}
                    {/* <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
                        <MoreVertical size={20} />
                    </button> */}
                </div>
            </header>

            {/* Gallery Section */}
            <section className="bg-slate-100/50 py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-base font-semibold text-slate-700 uppercase tracking-widest">Start a new document</h2>
                        <button className="text-sm font-medium text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                            Template gallery
                            {/* <MoreVertical size={14} className="rotate-90" /> */}
                        </button>
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

            {/* Recent Documents Section */}
            <section className="flex-1 py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                        <h2 className="text-lg font-bold text-slate-800">Recent documents</h2>
                    </div>

                    {recentDocs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4">
                            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                <FileText size={40} className="text-slate-200" />
                            </div>
                            <p className="text-sm font-medium tracking-tight">No recent documents found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {recentDocs.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => onLoad && onLoad(doc)}
                                    className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer relative"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        {/* Delete Button */}
                                        <button
                                            onClick={(e) => handleDelete(e, doc.id)}
                                            className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-slate-800 mb-1 truncate pr-2">{doc.title || 'Untitled Document'}</h3>
                                    <p className="text-xs text-slate-500 mb-4 line-clamp-2 h-8 leading-relaxed">
                                        {doc.preview || 'No preview available'}
                                    </p>
                                    <div className="text-[10px] text-slate-400 font-medium border-t border-slate-100 pt-3">
                                        Last edited {new Date(doc.lastModified).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

export default TemplateGallery
