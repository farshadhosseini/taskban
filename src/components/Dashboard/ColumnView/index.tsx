import { useRef, useState, useEffect } from "react";
import ColumnContainer from "./ColumnContainer";
import style from "./style.module.css";
import Button from "../../Common/Form/Button";
import Icon from "../../Common/Icon";
import TaskModal from "../TaskModal";
import React from "react";
import NewBoardModal from "./NewBoardModal";
import { DragDropContext } from "react-beautiful-dnd";
import { IProps, IData } from "../../../interfaces/board";
import { useDraggable } from "react-use-draggable-scroll";

const ColumnView: React.FC<IProps> = ({ data }): JSX.Element => {
  const [boardTaks, setBoardTaks] = useState<IData[]>(data);
  const [newBoardModal, setNewBoardModal] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(true);
  const [taskModal, setTaskModal] = useState<boolean>(false);

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    isMounted: mouseDown,
  });

  const handleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  const handleNewBoardModal = () => {
    setNewBoardModal(!newBoardModal);
  };

  const handleDragDrop = (results: any) => {
    const { source, destination } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const columnSourceIndex = boardTaks.findIndex((item) => {
      return item.name === source.droppableId;
    });
    const columnDestinationIndex = boardTaks.findIndex((item) => {
      return item.name === destination.droppableId;
    });
    const newSourceItems = [...boardTaks[columnSourceIndex].tasks];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...boardTaks[columnDestinationIndex].tasks]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, deletedItem);

    const newTaskColumns = [...boardTaks];
    newTaskColumns[columnSourceIndex] = {
      ...boardTaks[columnSourceIndex],
      tasks: newSourceItems,
    };
    newTaskColumns[columnDestinationIndex] = {
      ...boardTaks[columnDestinationIndex],
      tasks: newDestinationItems,
    };
    setBoardTaks(newTaskColumns);
  };

  useEffect(() => {
    setBoardTaks(data);
  }, [data]);

  return (
    <>
      <div
        ref={ref}
        {...events}
        className={`flex w-full px-S h-full items-start gap-6 overflow-x-auto pb-4
         ${style.scroll}`}
        style={{ direction: "rtl" }}
      >
        {
          <DragDropContext onDragEnd={handleDragDrop}>
            {boardTaks?.map((item) => {
              return (
                <ColumnContainer
                  key={item.id}
                  {...item}
                  setMouseDown={setMouseDown}
                />
              );
            })}
          </DragDropContext>
        }

        <button
          onClick={handleNewBoardModal}
          className="flex w-[250px] h-[44px] py-XS px-[12px] items-center rounded-2xl shrink-0 shadow-taskColumn text-base font-medium"
        >
          <Icon icon="plus" color="#1E1E1E" size={20} />
          ساختن برد جدید
        </button>
      </div>
      <Button
        text="تسک جدید"
        onClick={handleTaskModal}
        type="button"
        className="z-20 bg-brand-primary text-white w-[118px] text-sm  justify-center items-center rounded-md fixed bottom-[30px] py-XS px-3 gap-1 left-2XL font-extrabold"
        hasIcon={true}
        icon={{
          icon: "plus_square",
          color: "white",
          size: 24,
        }}
      />
      <TaskModal modal={taskModal} setModal={handleTaskModal} />
      <NewBoardModal modal={newBoardModal} setModal={handleNewBoardModal} />
    </>
  );
};

export default ColumnView;
