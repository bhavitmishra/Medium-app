interface props {
  title: string;
  placeholder: string;
  setVal: (value: string) => void;
}

export default function InputBox({ title, placeholder, setVal }: props) {
  return (
    <div className="flex">
      <div className="flex ">
        <div className="pr-5">{title}</div>
        <div className="flex">
          <input
            className="focus:outline-none border-blue-600 border-b-1"
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}
