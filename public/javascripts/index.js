const socket = io('http://'+window.location.hostname+':200');

function randomGD(){
  let colors = ['#e63946','#f77f00','#5e60ce','#fb5607','#8338ec','#0ead69','#bc00dd','#83e377','#3a0ca3','#ee4266','#ffd23f','#2a9134'];
  let length = colors.length
  let random = Math.floor(Math.random() * length);
  return colors[random]
}


function applyGD(div){
  let childs = $(`.${div}`);
  if(childs.length>0){
    for(i=0; i<=childs.length;i++){
      $(childs[i]).css({'background':
                      'linear-gradient(60deg,'+randomGD()+','+randomGD()+")"})
    }
  }
  
}


socket.emit('imConnected');

socket.on('send-blog',blog_list=>{
  //console.log('blogs------')
  //console.log(blog_list);
  blog_list.forEach((ele,index)=>{
    //console.log(ele);
    $('.container .scroll').append(`<form class="blog" action="blog" method="post" target='_blank' onclick='this.submit()'>
    <div class="blog-fg">
      <input style='display:none;' name='blogName' value='${ele.split('.')[0]}'>
      <h1>`+ele.split('.')[0]+`</h1> 
    </div>
  </form>`);
  })
  applyGD('blog-fg')
});

new Vue({
  el:".container",
  data:{slidesLeft:1,child_d_sec:($('.container .blogs-container .scroll').children().length/9)}
  ,
  methods:{
    scrollDown:function(){
      this.slidesLeft += 1
      let px = $('.container .blogs-container .scroll').height() / ($('.container .blogs-container .scroll').children().length/9)
      let bint = (this.getBottom() + px)+"px";
      
     $('.container .blogs-container .scroll').animate({
       bottom:bint
     },200)
    },
    scrollUp:function(){
      this.slidesLeft -= 1
      let px = $('.container .blogs-container .scroll').height() / ($('.container .blogs-container .scroll').children().length/9)
      let bint = (this.getBottom() - px)+"px";
      
     $('.container .blogs-container .scroll').animate({
       bottom: bint
     },200)
    },
    getBottom:function(){
      
      return parseInt($('.container .blogs-container .scroll').css('bottom'))
    }
  }
})

