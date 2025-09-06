import { useState } from "react";
import Item from "./Item";
import Selection from "./Selection";
import Button from "./Button";
import type { Item as ItemType, FormItem } from "../types";  // alias Item to avoid clash

interface PackingListProps {
  items: ItemType[];
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setFormItem: React.Dispatch<React.SetStateAction<FormItem>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

function PackingList({
  items,
  setItems,
  setFormItem,
  setSelectedId,
}: PackingListProps) {
  const [sortOrder, setSortOrder] = useState("Sort by input order");

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  let sortedItems = items;

  if (sortOrder === "Sort by description") {
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortOrder === "Sort by packed status") {
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  const handleClearList = () => {
    setItems([]);
  };

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            {...item}
            setItems={setItems}
            setFormItem={setFormItem}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>
      <div className="actions">
        <Selection
          value={sortOrder}
          options={[
            "Sort by input order",
            "Sort by description",
            "Sort by packed status",
          ]}
          onChange={handleSort}
        />
        <Button className="" onClick={() => handleClearList()}>
          Clear list
        </Button>
      </div>
    </div>
  );
}

export default PackingList;
