const { v4: uuidv4 } = require('uuid');

let items = Array.from({ length: 23 }, (_, i) => ({
  id: uuidv4(),
  textInput: `Contoh teks ${i + 1}`,
  passwordInput: `password${100 + i}`,
  emailInput: `user${i + 1}@email.com`,
  numberInput: 40 + i,
  telInput: `+6281234567${(100 + i).toString().slice(-3)}`,
  urlInput: `https://example${i + 1}.com`,
  searchInput: `pencarian-${i + 1}`,
  radioInput: `option${(i % 3) + 1}`,
  checkboxInput: [
    `option${((i + 1) % 3) + 1}`,
    `option${((i + 2) % 3) + 1}`,
  ],
  selectInput: `option${(i % 3) + 1}`,
  multiSelectInput: [
    `option${(i % 3) + 1}`,
    `option${((i + 1) % 3) + 1}`,
  ],
  dateInput: `2023-11-${(i % 28 + 1).toString().padStart(2, "0")}`,
  timeInput: `${(8 + (i % 10)).toString().padStart(2, "0")}:${(i % 60)
    .toString()
    .padStart(2, "0")}`,
  datetimeInput: `2023-11-${(i % 28 + 1)
    .toString()
    .padStart(2, "0")}T${(8 + (i % 10))
    .toString()
    .padStart(2, "0")}:${(i % 60).toString().padStart(2, "0")}`,
  monthInput: `2023-${((i % 12) + 1).toString().padStart(2, "0")}`,
  weekInput: `2023-W${((i % 52) + 1).toString().padStart(2, "0")}`,
  rangeInput: 50 + (i % 50),
  colorInput: `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`,
  fileInput: `dokumen_${i + 1}.pdf`,
  textareaInput: `Ini adalah contoh teks panjang dalam textarea ke-${i + 1}.`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

class Item {
  static getAll() {
    return items;
  }

  static getById(id) {
    return items.find(item => item.id === id);
  }

  static create(data) {
    const newItem = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    items.push(newItem);
    return newItem;
  }

  static update(id, data) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return items[index];
    }
    return null;
  }

  static delete(id) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      const deletedItem = items[index];
      items.splice(index, 1);
      return deletedItem;
    }
    return null;
  }
}

module.exports = Item;
