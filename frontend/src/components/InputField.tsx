export default function InputField({
  labelText,
  placeholder,
  onChange,
}: {
  labelText: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="mt-3 w-72">
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {labelText}
      </label>
      <input
        onChange={(e) => onChange(e)}
        type="text"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
