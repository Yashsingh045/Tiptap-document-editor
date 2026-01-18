# Tiptap Document Editor

A powerful, Google Docs-like document editor built with modern web technologies. This project features print-layout pagination, real-time height calculation, and a clean, Notion-style interface.

## About The Project

This application is a sophisticated rich text editor designed to bridge the gap between web-based editing and print-ready documents. Unlike standard WYSIWYG editors that treat content as a continuous stream, this editor implements a **page-based layout system**.

It allows users to create, edit, and format documents that are guaranteed to look the same on screen as they do on paper. The intuitive interface includes a template gallery, recent document history (persisted locally), and a suite of formatting tools.

### Key Features

*   **📄 Print-Layout Pagination**: Real-time content splitting across A4 pages.
*   **🎨 Template Gallery**: Pre-built templates for Resumes, Cover Letters, and more.
*   **💾 Local Persistence**: Auto-saves documents to your browser's local storage.
*   **✨ Rich Text Formatting**: Headings, lists, tables, and typography styles.
*   **⚡ Modern Tech Stack**: Built with React, Tiptap, and Tailwind CSS.

## Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   Node.js (v18.0.0 or higher recommended)
*   npm (v9.0.0 or higher)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Yashsingh045/Tiptap-document-editor.git
    cd Tiptap-document-editor
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Technical Implementation: Pagination

One of the most complex features of this editor is the client-side pagination logic.

### Approach to Calculating Page Breaks
*   **Node View Architecture**: We utilize Tiptap's Node View system to render each `page` as a distinct React component (`PageView.jsx`).
*   **Real-time Observation**: A `ResizeObserver` monitors the content height of every page.
*   **Overflow Detection**: When content exceeds the A4 printable height (approx 980px with margins), an overflow flag is triggered.
*   **Content Splitting**: The editor programmatically splits the content at the cursor or last valid position, moving the overflow to a new page node.

### Trade-offs & Limitations
*   **Browser Rendering**: Reliance on `scrollHeight` means minor pixel differences may occur across browsers.
*   **Node Splitting**: Complex nodes like large tables are currently pushed to the next page rather than split mid-row to preserve data integrity.

### Future Improvements
*   **Virtualization**: To support documents with hundreds of pages, implementing list virtualization for the page nodes is a planned optimization.
*   **Server-Side Generation**: Integrating a headless browser for pixel-perfect PDF export.


<hr/>