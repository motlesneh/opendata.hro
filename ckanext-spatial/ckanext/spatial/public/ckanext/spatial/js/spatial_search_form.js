var CKAN = CKAN || {};

CKAN.SpatialSearchForm = function($){

    // Projections
    var proj4326 = new OpenLayers.Projection("EPSG:4326");
    var proj900913 = new OpenLayers.Projection("EPSG:900913");

    var getGeomType = function(feature){
        return feature.geometry.CLASS_NAME.split(".").pop().toLowerCase()
    }

    var getStyle = function(geom_type){
        var styles = CKAN.DatasetMap.styles;
        var style = (styles[geom_type]) ? styles[geom_type] : styles["default"];

        return new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                    style, OpenLayers.Feature.Vector.style["default"]))
    }

    var getParameterByName = function (name) {

        var match = RegExp('[?&]' + name + '=([^&]*)')
                        .exec(window.location.search);

        return match ?
            decodeURIComponent(match[1].replace(/\+/g, ' '))
            : null;

    }

    var getBoundsFromBbox = function(bbox){
        var coords = bbox.split(",");
        var bounds = new OpenLayers.Bounds(coords[0],coords[1],coords[2],coords[3]).transform(proj4326,proj900913);
        return bounds;
    }

    // Public
    return {
        map: null,

        mapInitialized: false,

        bbox: null,

        defaultExtent: null,

        styles: {
            "default":{
                "fillColor":"#FCF6CF",
                "strokeColor":"#B52",
                "strokeWidth":2,
                "fillOpacity":0.4,
            }
        },

        setup: function(){
            $("#spatial-search-show").click(this.toggleDiv);
            // There is a bbox available from a previous search
            if (CKAN.SpatialSearchForm.bbox){
                 this.toggleDiv();
            }

        },

        toggleDiv: function(){
            $("#spatial-search-show>a").toggleClass("more less");
            $("#spatial-search-container").toggle();
            if (!CKAN.SpatialSearchForm.mapInitialized){
                CKAN.SpatialSearchForm.mapSetup()
            }
        },

        mapSetup: function(){


            var stadtplan = ["http://geo.sv.rostock.de/geodienste/stadtplan/tiles/1.0.0/stadtplan_EPSG3857/${z}/${x}/${y}.png?origin=nw"];

            var layers = [
              new OpenLayers.Layer.OSM("Stadtplan", stadtplan)
            ]

            // Create a new map
            this.map = new OpenLayers.Map("spatial-search-map" ,
                {
                "projection": proj900913,
                "displayProjection": proj4326,
                "units": "m",
                "numZoomLevels": 19,
                "maxResolution": 78271.516964,
                "maxExtent": new OpenLayers.Bounds(1172195.38397243, 6980299.77581873, 1635141.30100399, 7327346.85094072),
                "restrictedExtent": new OpenLayers.Bounds(1172195.38397243, 6980299.77581873, 1635141.30100399, 7327346.85094072),
                "controls": [ 
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoom()
                ],
                "theme":"/ckanext/spatial/js/openlayers/theme/default/style.css"
            });

            var query = new OpenLayers.Control.BoxQuery();
            this.map.addControl(query);

            this.map.addLayers(layers);

            var vector_layer = new OpenLayers.Layer.Vector("Bounding Box",
                {
                    "projection": proj4326,
                    "styleMap": new OpenLayers.StyleMap(this.styles["default"])
                }
            );

            // Setup buttons events
            $("#draw-box").click(function(){
                if (!query.active){
                    query.activate();
                    $("#draw-box").addClass("active");
                } else {
                    $("#draw-box").removeClass("active");
                    query.deactivate();
                }
            });

            $("#clear-box").click(function(){
                if (query.active){
                    $("#draw-box").removeClass("active");
                    query.deactivate();
                }
                vector_layer.destroyFeatures();
                $("#ext_bbox").val('');
            });

            var bounds;
            // Check if there's a bbox from a previous search or a default
            // extent defined
            if (this.bbox) {
                var bboxBounds = getBoundsFromBbox(this.bbox);
                var feature = new OpenLayers.Feature.Vector(
                        bboxBounds.toGeometry()
                );
                vector_layer.addFeatures([feature]);
                bounds = bboxBounds;
            }

            var previousExtent = getParameterByName("ext_prev_extent");
            if (previousExtent && this.bbox){
                bounds = getBoundsFromBbox(previousExtent);
            } else if (this.defaultExtent) {
                bounds = getBoundsFromBbox(this.defaultExtent);
            } else {
                bounds = this.map.maxExtent;
            }

            this.map.zoomToExtent(bounds,true);

            this.map.addLayer(vector_layer);

            this.map.events.register("moveend",this,function(e){
                $("#ext_prev_extent").val(e.object.getExtent().transform(proj900913,proj4326).toBBOX());
            });

            CKAN.SpatialSearchForm.mapInitialized = true;

            this.map.events.triggerEvent("moveend");
        }
    }
}(jQuery)

// Custom control to handle clicks on the map
OpenLayers.Control.BoxQuery = OpenLayers.Class(OpenLayers.Control, {
    type: OpenLayers.Control.TYPE_TOOL,

    boxLayer: null,

    draw: function() {
        this.boxLayer = this.map.getLayersByName("Bounding Box")[0];
        this.handler = new OpenLayers.Handler.Box( this,
                            {done: this.done}
                            );
    },

    done: function(position){
        this.boxLayer = this.map.getLayersByName("Bounding Box")[0];
        // We need a bounding box
        if (position instanceof OpenLayers.Bounds) {
            var bounds;
            var minXY = this.map.getLonLatFromPixel(
                        new OpenLayers.Pixel(position.left, position.bottom));
            var maxXY = this.map.getLonLatFromPixel(
                        new OpenLayers.Pixel(position.right, position.top));
            bounds = new OpenLayers.Bounds(minXY.lon, minXY.lat,
                                           maxXY.lon, maxXY.lat);
        } else {
            return false;
        }

        this.boxLayer.destroyFeatures();

        // Add new query extent
        this.boxLayer.addFeatures([
            new OpenLayers.Feature.Vector(bounds.toGeometry())
        ]);

        // Transform bounds to wgs84
        bounds.transform(this.map.getProjectionObject(),
        new OpenLayers.Projection("EPSG:4326"));

        // Store the coordinates in the hidden bbox field, so they are sent
        // when user submits the form
        $("#ext_bbox").val(bounds.toBBOX());

        $("#draw-box").removeClass("active");
        this.deactivate();

    }


});

OpenLayers.ImgPath = "/ckanext/spatial/js/openlayers/img/";

