// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Underline from '@tiptap/extension-underline'
// import Link from '@tiptap/extension-link'
// // import { 
// //   Bold, Italic, Underline as UnderlineIcon, 
// //   Strikethrough, Heading1, Heading2, Heading3, 
// //   List, ListOrdered, Quote, Code, 
// //   Undo, Redo, Link as LinkIcon 
// // } from 'lucide-react'
// import { 
//   Bold, Italic, Underline as UnderlineIcon, 
//   Strikethrough, 
//   Type as HeadingIcon,   // for headings (you can use Type icon)
//   List as ListIcon, 
//   ListOrdered as ListOrderedIcon,  // Actually Lucide uses "ListOrdered" icon name
//   Quote as QuoteIcon,    // Lucide has "Quote" icon
//   Code, 
//   Undo, Redo, Link as LinkIcon 
// } from 'lucide-react'
// import { useState } from 'react'

// export default function Editor() {
//   const editor = useEditor({
//     extensions: [StarterKit, Underline, Link],
//     content: '<p>Start writing your amazing content here...</p>',
//   })

//   const [url, setUrl] = useState('')
//   const [showLinkInput, setShowLinkInput] = useState(false)

//   if (!editor) {
//     return null
//   }

//   // Toolbar button helper
//   function Button({ onClick, active, children, title }) {
//     return (
//       <button
//         onClick={onClick}
//         title={title}
//         className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
//           active ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'
//         }`}
//         type="button"
//       >
//         {children}
//       </button>
//     )
//   }

//   // Apply link from input
//   function applyLink() {
//     if (url) {
//       editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
//     } else {
//       editor.chain().focus().extendMarkRange('link').unsetLink().run()
//     }
//     setShowLinkInput(false)
//     setUrl('')
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow-md border border-gray-300 dark:border-gray-700">
//       {/* Toolbar */}
//       <div className="flex flex-wrap gap-2 mb-4 select-none">
//         {/* Bold */}
//         <Button
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           active={editor.isActive('bold')}
//           title="Bold (Ctrl+B)"
//         >
//           <Bold size={18} />
//         </Button>

//         {/* Italic */}
//         <Button
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           active={editor.isActive('italic')}
//           title="Italic (Ctrl+I)"
//         >
//           <Italic size={18} />
//         </Button>

//         {/* Underline */}
//         <Button
//           onClick={() => editor.chain().focus().toggleUnderline().run()}
//           active={editor.isActive('underline')}
//           title="Underline (Ctrl+U)"
//         >
//           <UnderlineIcon size={18} />
//         </Button>

//         {/* Strike */}
//         <Button
//           onClick={() => editor.chain().focus().toggleStrike().run()}
//           active={editor.isActive('strike')}
//           title="Strike-through"
//         >
//           <Strikethrough size={18} />
//         </Button>

//         {/* Headings */}
//         <Button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//           active={editor.isActive('heading', { level: 1 })}
//           title="Heading 1"
//         >
//           <Heading1 size={18} />
//         </Button>

//         <Button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
//           active={editor.isActive('heading', { level: 2 })}
//           title="Heading 2"
//         >
//           <Heading2 size={18} />
//         </Button>

//         <Button
//           onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
//           active={editor.isActive('heading', { level: 3 })}
//           title="Heading 3"
//         >
//           <Heading3 size={18} />
//         </Button>

//         {/* Lists */}
//         <Button
//           onClick={() => editor.chain().focus().toggleBulletList().run()}
//           active={editor.isActive('bulletList')}
//           title="Bullet List"
//         >
//           <List size={18} />
//         </Button>

//         <Button
//           onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           active={editor.isActive('orderedList')}
//           title="Numbered List"
//         >
//           <ListOrdered size={18} />
//         </Button>

//         {/* Blockquote */}
//         <Button
//           onClick={() => editor.chain().focus().toggleBlockquote().run()}
//           active={editor.isActive('blockquote')}
//           title="Blockquote"
//         >
//           <Quote size={18} />
//         </Button>

//         {/* Code block */}
//         <Button
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//           active={editor.isActive('codeBlock')}
//           title="Code Block"
//         >
//           <Code size={18} />
//         </Button>

//         {/* Link */}
//         <Button
//           onClick={() => {
//             if (editor.isActive('link')) {
//               editor.chain().focus().unsetLink().run()
//             } else {
//               setShowLinkInput(true)
//             }
//           }}
//           active={editor.isActive('link')}
//           title="Insert Link"
//         >
//           <LinkIcon size={18} />
//         </Button>

//         {/* Undo */}
//         <Button
//           onClick={() => editor.chain().focus().undo().run()}
//           title="Undo (Ctrl+Z)"
//         >
//           <Undo size={18} />
//         </Button>

//         {/* Redo */}
//         <Button
//           onClick={() => editor.chain().focus().redo().run()}
//           title="Redo (Ctrl+Y)"
//         >
//           <Redo size={18} />
//         </Button>
//       </div>

//       {/* Link input */}
//       {showLinkInput && (
//         <div className="mb-4 flex gap-2">
//           <textarea
//             type="text"
//             value={url}
//             onChange={e => setUrl(e.target.value)}
//             className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
//             placeholder="Enter URL and press Apply"
//             onKeyDown={e => {
//               if (e.key === 'Enter') applyLink()
//               if (e.key === 'Escape') {
//                 setShowLinkInput(false)
//                 setUrl('')
//               }
//             }}
//           />
//           <button
//             onClick={applyLink}
//             className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//           >
//             Apply
//           </button>
//         </div>
//       )}

//       {/* Editor content */}
//       <EditorContent
//         editor={editor}
//         className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto focus:outline-none border border-gray-300 dark:border-gray-700 rounded p-4 min-h-[250px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//       />
//     </div>
//   )
// }


import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Quote as QuoteIcon,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
} from "lucide-react";

const Button = ({ onClick, active, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    type="button"
    style={{
      border: active ? "2px solid #4F46E5" : "1px solid #ccc",
      backgroundColor: active ? "#EEF2FF" : "white",
      marginRight: 4,
      padding: 6,
      cursor: "pointer",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
    }}
  >
    {children}
  </button>
);

export default function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        spellcheck: "false",
        style: `
          min-height: 150px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          font-size: 16px;
          line-height: 1.5;
          font-family: Arial, sans-serif;
          white-space: pre-wrap;
          word-break: break-word;
          overflow-wrap: break-word;
        `,
        placeholder: "Start typing here...",
      },
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL");

    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }} className="p-4 border shadow-md rounded-md">
      {/* Toolbar */}
      <div style={{ marginBottom: 12, display: "flex", flexWrap: "wrap", gap: 4 }}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </Button>

        {/* Headings */}
        {[1, 2, 3].map((level) => (
          <Button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive("heading", { level })}
            title={`Heading ${level}`}
          >
            <span style={{ fontWeight: "bold", fontSize: 14 - level * 2 }}>{`H${level}`}</span>
          </Button>
        ))}

        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <ListIcon size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrderedIcon size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <QuoteIcon size={16} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <Code size={16} />
        </Button>

        <Button onClick={() => editor.chain().focus().undo().run()} title="Undo">
          <Undo size={16} />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()} title="Redo">
          <Redo size={16} />
        </Button>

        <Button
          onClick={() => {
            if (editor.isActive("link")) {
              removeLink();
            } else {
              addLink();
            }
          }}
          active={editor.isActive("link")}
          title={editor.isActive("link") ? "Remove Link" : "Add Link"}
        >
          <LinkIcon size={16} />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
