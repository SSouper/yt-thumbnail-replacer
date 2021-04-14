<script lang="ts">
	let yt;
	let image;

	let error = undefined;
	let url = 'None yet!';

	function youtubeParser(url)
	{
		let regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
		let match = url.match(regExp);
		return (match && match[1].length==11)? match[1] : false;
	}

	function generate(yt, image)
	{
		if(!yt || !image) return;
		if(!image.startsWith('http')) return;

		let ytID = youtubeParser(yt);

		if(!ytID)
		{
			return error = 'Invalid YouTube URL!';
		}

		url = `${window.location.href}watch/${ytID}-${btoa(image)}`;
		error = undefined;
	}

	$: generate(yt, image);
</script>
	
<style>
	input
	{
		width: 25%;
		padding: 5px 5px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>

<h1>Discord YouTube Thumbnail Replacer</h1>


{#if error}
	<b style="color: darkred;">Error!</b> {error} <br><br>
{/if}

YouTube link: <br><input type="text" placeholder="https://www.youtube.com/watch?v=...." bind:value={yt}><br>
Image Link: <br><input type="text" placeholder="https://i.imgur.com/..." bind:value={image}><br><br>

Your generated URL(send this in a channel): <b>{url}</b>

<br><br>

<small>Rushed sourcecode: <a target="_blank" href="https://github.com/SSouper/yt-thumbnail-replacer">https://github.com/SSouper/yt-thumbnail-replacer</a> by <a target="_blank" href="https://github.com/SSouper">Souper</a></small><br>
<small>Not affiliated with Discord, YouTube or Google!</small>