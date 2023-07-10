type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

export default function FormField({
  type = 'text',
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
      {((
        props = {
          type,
          placeholder,
          value: state,
          required: true,
          className: "form_field-input",
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setState(e.target.value),
        }
      ) => (isTextArea ? <textarea {...props} /> : <input {...props} />))()}
    </div>
  );
}
