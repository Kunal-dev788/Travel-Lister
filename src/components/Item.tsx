import Button from "./Button";

type ItemType = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

// FormItem = Item without the id
type FormItem = Omit<ItemType, "id">;

interface ItemProps extends ItemType {
  setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
  setFormItem: React.Dispatch<React.SetStateAction<FormItem>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Item({
  id,
  description,
  quantity,
  packed,
  setItems,
  setFormItem,
  setSelectedId,
}: ItemProps) {
  const handleChecked = (id: number) => {
    setItems((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleEdit = (selectedId: number) => {
    const temp = selectedId === id;
    if (temp) {
      setSelectedId(id);
      setFormItem({ description, quantity, packed }); // only set form data
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => handleChecked(id)}
      />
      <span style={{ textDecoration: packed ? "line-through" : "none" }}>
        {quantity} {description}
      </span>
      <Button className="" onClick={() => handleEdit(id)}>
        ✏️
      </Button>
      <Button className="" onClick={() => handleRemove(id)}>
        ❌
      </Button>
    </li>
  );
}

export default Item;
