# Tiptap Document Editor with Real-time Pagination

A professional, print-ready document editor built with React, Tiptap, and Tailwind CSS. Designed specifically for legal professionals to visualize A4 page boundaries and formatting in real-time.

## Features

- **Real-time Visual Pagination**: Content is rendered within A4 containers (210mm x 297mm) with standard 1-inch (25.4mm) margins.
- **Dynamic Headers & Footers**: Custom headers and footers that update globally across all pages.
- **Automatic Page Numbering**: Sequential page numbering handled by a custom Tiptap extension.
- **Professional Formatting**: Support for Headings (H1, H2), Bold, Italic, Tables, and Lists.
- **Manual Page Breaks**: Insert page breaks using `Cmd/Ctrl + Enter` or the toolbar button.
- **Print Fidelity**: Print-optimized CSS ensuring that the browser print output matches the editor visualization perfectly.
- **Premium UI**: Glassmorphic toolbar, custom scrollbars, and margin visualization guides on hover.

## Technical Approach

### Strategy: Structural Pagination
The application uses a custom Tiptap `Page` node extension. Instead of a single continuous document, the document is structured as a series of `page` nodes. 

1. **Measurement**: Each page node uses a React NodeView with a `ResizeObserver` to monitor content height.
2. **Splitting**: Users can manually split pages, or use the automatic synchronization logic to maintain sequential page numbering.
3. **Reflow**: The system uses a view-based update loop to ensure that page metadata (like numbers) stay in sync with the document structure.

### Trade-offs & Limitations
- **Block-level Splitting**: Currently, the editor splits content at the block level (between paragraphs/tables). Splitting a single paragraph across two physical containers in a block-based editor like Tiptap is a known complexity; the current approach prioritizes document stability and undo/redo reliability.
- **Performance**: While `ResizeObserver` is efficient, extremely large documents (>50 pages) may require further optimization of the NodeView rendering.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Tiptap-document-editor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Development History
This project was built iteratively with a focus on granular commits and structural integrity and features over 25 commits documenting the evolution of the pagination system.
