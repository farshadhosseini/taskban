import Checkmark from "./Checkmark";
import Tag from "../../../../Dashboard/Tag";
import { useState } from "react";
import More from "./More";
import Icon from "../../../../Common/Icon";
import ProjectModal from "../../../ProjectModal";

interface ITaskCardProps {
  img: string;
  title: string;
}
const TaskCard: React.FC<ITaskCardProps> = ({ img, title }): JSX.Element => {
  const [isShown, setIsShown] = useState<boolean>(false);

  return (
    <article
      className="flex w-[249px] p-S flex-col items-end gap-S rounded-2xl bg-white shadow-taskCard"
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {img && (
        <img
          src={img}
          alt="task-img"
          className={`h-[134px] self-stretch rounded-[4px] bg-lightgray  bg-cover bg-no-repeat`}
        />
      )}
      <section className="flex flex-col items-end gap-[9px] self-stretch">
        <span className="text-[#534D60] text-xs  font-normal">
          اسم لیست
        </span>
        <div className="flex justify-end items-center gap-1 self-stretch">
          <Icon icon="paragraph" size={14} color="#BDC0C6" />
          <span className="text-[#0E0E0E] text-xs  font-normal">
            {title}
          </span>
        </div>
      </section>
      <section className="flex items-start gap-XS">
        <Checkmark />
        <div className="flex justify-end items-center gap-0.5">
          <span className="text-[#343434] text-xs  font-normal">
            ۵ مهر - فردا
          </span>
          <Icon icon="flag" size={14} color="#FA5252" />
        </div>
      </section>
      <section className="flex items-start gap-XS">
        <Tag color="grape" text="پروژه" />
        <Tag color="blue" text="درس" />
      </section>
      <More isShown={isShown} />
    </article>
  );
};
export default TaskCard;
