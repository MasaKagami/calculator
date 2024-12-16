type ButtonProps = {
    label: string;
    onClick: () => void;
    className?: string; // Additional classes for styling
  };
  
  function Button({ label, onClick, className = "" }: ButtonProps) {
    return (
        <button
            className={`flex rounded-md border-none transition-transform transform active:scale-95 active:bg-gray-400 ${className}`}
            style={{ height: "inherit" }} // Ensure height inherits from parent
            onClick={onClick}
        >
            {label}
      </button>
    );
  }
  
  export default Button;
  