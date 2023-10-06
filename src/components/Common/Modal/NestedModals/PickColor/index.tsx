
import { Dispatch, SetStateAction, useState, useRef } from "react";

import Modal from "../..";
import ColorPicker from "../../../ColorPicker";
import Button from "../../../Form/Button";
import ReviewInfo from "../ReviewInfo";

interface IProps {
  isPickColorOpen: boolean;
  setIsPickColorOpen: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  workSpaceInfo: { name?: string; colorName?: string; colorCode?: string };
  setWorkSpaceInfo: Dispatch<
    SetStateAction<{ name?: string; colorName?: string; colorCode?: string }>
  >;
}

const PickColor: React.FC<IProps> = ({
  isPickColorOpen,
  setIsPickColorOpen,
  setIsModalOpen,
  workSpaceInfo,
  setWorkSpaceInfo,
}): JSX.Element => {

  const [selected, setSelected] = useState<string | undefined>(
    workSpaceInfo?.colorCode
  );
  const ref = useRef<HTMLDivElement>(null);

  const [isReviewInfoOpen, setIsReviewInfoOpen] = useState(false);

  const handleBackClick = () => {
    setIsModalOpen(true);
    setIsPickColorOpen(false);
  };

  const handlePickolorClick = () => {
    setIsReviewInfoOpen(true);
    setIsPickColorOpen(false);
  };

  const handleDisableClick = () => {
    if (ref.current) ref.current.style.backgroundColor = "#7D828C";
    setWorkSpaceInfo({
      ...workSpaceInfo,
      colorCode: "disabled",
      colorName: "disabled",
    });
    setSelected("disabled");
  };

  const handleReset = () => {
    setWorkSpaceInfo({
      ...workSpaceInfo,
      name: "",
      colorCode: "",
      colorName: "",
    });
    setSelected("disable");
  };

  return (
    <>
      <Modal
        modal={isPickColorOpen}
        setModal={setIsPickColorOpen}
        hasHeader={true}
        header={{ text: "انتخاب رنگ ورک‌اسپیس", order: 2 }}
        hasBackIcon={true}
        backIcon={{ order: 1, handleBack: handleBackClick }}
        hasCloseIcon={true}
        closeIcon={{
          order: 3,
          resetInputValue: handleReset,
        }}
      >
        <div className="flex flex-col gap-XL w-[500px] pt-0 items-end">
          <div className="flex gap-S">
            <div className="flex flex-col items-end gap-S">
              <span className="text-sm text-black">رنگ ورک‌اسپیس</span>
              <div className="flex w-[293px] flex-row-reverse gap-[8px] flex-wrap items-center">
                <ColorPicker
                  onClick={(data) =>
                    setWorkSpaceInfo({
                      ...workSpaceInfo,
                      colorName: data.name,
                      colorCode: data.code,
                    })
                  }

                  hasDisableIcon={true}
                  handleDisableClick={handleDisableClick}
                  selected={workSpaceInfo.colorCode}
                />
              </div>
            </div>
            <div

              ref={ref}
              className="flex text-center w-[80px] h-[80px] p-[10px] mb-[20px] justify-center items-center rounded-[8px] bg-[#7D828C] text-white text-2xl font-extrabold"
              style={{ backgroundColor: workSpaceInfo.colorCode }}

            >
              {workSpaceInfo.name
                ? workSpaceInfo.name.split(" ").map((item, index) => {
                    let accOfWorkSpaceName: string = "";
                    if (Number(index) === 0 || 1)
                      accOfWorkSpaceName += item.charAt(0).toUpperCase() + " ";
                    return accOfWorkSpaceName;
                  })
                : ""}
            </div>
          </div>

          <Button
            text="ادامه"
            type="button"
            onClick={handlePickolorClick}
            className="flex h-XL rounded-md bg-brand-primary text-white w-full"
          />

        </div>
      </Modal>
      <ReviewInfo
        isReviewInfoOpen={isReviewInfoOpen}
        setIsReviewInfoOpen={setIsReviewInfoOpen}
        workSpaceInfo={workSpaceInfo}
        setIsPickColorOpen={setIsPickColorOpen}
        setWorkSpaceInfo={setWorkSpaceInfo}
        setSelected={setSelected}
      />
    </>
  );
};

export default PickColor;