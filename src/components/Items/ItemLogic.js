import firebase from "../firebase";

let bought = [];
let transactions = null;

const handleItemClick = item => {
  bought.push(item);
};

const handleNewItem = state => {
  if (state.name && !isNaN(state.price) && !isNaN(state.amount)) {
    let item = { name: state.name, price: state.price, category: "熟食" };
    for (let index = 0; index < state.amount; index++) {
      bought.push(item);
    }
  }
};

const getTransaction = pic => {
  let time = new Date().toJSON();
  let total = 0;
  let reduced = {};
  bought.forEach(element => {
    total += element.price;
    reduced[element.category] = !isNaN(reduced[element.category])
      ? reduced[element.category] + element.price
      : element.price;
  });

  return {
    total: total,
    amounts: reduced,
    bought: bought,
    time: time,
    pic: pic
  };
};

const clearTransaction = () => {
  bought = [];
  transactions = null;
};

const commitTransaction = transactions => {
  if (transactions.total > 0)
    firebase
      .ref("Transaction")
      .child(transactions.time.substr(0, 10))
      .push(transactions);
  clearTransaction();
};

export {
  handleItemClick,
  handleNewItem,
  getTransaction,
  clearTransaction,
  commitTransaction,
  transactions
};
