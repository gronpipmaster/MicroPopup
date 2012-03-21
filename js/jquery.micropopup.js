(function( $ ){
	var methods = {
		init : function ( options ){
			var popup = this
			
			popup.settings = $.extend({
				image: true,
				callback: function (){}
			}, options )
			
			methods.data = $( this )
			methods.settings  = { image: true }
			
			if( $( '.micropopup-overlay' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-overlay" />' )
				
			if( $( '.micropopup-container' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-container"><div class="inner"></div><div class="controls"></div><div class="close"></div></div>' )
				
			if( $( '.micropopup-loader' ).length == 0 )
				$( 'body' ).append( '<div class="micropopup-loader" />' )

			methods.loader = $( '.micropopup-loader' )
			methods.container = $( '.micropopup-container' )
			methods.overlay = $( '.micropopup-overlay' )
			
			if( ! popup.settings.image ){
				methods.settings.image = false
				methods.data.click( function(){
					var url = this.href
					
					$.get( url, function( data ){
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
			$( 'body' ).css({ 'overflow-x':'hidden' })
			methods.container.find( '.inner' ).html( content )
			
			setTimeout( function(){
				methods.position()
			}, 100 )
			
			if( this.settings.image ) {
				
				$( content ).load(function(){
					methods.container.css({
						width: methods.container.width(),
						height: methods.container.height()
					})
				})
				methods.slidingBind()
				methods.container.find( '.controls' ).show()
			}
			
			methods.overlay.show()
			methods.container.show()
			
			methods.overlay.click( function(){
				methods.close()
			})
			
			methods.container.find( '.close' ).click( function(){
				methods.close()
			})
			
			methods.container.find( 'form' ).attr( 'action', url )
			

		},
		close : function (){
			methods.overlay.hide()
			methods.container.find( '* *' ).fadeOut( 200, function(){
				methods.container.hide()
				$( this ).remove()
			})
			
			$( 'body' ).css({ 'overflow-x':'visible' })
		},
		position : function (){
			methods.container.setPosition = function () {
				
				var     left = $( window ).width()  - methods.container.width(),
					top  = $( window ).height() - methods.container.height()

					left = left / 2 + $( window ).scrollLeft()
					top  = top  / 2 + $( window ).scrollTop()
					
				console.log()
				
				methods.container.css({
					top: Math.max( top, 0 ),
					left: Math.max( left, 0)
				})
			}
			
			methods.container.setPosition()
		},
		sliding : function(){
			methods.data.each( function( index, value ){
				$( value ).attr( 'data-index', index )
			})
			methods.data.click( function(){
				methods.slidingAction( $( this ) )
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

			this.settings.image = true

			methods.open( '<img src="' + link.attr('href') + '" class="resp"/>', link.attr('href') )

		},
		openLoader : function (){
			methods.loader.show()
		},
		closeLoader : function (){
			methods.loader.hide()
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