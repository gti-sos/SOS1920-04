<script>
fetch("https://api-nba-v1.p.rapidapi.com/leagues/", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
		"x-rapidapi-key": "751d116867msh3a1f728314793dap1eae7bjsn1738b29d11e8"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
</script>
