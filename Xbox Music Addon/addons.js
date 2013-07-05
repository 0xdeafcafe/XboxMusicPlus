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

var isShuffled = false;
function xmp_shuffleMusic() {
	if (isShuffled)
		app.mainViewModel.queueVM.trackQueue.sort(ext_sortByTrackName());
	else
		xmp_shuffleNowPlaying();

	isShuffled = !isShuffled;
}


jQuery(document).ready(function () {
	jQuery('.navigationList').append('<li><button onclick="xmp_shuffleMusic();">Shuffle Off</button></li>');

	var headerContent = jQuery('.actionBarSecondaryWrapper > h1').text();
	if (headerContent != 'Collection') return;

	// Set Play Button
	jQuery('.myMusicMenu > .horizontalNavigationList').append('<li><button onclick="xmp_addCollectionToNowPlaying();" class="iconPlay" title="Play"></button></li>');
});


// Below was written by james, thanks james.

//// BOOKMARKLET :: add collection to now playing
//javascript:(function(){var async=app.mainViewModel.myMusicVM.albumsArrangement.arrayManager.getDataAsync('','');async.done(function(data){app.mainViewModel.queueVM.clear();var albums=data.Groups[0].Items;for(var i=0;i<albums.length;i++)app.mainViewModel.queueVM.enqueue(app.mainViewModel.myMusicVM.albumsArrangement.buildViewModel(albums[i]));});})();

//// BOOKMARKLET ::  randomizing queue
//javascript:(function(){app.mainViewModel.queueVM.trackQueue.sort(function(){return Math.random();});})();
