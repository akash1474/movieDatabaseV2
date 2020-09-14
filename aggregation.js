db.movies.aggregate([
{
	$group:{
		_id:'$category',
		totalCount:{$sum:1},
		totalSize:{$sum:'$size'}
	}
},
]).pretty();