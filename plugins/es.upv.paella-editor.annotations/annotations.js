

(function() {
	
	class AnnotationTrackPlugin extends paella.editor.TrackPlugin {
		
		checkEnabled() {
			return Promise.resolve(true);
		}
		
		getIndex() {
			return 10000;
		}

		getName() {
			return "annotationTrackPlugin";
		}

		getTrackName() {
			return "Visual Annotations";
		}

		getColor() {
			return "#FA8533";
		}

		getTextColor() {
			return "#F0F0F0";
		}

		getTrackItems() {
			return new Promise((resolve,reject) => {
				var annotationTracks =[]
				paella.plugins.visualAnnotationPlugin._annotations.forEach(function(annotation)
				{
					annotationTracks.push({
		              id: annotation['_id'],
		              s: annotation['time'],
		              e: annotation['time'] + annotation['duration'],
		              name: annotation['type'],
		              data: JSON.stringify(JSON.parse(annotation.content).data),
           		      pauser: JSON.stringify(JSON.parse(annotation.content).pauser),
		              profile: JSON.stringify(JSON.parse(annotation.content).profile),
		              style: JSON.stringify(JSON.parse(annotation.content).style)
            		});				
            //[{id:1,s:10,e:20,name:"link annotation",data:"blablabal"},{id:2,s:20,e:50,name:"text annotation",data:"adfadsf"},{id:3,s:50,e:60,name:"poll annotation",data:"adfadsf"},{id:4,s:60,e:100,name:"embed page annotation",data:"adfadsf"}]
				resolve(annotationTracks);
				});
			});
		}

		allowResize() {
			return true;
		}

		allowDrag() {
			return true;
		}

		allowEditContent() {
			return true;
		}

		onTrackChanged(id,start,end) {
			//base.log.debug('Track changed: id=' + id + ", start: " + start + ", end:" + end);
			console.log("Track changed: s=" + start + ", e=" + end);
		}

		onTrackContentChanged(id,content) {
			//base.log.debug('Track content changed: id=' + id + ', new content: ' + content);	
		}

		onSelect(trackItemId) {
			$scope.selectedAnnotation="afasdf";
			console.log('Track item selected: ' + this.getTrackName() + ", " + trackItemId);
		}

		onUnselect() {
			base.log.debug('Track list unselected: ' + this.getTrackName());
		}

		onDblClick(trackData) {
		}

		getTools() {
			return ["Add Link Annotation","Add Text Annotation"];
		}

		onToolSelected(toolName) {
			console.log('Tool selected: ' + toolName);
		}

		isToolEnabled(toolName) {
			return true;
		}
		
		isToggleTool(toolName) {
			return toolName=="Tool 1";
		}

		buildToolTabContent(tabContainer) {

		}

		getSettings() {
			return null;
		}
	}

	new AnnotationTrackPlugin();

	
	
	var app = angular.module(paella.editor.APP_NAME);
	
	app.directive("annotationsidebar",function() {
		return {
			restrict: "E",
			templateUrl:"templates/es.upv.paella-editor.annotations/content.html",
			controller:["$scope",function($scope) {
				$scope.title = "Annotations";
			}]
		}
	});

	class AnnotationSideBar extends paella.editor.SideBarPlugin {
		checkEnabled() {
			return new Promise((resolve, reject) => {
				resolve(true);
			});
		}
		
		getName() {
			return "Annotations sidebar";
		}

		getTabName() {
			return "Annotations";
		}
		
		getContent() {
			console.log("asfsf");
		}
		
		getDirectiveName() {
			return "annotationsidebar";
		}
	}

	new AnnotationSideBar();
})();

