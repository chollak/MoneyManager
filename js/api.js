const posts=[
    {title:"My YC app: Dropbox - Throw away your USB drive", shortDescription:"Something about post title like description"},
    {title:"How many angels and VCs do you personally know? How many other startup founders do you regularly meet with there in Denver?", shortDescription:"Something about post title like description"},
    {title:"My YC app: Dropbox - Throw away your USB drive", shortDescription:"Something about post title like description"},
    {title:"My YC app: Dropbox - Throw away your USB drive", shortDescription:"Something about post title like description"},
  
  ];
  new Vue({
    el: '#app',
    data() {
      return {
        info: null,
        loading: true,
        errored: false
      };
    },
    filters: {
      currencydecimal(value) {
        return value.toFixed(2);
      }
    },
    mounted() {
      axios
        .get('https://api.telegra.ph/getPage/Dva-studenta-rabotayut-nad-vpechatlyayushchim-fehntezijnym-ehkshenom-Arena-of-Ares-pro-duehli-boevyh-magov-10-27?return_content=true')
        .then(response => {
          this.info = response.data.result.content;        
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  });
  // {
  //   "by" : "dhouston",
  // "descendants" : 71,
  // "id" : 8863,
  // "kids" : [ 9224, 8917, 8952, 8884, 8887, 8869, 8958, 8940, 8908, 9005, 8873, 9671, 9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876 ],
  // "score" : 104,
  // "time" : 1175714200,
  // "title" : "My YC app: Dropbox - Throw away your USB drive",
  // "type" : "story",
  // "url" : "http://www.getdropbox.com/u/2/screencast.html",
  // },
  // {
  //   "by" : "paul",
  //   "id" : 4321,
  //   "kids" : [ 4343 ],
  //   "parent" : 4307,
  //   "text" : "How many angels and VCs do you personally know? How many other startup founders do you regularly meet with there in Denver?<p>People who already have a lot of startup connections and experience probably don't need YC, but I don't get the impression that you are one of those people.",
  //   "time" : 1173937531,
  //   "type" : "comment"
  // },