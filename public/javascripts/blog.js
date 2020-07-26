const socket = io('http://'+window.location.hostname+':100');
socket.emit('send-name',$('.title')[0].innerHTML)

var ci = Vue.component('cell-item', {
  data: function () {
    return {
      input: true,
      titletext: "",
      
      textbox: true,
      text: "foo"
      
    }
  },
  methods: {
    change2textbox: function (event) {
      this.textbox = true;
    },
    change2blog: function (event) {
      this.textbox = false;
      this.text = event.target.value;
      
    },
    change2title:function(event){
      this.input = false;
      this.titletext = event.target.value;
    },
    change2input: function(event){
      this.input = true;
    }

  },
  
  template: 
  `
<div class='cell animate__animated animate__fadeInDown' :id=cellid :json-data='this.data'>
    <div class="cell-title">
        
      <input v-on:keyup.enter="change2title"   value='' placeholder="Write a Title" v-if="input"></input>
      <h1 v-on:click='change2input' v-else>{{titletext}}</h1>
      
      
    </div>

    <div class="cell-blog">
            <textarea placeholder="Write Something"  v-on:keyup.shift.13="change2blog" v-if="textbox">
            </textarea>
            <div class="cell-paragraph" v-on:click="change2textbox" v-else>
              {{text}}
            </div>
          </div>
  <button v-on:click="$emit(\'add\')">Add</button>
  <button v-on:click="$emit(\'remove\')">Remove</button>
</div>
  `,
  props: ['title','cellid','json']
})

var cnt =new Vue({
  el: '.container',
  data: {
    cells: [
      
    ]
  },
  watch:{
    cells:()=>{
      let send_list = []
      this.cnt.$children.forEach((child)=>{
        send_list.push(child.$data)
      })
      
      socket.emit('save-change',[$('.title')[0].innerHTML,send_list])
    }
  }
  ,
  methods:{
    addCell:function(index){
        console.log(index)
        }
  },
  mounted(){
   socket.on('send-cells',(json)=>{
     json = JSON.parse(json);
     console.log('cells '+json);
   }) ;
  }

})



$(window).on('beforeunload', function(){
  socket.close();
});