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
			canvas.freeDrawingBrush.color = '#64FF4F';
			addPlayerText();
			addCounterTerrorists();
		};		

		var addPlayerText = function() {
			var fbFontFamily = 'Arial',
				fbFontSize = 12,
				fbFontLeftPos = 20;

			// Set Text
			var player1 = new fabric.Text('Player 1', { fontFamily: fbFontFamily, fontSize: fbFontSize, fill: '#64ff4f', left: 20, top: 100 }),
				player2 = new fabric.Text('Player 2', { fontFamily: fbFontFamily, fontSize: fbFontSize, fill: '#4fdfff', left: fbFontLeftPos, top: 120 }),
				player3 = new fabric.Text('Player 3', { fontFamily: fbFontFamily, fontSize: fbFontSize, fill: '#754fff', left: fbFontLeftPos, top: 140 }),
				player4 = new fabric.Text('Player 4', { fontFamily: fbFontFamily, fontSize: fbFontSize, fill: '#ff4fdf', left: fbFontLeftPos, top: 160 }),
				player5 = new fabric.Text('Player 5', { fontFamily: fbFontFamily, fontSize: fbFontSize, fill: '#ff0000', left: fbFontLeftPos, top: 180 });

			canvas.add(player1, player2, player3, player4, player5);
		};

		$('.add-ct').click(function() {
			addCounterTerrorists();
		});

		var addCounterTerrorists = function() {
			canvas.add(
			    new fabric.Circle({ 
			    	radius: 7,
			    	top: 100, 
			    	left: 900, 
			    	lockScalingX: true,
			    	lockScalingY: true,
			    	fill: '#0008FF'
			    })
			);	

			canvas.isDrawingMode = false;			    	

		};

		var changeMapBackground = function(mapFile) {
			mapPath = '/images/' + mapFile + '.jpg';
			canvas.setBackgroundImage(mapPath, canvas.renderAll.bind(canvas));
			addPlayerText();
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
			addPlayerText();
		});	

		$('.save-canvas').click(function(e) {			
			var dataUrl = canvas.toDataURL();
			var dataUrlStripped = dataUrl.replace(/^data:image\/png;base64,/, "");
			sendToImgur(dataUrlStripped);
		});

		$('.players button').click(function(e) {
			canvas.freeDrawingBrush.color = '#' + $(this).data('color');
			canvas.isDrawingMode = true;
		});

		var sendToImgur = function(image) {
		    $.ajax({
		      url: 'https://api.imgur.com/3/upload',
		      method: 'POST',
		      headers: {
		      	Authorization: authorization,
		        Accept: 'application/json'
		      },
		      dataType: 'json',
		      data: {
		        image: image,
		        type: 'base64'
		      },
		      success: function(data) {
				$('header a').attr('href', data.data.link);
				$('header a').text(data.data.link);
				$('header a').show();
		      }
		    });
		};

		// Start it up
		initCanvas();

		// Set Default Map to de_dust2
		changeMapBackground('de_dust2');

	}
);

