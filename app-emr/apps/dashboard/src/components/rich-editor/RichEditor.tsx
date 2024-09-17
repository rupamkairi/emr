import * as React from "react";

import { cn } from "@/lib/utils";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

const content = "";

export interface RichEditorProps
  extends React.TextareaHTMLAttributes<HTMLDivElement> {}

const RichEditor = React.forwardRef<HTMLDivElement, RichEditorProps>(
  ({ className, ...props }, ref) => {
    const editor = useEditor({
      extensions,
      content,
    });

    return (
      <>
        {/* <EditorProvider extensions={extensions} content={content}> */}
        <EditorContent
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "emr-rich-editor",
            className
          )}
          ref={ref}
          editor={editor}
        />
        {/* <FloatingMenu editor={null}>This is the floating menu</FloatingMenu> */}
        <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
        {/* </EditorProvider> */}
      </>
    );
  }
);

export default RichEditor;
