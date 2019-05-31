Vue.component("m-header", {
  props: ["nav"],
  template: `
      <li>
        <a href="#nav.url">nav.value</a>
      </li>
  `,
})
var app = new Vue({
  el: "#app",
  data: {
    items: [],
    newItem: [
      { name: "", cost: null, date: null, fulltime: null },
    ],
    tt: new Date().toLocaleDateString() + " - " + new Date().toLocaleTimeString(),
    sortNameActive: 0,
    sortCostActive: 0,
    sortTimeActive: 0,
    settings: {
      page: "",
      property: null,
      fullname: "",
    },
    selectedMonth:new Date().toString(),
  },
  mounted() {
    if (localStorage.getItem('n-items')) {
      try {
        this.items = JSON.parse(localStorage.getItem('n-items'));
      } catch (e) {
        localStorage.removeItem('n-items');
      }
    }
    if (localStorage.getItem('n-settings')) {
      try {
        this.settings = JSON.parse(localStorage.getItem('n-settings'));
      } catch (e) {
        localStorage.removeItem('n-settings');
      }

    }
  },
  methods: {
    sort: function (type) {
      if (type == 'name') {
        this.sortNameActive = 1;
        this.sortCostActive = 0;
        this.sortTimeActive = 0;
        this.items.sort(function (a, b) {
          if (a.name > b.name) return 1;
          else return -1;
        });
      } else if (type == "cost") {
        this.sortNameActive = 0;
        this.sortCostActive = 1;
        this.sortTimeActive = 0;
        app.items.sort(function (a, b) {
          return a.cost - b.cost;
        });
      } else if (type == "time") {
        this.sortNameActive = 0;
        this.sortCostActive = 0;
        this.sortTimeActive = 1;
        app.items.sort(function (a, b) {
          if (a.date > b.date) return 1;
          else return -1;
        });
      }
    },
    addNewItem: function () {
      if (!this.newItem.name && !this.newItem.cost) {
        return;
      }
      var nt = new Date().toLocaleDateString() + " at <cite>" + new Date().toLocaleTimeString() + "</cite>";
      var now = new Date();
      this.items.push({
        name: this.newItem.name,
        cost: this.newItem.cost,
        date: nt,
        fulltime: now,
      });

      this.newItem.name = "";
      this.newItem.cost = "";
      this.saveItems();
    },
    removeItem: function (x) {
      this.items.splice(x, 1);
      this.saveItems();
    },
    saveItems() {
      const parsed = JSON.stringify(this.items);
      localStorage.setItem("n-items", parsed);
    },
    getWeekNumber: function (x) {
      return new Date(x).getMonth();
    },
    changeView: function (x) {
      this.settings.page = x;
      const parsed = JSON.stringify(this.settings);
      localStorage.setItem("n-settings", parsed);
    },
    saveSettings:function(){
      const parsed = JSON.stringify(this.settings);
      localStorage.setItem("n-settings", parsed);
    },
  },
  computed: {
    getSum: function () {
      var sum = 0;
      for (var i = 0; i < this.items.length; i++) {
        sum += parseInt(this.items[i].cost);
      }
      return sum;
    },
    getYearMonth:function(){
      var tmp = new Date();
      return tmp.getFullYear()+"-0"+(tmp.getMonth()+1);
    },

  },

});

//new Date().getFullYear
var json = [
  {
    "name": "user1",
    "id": 3
  },
  {
    "name": "user2",
    "id": 6
  },
  {
    "name": "user3",
    "id": 1
  }
];
console.log(json);
console.log("---------------------------------");
app.items.sort(function (a, b) {
  if (a.date > b.date) return 1;
  else return -1;
});
console.log(app.items);
console.log("---------------------------------");