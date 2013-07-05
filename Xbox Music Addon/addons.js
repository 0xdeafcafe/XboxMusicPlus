jQuery(document).ready(function () {
	jQuery('body').append('<script src="http://localhost:1000/xmp.js"></script>');
});


// Below was written by james, thanks james.

//// BOOKMARKLET :: add collection to now playing
//javascript:(function(){var async=app.mainViewModel.myMusicVM.albumsArrangement.arrayManager.getDataAsync('','');async.done(function(data){app.mainViewModel.queueVM.clear();var albums=data.Groups[0].Items;for(var i=0;i<albums.length;i++)app.mainViewModel.queueVM.enqueue(app.mainViewModel.myMusicVM.albumsArrangement.buildViewModel(albums[i]));});})();

//// BOOKMARKLET ::  randomizing queue
//javascript:(function(){app.mainViewModel.queueVM.trackQueue.sort(function(){return Math.random();});})();
