(function(b){var a={init:function(c){var d=this;d.settings=b.extend({image:!0,callback:function(){}},c);a.data=b(this);a.settings={image:!0};a.loader=b(".micropopup-loader");a.container=b(".micropopup-container");a.overlay=b(".micropopup-overlay");0==a.overlay.length&&b("body").append('<div class="micropopup-overlay" />');0==a.container.length&&b("body").append('<div class="micropopup-container"><div class="inner"></div><div class="controls"></div><div class="close"></div></div>');0==a.loader.length&&
b("body").append('<div class="micropopup-loader" />');d.settings.image?a.sliding():a.data.click(function(){var c=this.href;b.get(c,function(b){a.settings.image=!1;a.open(b,c);"function (){}"!=d.settings.callback&&d.settings.callback()});return!1})},open:function(c,d){var e=b.Deferred();a.openLoader();a.container.find(".inner").html(c);a.container.attr("style","");var f=function(){e.done(function(){a.position()}).done(function(){a.closeLoader();a.overlay.show();a.container.fadeIn(200)})};a.settings.image?
(a.container.find(".inner").removeClass("html"),a.container.find(".controls").show(),a.slidingBind(),b(c).load(function(){f()})):(a.container.find(".inner").addClass("html"),a.container.find(".controls").hide(),f());a.overlay.click(function(){a.close()});a.container.find(".close").click(function(){a.close()});a.container.find("form").attr("action",d);e.resolve()},close:function(){a.overlay.hide();a.container.find("* *").fadeOut(200,function(){a.container.hide();b(this).remove()})},position:function(){a.container.setPosition=
function(){a.settings.image&&(a.container.height(b(window).height()-80),a.container.find("img.resp").css({height:a.container.height()}));var c=b(window).width()-a.container.width(),d=b(window).height()-a.container.height(),c=c/2+b(window).scrollLeft(),d=d/2+b(window).scrollTop();a.container.css({top:Math.max(d,0),left:Math.max(c,0),width:a.container.width(),height:a.container.height()})};a.container.setPosition()},sliding:function(){a.data.each(function(a,d){b(d).attr("data-index",a)});a.data.click(function(){a.slidingAction(b(this));
return!1})},slidingBind:function(){var c=!this.settings.prev||0==this.settings.prev.length?"":'<a href="'+this.settings.prev.attr("href")+'" class="prev" data-index="'+this.settings.prev.attr("data-index")+'"></a>',d=!this.settings.next||0==this.settings.next.length?"":'<a href="'+this.settings.next.attr("href")+'" class="next" data-index="'+this.settings.next.attr("data-index")+'"></a>';a.container.find(".controls").html(c+d);a.container.find(".controls a").click(function(){a.slidingAction(b(this));
return!1})},slidingAction:function(c){this.settings.first=a.data.first().attr("data-index");this.settings.last=a.data.last().attr("data-index");this.settings.prev=b("[data-index="+(parseInt(c.attr("data-index"))-1)+"]");this.settings.next=b("[data-index="+(parseInt(c.attr("data-index"))+1)+"]");c.attr("data-index")==this.settings.first&&(this.settings.prev=!1);c.attr("data-index")==this.settings.last&&(this.settings.next=!1);a.settings.image=!0;image=new Image;image.src=c.attr("href");b(image).attr("class",
"resp");a.open(image,c.attr("href"))},openLoader:function(){a.loader.show()},closeLoader:function(){a.loader.hide()}};b.fn.microPopup=function(c){if(a[c])return a[c].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof c||!c)return a.init.apply(this,arguments);b.error("Method "+c+" not found in jQuery.microPopup")}})(jQuery);