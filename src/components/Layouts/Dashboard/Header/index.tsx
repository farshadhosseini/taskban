import { Link, useLocation } from "react-router-dom";
import Input from "../../../Common/Form/Input";
import Icon from "../../../Common/Icon";
import { useState } from "react";
import Navigator from "../../../Dashboard/CalenderView/Navigator";
import FilterModal from "../../../Dashboard/FilterModal";
import ShareModal from "../../../Dashboard/ShareModal";
import { useSelector } from "react-redux";

interface IProps {
  title?: string;
}
const Header: React.FC<IProps> = ({ title }): JSX.Element => {
  const { pathname } = useLocation();
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [shareModal, setShareModal] = useState<boolean>(false);
  const { workspace_name } = useSelector((store: any) => store.workspaceId);
  const handleFilterModal = () => {
    setFilterModal(!filterModal);
  };

  const handleShareModal = () => {
    setShareModal(!shareModal);
  };

  return (
    <div className="mt-XL mr-S">
      <div className="flex flex-between flex-row-reverse border-b-2 border-lightgray_300 py-S gap-S">
        <div className="flex divide-x divide-lightgray_300 font-bold">
          <Link
            className={`px-S flex justify-center text-base items-center  ${
              pathname === "/calender" ? "text-brand-primary" : ""
            }`}
            to="/calender"
          >
            تقویم
            <Icon
              icon="calender_full"
              color={`${pathname === "/calender" ? "#208d8e" : "#323232"}`}
            />
          </Link>
          <Link
            className={`px-S flex justify-center text-base items-center ${
              pathname === "/board" ? "text-brand-primary" : ""
            }`}
            to="/board"
          >
            نمایش ستونی
            <Icon
              icon="grid"
              color={`${pathname === "/board" ? "#208d8e" : "#323232"}`}
            />
          </Link>
          <Link
            className={`px-S flex justify-center text-base items-center ${
              pathname === "/list" ? "text-brand-primary" : ""
            }`}
            to="/list"
          >
            نمایش لیستی
            <Icon
              icon="list"
              color={`${pathname === "/list" ? "#208d8e" : "#323232"}`}
            />
          </Link>
          <span className="font-bold pl-S justify-end text-xl">
            {workspace_name}
          </span>
        </div>
        <button
          onClick={handleShareModal}
          className="mr-auto font-bold flex justify-center text-base items-center"
        >
          اشتراک گذاری
          <Icon icon="share" />
        </button>
      </div>
      <div className="border-b-2 border-lightgray_300 py-S mb-S flex divide-x justify-end items-center divide-lightgray_300">
        {pathname === "/calender" ? (
          <div className="px-S">
            <Navigator />
          </div>
        ) : (
          <div className="flex">
            <p className="text-xs bg-blue_secondary p-1 px-S text-blue_primary">
              دسته بندی شده با : وضعیت
            </p>
            <button
              onClick={handleFilterModal}
              className="px-S flex justify-center items-center text-xs"
            >
              فیلترها
              <Icon icon="filter" />
            </button>
          </div>
        )}
        <Input
          className="pr-L border-none w-[200px] bg-white text-xs"
          placeholder="جستجو بین تسک‌ها"
          name="search"
          id="task_search"
          type="text"
          hasLabel={false}
          hasIcon={true}
          icon={{
            icon: "search",
          }}
          onChange={(name, value) => {
            console.log(name, value);
          }}
        />
      </div>
      {/*----------------------------------------------- Sharing & Filter Modal --------------------------------------------- */}
      {shareModal && (
        <ShareModal modal={shareModal} setModal={handleShareModal} />
      )}
      {filterModal && (
        <FilterModal modal={filterModal} setModal={handleFilterModal} />
      )}
    </div>
  );
};

export default Header;
