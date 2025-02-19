export function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 border border-gray-500 rounded-lg"
      >
        {children}
      </button>
    );
  }
  