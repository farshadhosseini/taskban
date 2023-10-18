import { useRef, useState } from "react";
import Icon from "../Icon";

interface IIcon {
  icon: string;
  color?: string;
  size?: number;
}

interface IProps extends React.PropsWithChildren {
  className?: string;
  type: "button" | "icon";
  icon?: IIcon;
  buttonText?: string;
  hasIcon?: boolean;
}

const Dropdown: React.FC<IProps> = ({
  children,
  className,
  type,
  buttonText,
  hasIcon = true,
  icon,
}): JSX.Element => {
  const dropdown = useRef<any>();
  const dropdownList = useRef<any>();
  const [open, setOpen] = useState(false);
  const [listDirection, setListDirectiob] = useState({});

  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      // use setTimeout to make a delay showing dropdonw list to get it's heigth
      setTimeout(() => {
        const elementHeight =
          dropdown.current.offsetTop +
          dropdown.current.offsetHeight +
          dropdownList.current.offsetHeight;

        if (elementHeight > window.innerHeight) {
          setListDirectiob({
            bottom: type === "button" ? "2.20rem" : "1.5rem",
          });
        } else {
          setListDirectiob({ top: type === "button" ? "2.20rem" : "1.5rem" });
        }
      }, 0);
    }
  };

  const closeList = () => {
    setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  return (
    <div
      ref={dropdown}
      tabIndex={0}
      className="relative flex items-center"
      onClick={toggleOpen}
      onBlur={closeList}
    >
      {type === "button" ? (
        <button
          className={`border flex items-center justify-between border-solid border-lightgray_300 rounded-md relative text-right p-XS ${className}`}
          onClick={() => {}}
          name="dropdown"
          type="button"
        >
          {hasIcon && type === "button" && <Icon icon="chevron_down" />}
          {buttonText}
        </button>
      ) : (
        <Icon
          icon={icon?.icon}
          color={icon?.color}
          size={icon?.size}
          className="cursor-pointer"
        />
      )}
      {open && (
        <div
          ref={dropdownList}
          className={`${
            type === "icon" ? "min-w-[200px]" : "min-w-[240px]"
          } absolute w-full right-0 z-30 text-right p-2 rounded-lg shadow-md flex-col bg-white`}
          style={listDirection}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
