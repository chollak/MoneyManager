var app = new Vue({
  el: "#app",
  data: {
    items: [],
    newItem: { name: "", cost: null, date: null, fulltime: null },
    sortNameActive: 0,
    sortCostActive: 0,
    sortTimeActive: 0,
    settings: {
      page: "",
      property: null,
      fullname: "",
    },
    selectedMonth: "",
    selectM: "",
    monthSum: 0,
    editStatus: false,
    editedItem: 0,
    isReversed: 1,
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
  created() {
    var tmp = new Date();
    this.selectM = tmp.getFullYear() + "-";
    if ((tmp.getMonth() + 1) < 10) {
      this.selectM += "0" + (tmp.getMonth() + 1);
    } else {
      this.selectM += (tmp.getMonth() + 1);
    }
  },
  watch: {
    selectM: function (newq, oldq) {
      this.selectedMonth = newq;
    }
  },
  methods: {
    sort: function (type, rev) {
      if (type == 'name') {
        this.sortNameActive = 1;
        this.sortCostActive = 0;
        this.sortTimeActive = 0;
        this.items.sort(function (a, b) {
          if (a.name > b.name) return 1;
          else return -1;
        });
        if (rev == 2) {
          this.items.reverse();
          this.isReversed = 0;
        }
      } else if (type == "cost") {
        this.sortNameActive = 0;
        this.sortCostActive = 1;
        this.sortTimeActive = 0;
        this.items.sort(function (a, b) {
          return a.cost - b.cost;
        });
        if (rev == 2) {
          this.items.reverse();
          this.isReversed = 0;
        }
      } else if (type == "time") {
        this.sortNameActive = 0;
        this.sortCostActive = 0;
        this.sortTimeActive = 1;
        this.items.sort(function (a, b) {
          var ta = new Date(a.fulltime);
          var tb = new Date(b.fulltime);
          // console.log(a.name +" "+b.name);
          // console.log(ta.getTime() +" "+tb.getTime());
          return ta.getTime() - tb.getTime();
        });
        if (rev == 2) {
          this.items.reverse();
          this.isReversed = 0;
        }
      }
      this.isReversed++;
      console.log(this.isReversed);
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
    editItem: function (x) {
      // this.newItem.name=this.items[x].name;
      // this.newItem.cost=this.items[x].cost;
      this.editStatus = true;
      this.editedItem = x;

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
    saveSettings: function () {
      const parsed = JSON.stringify(this.settings);
      localStorage.setItem("n-settings", parsed);
    },
    isVal: function (x) {
      var ta = new Date(x.fulltime);
      var tb = new Date(this.selectedMonth);
      return (ta.getMonth() == tb.getMonth() && ta.getFullYear() == tb.getFullYear());
    },
    deleteAll: function () {
      localStorage.removeItem('n-items');
      localStorage.removeItem('n-settings');
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
    getSumByMonth: function () {
      var sum = 0;
      var tb = new Date(this.selectedMonth);
      for (key in this.items) {
        var ta = new Date(this.items[key].fulltime);
        if (ta.getMonth() == tb.getMonth() && ta.getFullYear() == tb.getFullYear()) {
          sum += parseInt(this.items[key].cost);
        }
      }
      return sum;
    },
  },

});
