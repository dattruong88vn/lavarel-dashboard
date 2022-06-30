Vue.mixin({
	methods: {
		loadAjax: function(totalQueue, countQueue) {
			if (Number(totalQueue) == Number(countQueue)) {
				hidePropzyLoading();
			} else {
				showPropzyLoading();
			}
		},
		startQueue: function(totalQueue, countQueue) {
			countQueue++;
			this.loadAjax(totalQueue, countQueue);
			return countQueue;
		},
		checkLoading: function(totalQueue, countQueue) {
			if (Number(totalQueue) == Number(countQueue)) {
				return false;
			} else {
				return true;
			}
		},
		sanitizeTitle: function(title) {
	      var slug = "";
	      // Change to lower case
	      var titleLower = title.toLowerCase();
	      // Letter "e"
	      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
	      // Letter "a"
	      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
	      // Letter "o"
	      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
	      // Letter "u"
	      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
	      // Letter "i"
	      slug = slug.replace(/i|ỉ|ị|ĩ|ì|í/gi, 'i');
	      // Letter "y"
	      slug = slug.replace(/y|ỷ|ỵ|ỹ|ỳ|ý/gi, 'y');
	      // Letter "d"
	      slug = slug.replace(/đ/gi, 'd');
	      // Trim the last whitespace
	      slug = slug.replace(/\s*$/g, '');
	      // Change whitespace to "-"
	      slug = slug.replace(/\s+/g, '-');
	      
	      return slug;
	    },
	    chunkSize: function(arrayItem ,chunkSize) {
	        var n = arrayItem.length;

	        if (chunkSize >= n) {
	            return [arrayItem];
	        }

	        if (n == 0) {
	            return [];
	        }

	        var r = n % chunkSize;
	        var q = (n - r) / chunkSize;
	        var result = [];

	        for (var i = 0; i <= q; i++) {
	            result.push(arrayItem.slice(i * chunkSize, i * chunkSize + chunkSize));
	        }

	        return result;
	    }
	}
});
