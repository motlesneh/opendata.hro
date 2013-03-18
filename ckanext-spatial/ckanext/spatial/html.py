MAP_VIEW="""
<div class="mapview">
    <a href="/dataset/%(name)s/map">View available WMS layers &raquo;</a>
</div>
"""

PACKAGE_MAP_BASIC="""
<div class="dataset-map subsection">
<div id="dataset-map-container"></div>
%(map_attribution)s
</div>
"""

PACKAGE_MAP_EXTENDED="""
<div class="dataset-map subsection">
<h3 style="margin-top:30px">%(title)s</h3>
<div id="dataset-map-container"></div>
%(map_attribution)s
</div>
"""

PACKAGE_MAP_EXTRA_HEADER="""
    <link type="text/css" rel="stylesheet" media="all" href="/ckanext/spatial/css/dataset_map.css" />
"""

PACKAGE_MAP_EXTRA_FOOTER="""
    %(js_library_links)s
    <script type="text/javascript" src="/ckanext/spatial/js/dataset_map.js"></script>
    <script type="text/javascript">
        //<![CDATA[
        $(document).ready(function(){
            CKAN.DatasetMap.map_type = '%(map_type)s';
            CKAN.DatasetMap.extent = '%(extent)s';
            CKAN.DatasetMap.element = '#%(element_id)s';
            CKAN.DatasetMap.setup();
        })
        //]]>
    </script>


"""

SPATIAL_SEARCH_FORM_EXTRA_HEADER="""
    <link type="text/css" rel="stylesheet" media="all" href="/ckanext/spatial/css/spatial_search_form.css" />
"""

SPATIAL_SEARCH_FORM_EXTRA_FOOTER="""
    <script type="text/javascript" src="/ckanext/spatial/js/openlayers/OpenLayers_dataset_map.js"></script>
    <script type="text/javascript" src="/ckanext/spatial/js/spatial_search_form.js"></script>
    <script type="text/javascript">
        //<![CDATA[
        $(document).ready(function(){
            CKAN.SpatialSearchForm.bbox = '%(bbox)s';
            CKAN.SpatialSearchForm.defaultExtent = '%(default_extent)s';
            CKAN.SpatialSearchForm.setup();
        })
        //]]>
    </script>
"""

SPATIAL_SEARCH_FORM="""
<input type="hidden" id="ext_bbox" name="ext_bbox" value="%(bbox)s" />
<input type="hidden" id="ext_prev_extent" name="ext_prev_extent" value="" />

<div id="spatial-search-show"><a href="#" class="more">nach geographischer Abdeckung filtern</a></div>
<div id="spatial-search-container">
    <div id="spatial-search-map-container">
        <div id="spatial-search-map" class="span3"></div>
        <div id="spatial-search-toolbar" class="span3">
            <input type="button" id="draw-box" value="zeichnen" class="btn"/>
            <input type="button" id="clear-box" value="entfernen" class="btn"/>
            <div class="helper justify">Klicken Sie auf den Button <b>zeichnen</b>, um einen Suchbereich in der Karte durch Aufziehen einzuzeichnen. Nutzen Sie das Mausrad zum Zoomen und die linke Maustaste zum Verschieben der Karte. Mit einem Klick auf den Button <b>entfernen</b> wird der Suchbereich aus der Karte entfernt.</div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div id="spatial-search-map-attribution">Kartenbild &#169; Hansestadt Rostock (<a target='_blank' href='http://creativecommons.org/licenses/by/3.0/deed.de'>CC BY 3.0</a>) | Kartendaten &#169; <a target='_blank' href='http://www.openstreetmap.org'>OpenStreetMap</a> (<a target='_blank' href='http://opendatacommons.org/licenses/odbl/'>ODbL</a>) und <a target='_blank' href='https://geo.sv.rostock.de/uvgb.html'>uVGB-MV</a></div>
"""

MAP_ATTRIBUTION_OSM="""<div id="spatial-search-map-attribution">Kartenbild &#169; Hansestadt Rostock (<a target='_blank' href='http://creativecommons.org/licenses/by/3.0/deed.de'>CC BY 3.0</a>) | Kartendaten &#169; <a target='_blank' href='http://www.openstreetmap.org'>OpenStreetMap</a> (<a target='_blank' href='http://opendatacommons.org/licenses/odbl/'>ODbL</a>) und <a target='_blank' href='https://geo.sv.rostock.de/uvgb.html'>uVGB-MV</a></div>"""
