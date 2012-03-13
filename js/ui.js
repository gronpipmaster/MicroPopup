$(function() {
	$( '.sliding a' ).microPopup()
	
	$( '.various a' ).microPopup({
		image: false,
		callback:function(){
			console.log('Callback Functions in open content')
		}
	})
})