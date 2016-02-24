(function() {
	var app = angular.module(paella.editor.APP_NAME);
	
	app.directive("timeLine", function() {
		return {
			restrict: "E",
			templateUrl: "templates/timeline.html",
			controller: ["$scope","PaellaEditor",function($scope,PaellaEditor) {
				$scope.tracks = [];
				
				$scope.tracks = PaellaEditor.tracks;
				
				$scope.$watch('tracks');
			}]
		};
	});
	
	app.directive("track", function() {
		function cancelMouseTracking() {
			$(document).off("mouseup");
			$(document).off("mousemove");
		}
		
		return {
			restrict: "E",
			templateUrl: "templates/track.html",
			scope: {
				data: "="
			},
			controller: ["$scope","PaellaEditor",function($scope,PaellaEditor) {
				$scope.pluginId = $scope.data.pluginId;
				$scope.name = $scope.data.name;
				$scope.color = $scope.data.color;
				$scope.textColor = $scope.data.textColor || 'black';
				$scope.tracks = $scope.data.list;
				$scope.duration = $scope.data.duration;
				$scope.allowResize = $scope.data.allowResize;
				$scope.allowMove = $scope.data.allowMove;
								
				$scope.getLeft = function(trackData) {
					return (100 * trackData.s / $scope.duration);
				};
				
				$scope.getWidth = function(trackData) {
					return (100 * (trackData.e - trackData.s) / $scope.duration);
				};
				
				$scope.getTrackItemId = function(trackData) {
					return "track-" + $scope.pluginId + "-" + trackData.id;
				};
				
				$scope.leftHandlerDown = function(event,trackData) {
					if ($scope.allowResize) {
						var mouseDown = event.clientX;
						$(document).on("mousemove",function(evt) {
							var delta = evt.clientX - mouseDown;
							var elem = $('#' + $scope.getTrackItemId(trackData));
							var trackWidth = elem.width();
							var diff = delta * (trackData.e - trackData.s) / trackWidth;
							var s = trackData.s + diff;
							if (s>0 && s<trackData.e) {
								trackData.s = s;
								PaellaEditor.saveTrack(trackData);
								mouseDown = evt.clientX;
							}
							else {
								cancelMouseTracking();
							}
							console.log(trackData.s + " - " + trackData.e);
						});
						$(document).on("mouseup",function(evt) {
							cancelMouseTracking();
						});
					}
				};
				
				$scope.centerHandlerDown = function(event,trackData) {
					if ($scope.allowMove) {
						var mouseDown = event.clientX;
						$(document).on("mousemove",function(evt) {
							var delta = evt.clientX - mouseDown;
							var elem = $('#' + $scope.getTrackItemId(trackData));
							var trackWidth = elem.width();
							var diff = delta * (trackData.e - trackData.s) / trackWidth;
							var s = trackData.s + diff;
							var e = trackData.e + diff;
							if (s>0 && e<=$scope.duration) {
								trackData.s = s;
								trackData.e = e;
								PaellaEditor.saveTrack(trackData);
								mouseDown = evt.clientX;
							}
							else {
								cancelMouseTracking();
							}
						});
						$(document).on("mouseup",function(evt) {
							cancelMouseTracking();
						});
					}
				};
				
				$scope.rightHandlerDown = function(event,trackData) {
					if ($scope.allowResize) {
						var mouseDown = event.clientX;
						$(document).on("mousemove",function(evt) {
							var delta = evt.clientX - mouseDown;
							var elem = $('#' + $scope.getTrackItemId(trackData));
							var trackWidth = elem.width();
							var diff = delta * (trackData.e - trackData.s) / trackWidth;
							var e = trackData.e + diff;
							if (e<=$scope.duration && e>trackData.s) {
								trackData.e = e;
								PaellaEditor.saveTrack(trackData);
								mouseDown = evt.clientX;
							}
							else {
								cancelMouseTracking();
							}
						});
						$(document).on("mouseup",function(evt) {
							cancelMouseTracking();
						});						
					}
				};
			}]
		};
	});
})();