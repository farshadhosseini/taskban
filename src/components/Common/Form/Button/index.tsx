import Icon from "../../Icon/";
interface IIcon {
  icon: string;
  color?: string;
  size?: number;
  className?: string;
  style?: {};
}

interface IProps {
  name?: string,
  text?: string;
  type: "submit" | "button" | "reset";
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  hasIcon?: boolean;
  className?: string;
  icon?: IIcon;
  autoFocus?: boolean,
  loading?: boolean,
}

const Button: React.FC<IProps> = ({
  name,
  type,
  text,
  hasIcon,
  className,
  icon,
  autoFocus = false,
  onClick,
  loading = false,
}): JSX.Element => {
  return (
    <button
      disabled={loading}
      autoFocus={autoFocus}
      name={name}
      onClick={(e) => onClick(e)}
      type={type}
      className={`flex items-center justify-center ${className} ${loading ? 'cursor-wait' : ''}`}
    >
      {loading ? <span dir="rtl">لطفا منتظر بمانید ...</span> : text}
      {hasIcon && (
        <Icon
          icon={icon?.icon}
          color={icon?.color}
          size={icon?.size}
          style={icon?.style}
          className={icon?.className}
        />
      )}
    </button>
  );
};

export default Button;
