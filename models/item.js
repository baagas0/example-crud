const { v4: uuidv4 } = require('uuid');

let items = [
  {
    id: uuidv4(),
    textInput: "Contoh teks",
    passwordInput: "password123",
    emailInput: "contoh@email.com",
    numberInput: 42,
    telInput: "+628123456789",
    urlInput: "https://example.com",
    searchInput: "pencarian",
    radioInput: "option2",
    checkboxInput: ["option1", "option3"],
    selectInput: "option2",
    multiSelectInput: ["option1", "option3"],
    dateInput: "2023-11-15",
    timeInput: "14:30",
    datetimeInput: "2023-11-15T14:30",
    monthInput: "2023-11",
    weekInput: "2023-W46",
    rangeInput: 75,
    colorInput: "#ff5733",
    fileInput: "contoh.pdf",
    textareaInput: "Ini adalah contoh teks panjang dalam textarea.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
