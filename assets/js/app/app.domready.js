$(document).ready(
	function () {	

		var canvasEl = document.getElementById('map'),
			ctx = canvasEl.getContext('2d'),
			canvas = new fabric.Canvas('map');		

		var changeMapBackground = function(mapFile) {
			mapPath = '/images/' + mapFile + '.jpg';
			canvas.setBackgroundImage(mapPath, canvas.renderAll.bind(canvas));
		}

		var initCanvas = function() {			
				canvas.setHeight(768);
				canvas.setWidth(1024);
				canvas.isDrawingMode = true;
				canvas.freeDrawingColor = 'c500ae';
				canvas.freeDrawingLineWidth = 10;
		};

		// Bind select menu
		$('.change-map').bind('change', function() {
			var mapName = $(this).val();
			$(this).blur();
			canvas.clear();

			changeMapBackground(mapName);
		});		

		// Start it up
		initCanvas();

		// Set Default Map to de_dust2
		changeMapBackground('de_dust2');

	}
);

