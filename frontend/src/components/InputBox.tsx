import { useState } from "react";

interface Props {
  title: string;
  placeholder: string;
  setVal: (value: string) => void;
  type: string;
}

export default function InputBox({
  title,
  placeholder,
  setVal,
  type = "text",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-semibold">{title}</label>
      <div className="relative flex items-center w-full">
        <input
          className="focus:outline-none border-b border-blue-600 pr-16 w-full py-1"
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          onChange={(e) => setVal(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-xs text-blue-600 font-medium"
          >
            {showPassword ? "Hide" : "View"}
          </button>
        )}
      </div>
    </div>
  );
}
