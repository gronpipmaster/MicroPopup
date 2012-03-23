(function( $ ){
	var methods = {
		init : function ( options ){
			var popup = this
			
			popup.settings = $.extend({
				image: true,
				callback: function (){},
				debug: false
			}, options )
			if( popup.settings.debug )
				console.log( 'Start trace:' )
				
			methods.data = $( this )
			methods.settings  = popup.settings
			
			
			
			if( $( '.micropopup-overlay' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-overlay" />' )
				
			if( $( '.micropopup-container' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-container"><div class="inner"></div><div class="controls"></div><div class="close"></div></div>' )
				
			if( $( '.micropopup-loader' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-loader" />' )
			
			methods.overlay = $( '.micropopup-overlay' )
			methods.container = $( '.micropopup-container' )
			methods.loader = $( '.micropopup-loader' )
			
			
			if( ! popup.settings.image ){
				methods.data.click( function(){
					var url = this.href
					
					$.get( url, function( data ){
							methods.settings.image = false
							methods.open( data, url )
							if( popup.settings.callback != 'function (){}' ) popup.settings.callback()
					})
					
					return false
				})
			} else {
				methods.sliding()
			}
		},
		open : function ( content, url ){
			var dfd = $.Deferred()
			methods.openLoader()
			
			methods.container.find( '.inner' ).html( content )
			methods.container.attr('style', '')
			
			var showActions = function(){
				dfd.done(function(){
					methods.position()
				}).done(function(){
					methods.closeLoader()
					methods.overlay.show()
					methods.container.fadeIn(200)
					methods.debug( 'container show' )
				})
			}
			
			if( methods.settings.image ) {
				methods.container.find( '.inner' ).removeClass('html')
				methods.container.find( '.controls' ).show()
				methods.slidingBind()
				$( content ).load(function(){
					showActions()
				})
				
			} else {
				methods.container.find( '.inner' ).addClass('html')
				methods.container.find( '.controls' ).hide()
				showActions()
			}
			
			methods.overlay.click( function(){
				methods.close()
			})
			
			methods.container.find( '.close' ).click( function(){
				methods.close()
			})
			
			methods.container.find( 'form' ).attr( 'action', url )
			
			dfd.resolve()
			methods.debug( 'open popup' )
		},
		close : function (){
			methods.overlay.hide()
			methods.container.find( '* *' ).fadeOut( 200, function(){
				methods.container.hide()
				$( this ).remove()
			})
			methods.debug( 'close popup' )
		},
		position : function (){
			methods.container.setPosition = function () {
				if( methods.settings.image ) {
					methods.container.height( $( window ).height() - 80 )

					methods.container.find('img.resp').css({
						height: methods.container.height()
					})
				} 
				var     left = $( window ).width()  - methods.container.width(),
					top  = $( window ).height() - methods.container.height()

					left = left / 2 + $( window ).scrollLeft()
					top  = top  / 2 + $( window ).scrollTop()
				
				methods.container.css({
					top: Math.max( top, 0 ),
					left: Math.max( left, 0),
					width: methods.container.width(),
					height: methods.container.height()
				})


			}
			
			methods.container.setPosition()
			methods.debug( 'position: true' )
		},
		sliding : function(){
			methods.data.each( function( index, value ){
				$( value ).attr( 'data-index', index )
			})
			methods.data.click( function(){
				
				methods.slidingAction( $( this ) )
				methods.debug( 'sliding open' )
				return false
			})
		},
		slidingBind : function(){
			
			if( ! this.settings.prev || this.settings.prev.length == 0 )
				var prev = ''
			else
				prev = '<a href="' + this.settings.prev.attr('href') + '" class="prev" data-index="' + this.settings.prev.attr('data-index') + '"></a>'
					
			if( ! this.settings.next || this.settings.next.length == 0 )
				var next = ''
			else
				next = '<a href="' + this.settings.next.attr('href') + '" class="next" data-index="' + this.settings.next.attr('data-index') + '"></a>'

			methods.container.find( '.controls' ).html( prev + next )
			
			methods.container.find( '.controls a' ).click(function(){
				methods.slidingAction( $( this ) )
				return false
			})
			methods.debug( 'slidingBind open' )
		},
 		slidingAction : function ( link ) {

			this.settings.first = methods.data.first().attr('data-index')
			this.settings.last  = methods.data.last().attr('data-index')
			this.settings.prev  = $( '[data-index=' + ( parseInt( link.attr('data-index')) - 1 ) + ']' )
			this.settings.next  = $( '[data-index=' + ( parseInt( link.attr('data-index')) + 1 ) + ']' )

			if( link.attr('data-index') == this.settings.first )
				this.settings.prev = false
			if( link.attr('data-index') == this.settings.last )
				this.settings.next = false
			
			methods.settings.image = true
			
			image = new Image
			image.src = link.attr('href')
			$( image ).attr( 'class', 'resp' )
			
			methods.open( image, link.attr('href') )
			methods.debug( 'slidingAction open' )
		},
		openLoader : function (){
			methods.loader.show()
			methods.debug( 'open Loader' )
		},
		closeLoader : function (){
			methods.loader.hide()
			methods.debug( 'close Loader' )
		},
		debug : function ( message ){
			if( methods.settings.debug )
				console.log( message )
		}
	}
	
	$.fn.microPopup = function( method ) {
		if ( methods[ method ] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments )
		} else {
			$.error( 'Method ' +  method + ' not found in jQuery.microPopup' )
		}
	}

})(jQuery);