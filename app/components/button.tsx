

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'green' | 'white' | 'toggle';
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'green',
  className = '',
  onClick,
  active = false
}: ButtonProps) => {
  const baseStyle = "font-bold text-lg transition-all duration-200";
  
  const variants = {
    green: "bg-(--green-color) text-white hover:bg-white hover:text-(--green-color) border-2 border-(--green-color) rounded-full py-2 px-6",
    white: "bg-white border border-white text-(--green-color) hover:bg-(--green-color) hover:text-white rounded-full py-2 px-6",
    toggle: `rounded-full py-3 px-8 text-lg shadow-sm flex gap-2 items-center ${active ? 'bg-(--green-color) text-white' : 'bg-white text-(--green-color) hover:bg-gray-50'}`
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;