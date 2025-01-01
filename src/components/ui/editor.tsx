/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { RangeStatic } from "quill";

interface QuillRichEditorProps {
  initialValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  maxLength?: any;
}

interface QuillRichEditorState {
  text: string;
}

class QuillRichEditor extends Component<
  QuillRichEditorProps,
  QuillRichEditorState
> {
  quillRef: ReactQuill | null;

  constructor(props: QuillRichEditorProps) {
    super(props);

    this.state = {
      text: props.initialValue || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);

    this.modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
          ["code-block"],
        ],
        handlers: {
          image: this.imageHandler,
        },
      },
    };

    this.formats = [
      "header",
      "font",
      "size",
      "color",
      "background",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "clean",
      "code-block",
    ];

    this.quillRef = null;
  }

  componentDidUpdate(prevProps: QuillRichEditorProps) {
    if (
      prevProps.initialValue !== this.props.initialValue &&
      this.props.initialValue
    ) {
      this.setState({ text: this.props.initialValue });
    }
  }

  handleChange(value: string) {
    const wordCount = this.countWords(value);

    if (wordCount <= this.props.maxLength) {
      this.setState({ text: value }, () => {
        this.props.onChange(value);
      });
    } else {
      const trimmedText = this.trimToMaxWords(value, this.props.maxLength);
      this.setState({ text: trimmedText }, () => {
        this.props.onChange(trimmedText);
      });
    }
  }

  countWords(value: string): number {
    return value
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
  }

  trimToMaxWords(value: string, maxWords: number): string {
    const words = value
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/);
    return words.slice(0, maxWords).join(" ");
  }

  imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file && file.size <= 10 * 1024 * 1024) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = this.quillRef?.getEditor();
          const range = quill?.getSelection(true);
          if (range && quill) {
            const url = reader.result as string;
            quill.insertEmbed(range.index, "image", url);
            const newRange: RangeStatic = {
              index: range.index + 1,
              length: 0,
            };
            quill.setSelection(newRange);
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert(
          "Please upload an image with a size less than or equal to 10 MB."
        );
      }
    };
  }

  render() {
    return (
      <div className="quill_rich_editor__wrapper">
        <ReactQuill
          ref={(el) => {
            this.quillRef = el;
          }}
          value={this.state.text}
          modules={this.modules}
          formats={this.formats}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }

  modules: {
    toolbar: {
      container: unknown[];
      handlers: { image: () => void };
    };
  };

  formats: string[];
}

export default QuillRichEditor;
