import React, { MutableRefObject, useRef, useState } from "react";
import Quill, { Delta, Op } from "quill/core";
import "quill/dist/quill.snow.css";
import { Hint } from "./hint";
import { Button } from "./ui/button";
import { Smile } from "lucide-react";
import { PiTextAa } from "react-icons/pi";
import { EmojiPopover } from "./emoji-popover";

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

const Editor = ({
  onCancel,
  onSubmit,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) => {
  const [text, setText] = useState("");
  const placeholderRef = useRef(placeholder);

  const quillRef = useRef<Quill | null>(null);

  const onEmojiSelect = (emojiValue: string) => {
    const quill = quillRef.current;
  };
  return (
    <div className="flex flex-col">
      <input className="hidden" />
      <div className="flex flex-col overflow-hidden transition bg-white border rounded-md border-slate-200 focus-within:border-slate-300 focus-within:shadow-sm">
        <div></div>
        <div className="">
          <Hint label="Hide formatting">
            <Button size="iconSm" variant="ghost">
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <EmojiPopover onEmojiSelect={onEmojiSelect}>
            <Button size="iconSm" variant="ghost">
              <Smile className="size-4" />
            </Button>
          </EmojiPopover>
        </div>
      </div>
    </div>
  );
};

export default Editor;
