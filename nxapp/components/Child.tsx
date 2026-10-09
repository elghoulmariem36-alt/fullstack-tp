type ChildProps = {
  states: string[];
  onSelect: (state: string) => void;
};

export default function Child({ states, onSelect }: ChildProps) {
  return (
    <ul className="flex gap-2 p-4">
      {states.map((state) => (
        <li key={state}>
          <button
            className="rounded border px-3 py-1"
            onClick={() => onSelect(state)}
          >
            {state}
          </button>
        </li>
      ))}
    </ul>
  );
}