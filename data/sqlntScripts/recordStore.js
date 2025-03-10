class Item {
  constructor(recordStore, description, state, id) {

  }
  read() {
    let data = this.recordStore.read(this.id); //
    this.id = id;
    this.description = description;
    this.state = state;
    this.recordStore = recordStore;
  }
}

// return {
//   create: (id) => {},
//   read: function(item){},
//   update: (id) => {},
//   delete: item()
// }

function RecordStoreInterface() {
  return {
    create,
    read,
    update,
    purge
  }
}

function create (id){throw Error("Not implemented")}
function update (item){throw Error("Not implemented")}
function read (item){throw Error("Not implemented")}
function purge(item){throw Error("Not implemented")}

class ItemRecordStore extends RecordStoreInterface {
  create (id, decsription, state) {
    const test = "insert into TodoList(id, description, state) values ($1, $2, $3)";
  }
}