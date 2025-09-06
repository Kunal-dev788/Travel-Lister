import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
// ⬇️ Import shared types
import type { FormItem, Item } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

function App() {
  const [items, setItems] = useLocalStorage<Item[]>("packingItems", []);
  const [formItem, setFormItem] = useLocalStorage<FormItem>("formData",{
    description: "",
    quantity: 1,
    packed: false,
  });
  const [selectedId, setSelectedId] = useLocalStorage<number | null>("selectedId",null);

  return (
    <div className="app">
      <Logo />
      <Form
        setItems={setItems}
        formItem={formItem}
        setFormItem={setFormItem}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <PackingList
        items={items}
        setItems={setItems}
        setFormItem={setFormItem}
        setSelectedId={setSelectedId}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
