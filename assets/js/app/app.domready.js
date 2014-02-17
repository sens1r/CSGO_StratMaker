$(document).ready(
	function () {	

		var canvasEl = document.getElementById('map'),
			ctx = canvasEl.getContext('2d'),
			canvas = new fabric.Canvas('map')
			clientId = 'c1d18f5ef8f5c66',
			authorization = 'Client-ID ' + clientId;

		var initCanvas = function() {			
				canvas.setHeight(768);
				canvas.setWidth(1024);
				canvas.isDrawingMode = true;
				canvas.freeDrawingColor = 'c500ae';
				canvas.freeDrawingLineWidth = 10;
		};			

		var changeMapBackground = function(mapFile) {
			mapPath = '/images/' + mapFile + '.jpg';
			canvas.setBackgroundImage(mapPath, canvas.renderAll.bind(canvas));
		}

		// Bind select menu
		$('.change-map').bind('change', function() {
			var mapName = $(this).val();
			$(this).blur();
			canvas.clear();

			changeMapBackground(mapName);
		});

		// Clear Canvas of paths
		$('.clear-canvas').click(function(e) {
			canvas.clear();
		});	

		$('.save-canvas').click(function(e) {			
			var dataUrl = canvas.toDataURL();
			// $('.data-url textarea').val(dataUrl);
			// $('.data-url').show();

			$.ajax({
				url: '/createimage/generate',
				dataType: 'JSON',
				type:'POST',
				data: { image: dataUrl },
				success: function(data) {
					sendToImgur(data.image);
				},
				error: function() {
					alert('Upload Failed');
				}
			});
		});

		var sendToImgur = function(image) {
			var imagePath = window.location.origin + '/assets/images/uploads/' + image;
			console.log(imagePath);

		    $.ajax({
		      url: 'https://api.imgur.com/3/image',
		      method: 'POST',
		      headers: {
		      	Authorization: authorization,
		        Accept: 'application/json'
		      },
		      data: {
		        image: imagePath
		      },
		      success: function(result) {
		        console.log(result);
		      }
		    });
		};

		// Start it up
		initCanvas();

		// Set Default Map to de_dust2
		changeMapBackground('de_dust2');

	}
);

