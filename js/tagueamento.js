// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-12345-6', 'auto');

ga('send', 'pageview');


var contato_link = document.getElementsByClassName("menu-lista-contato");

var download_link = document.getElementsByClassName("menu-lista-download");

var analise_link = document.getElementsByClassName("card-montadoras");

//imaginando teremos apenas um form por pagina
var form = document.getElementsByTagName("form");

//imaginando o reuso do codigo para mais links com a mesma classe
for(var item of contato_link){
  item.addEventListener('click', function(event){
    ga('send', {
      hitType: 'event',
      eventCategory: 'menu',
      eventAction: 'entre_em_contato',
      eventLabel: 'link_externo'
    });
  });
}

for(var item of download_link){
  item.addEventListener('click', function(event){
    ga('send', {
      hitType: 'event',
      eventCategory: 'menu',
      eventAction: 'download_pdf',
      eventLabel: 'download_pdf'
    });
  });
}

for(var item of analise_link){
  item.addEventListener('click', function(event){

    ga('send', {
      hitType: 'event',
      eventCategory: 'analise',
      eventAction: 'ver_mais',
      eventLabel: $(this).data("name")
    });
  });
}


  var form_fields = form[0].getElementsByTagName("input");

  for(var item of form_fields){
    item.addEventListener('focusout', function(event, item){
      if(this.value.trim() !== ""){
        ga('send', {
          hitType: 'event',
          eventCategory: 'contato',
          eventAction: this.id,
          eventLabel: 'preencheu'
        });
      }
    });
  }

//observer para a mudanca de class do body
var body_tag = document.body;
const config = { attributes: true}
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
       if (mutation.type === 'attributes') {
         var class_array = mutation.target.className.split(" ") ;
         const found = class_array.includes('lightbox-open');
            if(found == true){
              ga('send', {
                hitType: 'event',
                eventCategory: 'contato',
                eventAction: 'enviado',
                eventLabel: 'enviado'
              });

            }

        }
    }
};
const watcher = new MutationObserver(callback);
watcher.observe(body_tag, config);
