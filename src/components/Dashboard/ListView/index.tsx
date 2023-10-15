import { useEffect, useState } from "react";
import Icon from "../../Common/Icon";
import TaskList from "./TaskList";
import Button from "../../Common/Form/Button";
import TaskModal from "../TaskModal";
import { AXIOS } from "../../../config/axios.config";

const ListShow: React.FC = (): JSX.Element => {
  const [isShown, setIsShown] = useState<boolean>(true);
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [boardTaks, setBoardTaks] = useState<any>([]);
  useEffect(() => {
    fetch();
  }, []);
  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };
  const fetch = async () => {
    try {
      const response = await AXIOS.get("workspaces/92/projects/13/boards/");
      setBoardTaks(response.data);
      console.log(response.data);
    } catch (error) {}
  };
  return (
    <div style={{ direction: "rtl" }} className={` pr-S `}>
      <div className="flex items-center gap-XS my-L">
        <button className="h-6 inline" onClick={() => setIsShown(!isShown)}>
          <Icon icon="chevron_down_circle" size={24} />
        </button>
        <span className="text-black text-xl font-extrabold">پروژه اول</span>
      </div>
      <div
        className={`${
          !isShown ? "opacity-0 -z-10" : "opacity-100 z-10"
        } relative flex w-[1011px] flex-col items-end gap-XL mr-6 ml-12 h-[800px] transition-all duration-300 `}
      >
        {boardTaks && boardTaks.map((item) => {
          return <TaskList key={item.id} {...item} />;
        })}
        {/* <TaskList />
        <TaskList />
        <TaskList /> */}
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm flex-row-reverse justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      {taskModal && <TaskModal modal={taskModal} setModal={handleTaskModal} />}
    </div>
  );
};

export default ListShow;
