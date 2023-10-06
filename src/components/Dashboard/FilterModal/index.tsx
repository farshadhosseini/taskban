import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../../Common/Modal";
import uuid from "react-uuid";
import Select from "../../Common/Form/Select";
import Icon from "../../Common/Icon";

const portals = document.getElementById("portals") as Element;

const where = [
  { id: 1, title: "تاریخ" },
  { id: 2, title: "تگ" },
  { id: 3, title: "اعضا" },
  { id: 4, title: "اولویت" },
];
const tag = [
  { id: 1, title: "درس", color: "indigo_secondary" },
  { id: 2, title: "کار", color: "blue_secondary" },
  { id: 3, title: "پروژه", color: "indigo_secondary" },
];
const existance = [
  { id: 1, title: "است" },
  { id: 2, title: "نیست" },
];

interface IProps {
  modal: boolean;
  setModal: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const FilterModal: React.FC<IProps> = ({ modal, setModal }): JSX.Element => {
  const [filters, setFilters] = useState([
    {
      key: uuid(),
      where: 0,
      tag: 0,
      existance: false,
    },
  ]);

  const handleFilter = (e, key) => {
    const target = e.target.dataset;
    const currentFilter = filters.findIndex((x) => x.key === key);
    filters[currentFilter][target.name] = target.value;

    setFilters(filters);
  };

  const handleAddNewFilter = () => {
    if (filters.length === 4) {
      return false;
    }
    const newFilter = { key: uuid(), where: 0, tag: 0, existance: false };
    setFilters([...filters, newFilter]);
  };

  const handleRemoveFilter = (key) => {
    if (filters.length === 1) {
      return false;
    }
    const filtered = filters.filter((filter) => {
      return filter.key !== key;
    });
    setFilters(filtered);
  };

  const handleShowModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {createPortal(
        <Modal
          modal={modal}
          setModal={handleShowModal}
          hasCloseIcon={true}
          closeIcon={{ order: 1 }}
          hasHeader={true}
          backIcon={{ order: 2 }}
          hasBackIcon={false}
          header={{ order: 3, text: "فیلترها" }}
        >
          <div className="flex flex-col gap-S">
            {filters?.map((filter) => {
              return (
                <div
                  key={filter.key}
                  className="flex flex-row-reverse items-center gap-3"
                >
                  <span>تسک هایی که</span>
                  <Select
                    name="where"
                    onChange={(e) => handleFilter(e, filter.key)}
                    items={where}
                    className="w-[182px]"
                  />
                  <span>آن ها</span>
                  <Select
                    name="tag"
                    onChange={(e) => handleFilter(e, filter.key)}
                    items={tag}
                    className="w-[142px]"
                    searchPlaceholder="جستجو"
                  />
                  <Select
                    name="existance"
                    onChange={(e) => handleFilter(e, filter.key)}
                    items={existance}
                    className="w-[107px]"
                    hasSearch={false}
                  />
                  <span onClick={() => handleRemoveFilter(filter.key)}>
                    <Icon
                      icon="trash"
                      color="#FA5252"
                      className="cursor-pointer mr-2XL"
                    />
                  </span>
                </div>
              );
            })}
            <span
              onClick={handleAddNewFilter}
              className="text-brand-primary text-right  cursor-pointer mt-M font-bold"
            >
              افزودن فیلتر جدید
            </span>
          </div>
        </Modal>,
        portals
      )}
    </>
  );
};

export default FilterModal;