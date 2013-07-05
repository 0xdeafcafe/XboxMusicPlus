function xmp_shuffleNowPlaying() {
	app.mainViewModel.queueVM.trackQueue.sort(function(){return Math.random();});
}
function ext_sortByTrackName(a, b){
	var aName = a.track.name.toLowerCase();
	var bName = b.track.name.toLowerCase();
	return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function xmp_addCollectionToNowPlaying() {
	app.mainViewModel.queueVM.clear();
	var async = app.mainViewModel.myMusicVM.albumsArrangement.arrayManager.getDataAsync('', '');

	async.done(function(data) {
		app.mainViewModel.queueVM.clear();
		var albums = data.Groups[0].Items;

		for(var i = 0; i < albums.length; i++)
			app.mainViewModel.queueVM.enqueue(app.mainViewModel.myMusicVM.albumsArrangement.buildViewModel(albums[i]));
	});
}

var isShuffled = true;
function xmp_shuffleMusic() {
	if (app.mainViewModel.queueVM.trackQueue().length == 0) return;

	isShuffled = !isShuffled;

	if (isShuffled) {
		app.mainViewModel.queueVM.trackQueue.sort(ext_sortByTrackName);
	} else {
		xmp_shuffleNowPlaying();
		console.log("Shuffled");
	}
	updateShuffleButton();
}

jQuery(document).ready(function () {
	jQuery('.playerSettingsMenu > .navigationList').append('<li><button id="xmp_shuffle_button" onclick="xmp_shuffleMusic();">Shuffle Off</button></li>');

	//var headerContent = jQuery('.actionBarSecondaryWrapper > h1').text();
	//if (headerContent != 'Collection') return;

	// Set Play Button
	jQuery('#leftColumn > #navigation').append('\
		<hr>\
		<div id="custom_functions">\
			<ul class="navigationList navigationMenu">\
				<li class="ui-droppable">\
					<a href="#" onclick="xmp_addCollectionToNowPlaying();">Play Entire Collection</a>\
					<div class="feedbackTag"></div>\
				</li>\
			</ul>\
		</div>\
		');
});

function updateShuffleButton() {
	if (isShuffled) {
		jQuery('#xmp_shuffle_button').html('Shuffle Off');
	} else {
		jQuery('#xmp_shuffle_button').html('Shuffle On');
	}
}

// Below was written by james, thanks james.

//// BOOKMARKLET :: add collection to now playing
//javascript:(function(){var async=app.mainViewModel.myMusicVM.albumsArrangement.arrayManager.getDataAsync('','');async.done(function(data){app.mainViewModel.queueVM.clear();var albums=data.Groups[0].Items;for(var i=0;i<albums.length;i++)app.mainViewModel.queueVM.enqueue(app.mainViewModel.myMusicVM.albumsArrangement.buildViewModel(albums[i]));});})();

//// BOOKMARKLET ::  randomizing queue
//javascript:(function(){app.mainViewModel.queueVM.trackQueue.sort(function(){return Math.random();});})();
