import Button from "./Button";

type Item = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

// FormItem = Item without the id
type FormItem = Omit<Item, "id">;

interface FormProps {
  formItem: FormItem;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setFormItem: React.Dispatch<React.SetStateAction<FormItem>>;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

function Form({
  setItems,
  formItem,
  setFormItem,
  selectedId,
  setSelectedId,
}: FormProps) {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetItem = () => {
    const newItem: Item = {
      id: Date.now(), // ✅ numeric ID
      description: formItem.description.trim(),
      quantity: Number(formItem.quantity),
      packed: false,
    };
    setItems((prev) => [...prev, newItem]);
    setFormItem({ description: "", quantity: 1, packed: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formItem.description.trim()) {
      alert("Fill the item description please");
      return;
    }

    if (selectedId) {
      // ✅ EDIT mode
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? {
                ...item,
                description: formItem.description,
                quantity: formItem.quantity,
                packed: formItem.packed,
              }
            : item
        )
      );
      setSelectedId(null); // clear after edit
      setFormItem({ description: "", quantity: 1, packed: false });
    } else {
      handleSetItem();
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        name="quantity"
        value={formItem.quantity}
        onChange={handleOnChange}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="description"
        placeholder="Item..."
        value={formItem.description}
        onChange={handleOnChange}
      />
      <Button>Add</Button>
    </form>
  );
}

export default Form;
