(function()  {
	
	let d3Script = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
    d3Script.async = false;
    document.head.appendChild(d3Script);
	
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   inkscape:version="1.0 (4035a4fb49, 2020-05-01)"
   sodipodi:docname="ZeichnungWidget2.svg"
   id="SVGRoot"
   version="1.1"
   viewBox="0 0 280.0 180.0"
   height="180.0px"
   width="280.0px">
  <metadata
     id="metadata24">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs
     id="defs22" />
  <sodipodi:namedview
     inkscape:current-layer="layer1"
     inkscape:window-maximized="1"
     inkscape:window-y="-8"
     inkscape:window-x="-8"
     inkscape:cy="104.36537"
     inkscape:cx="86.356726"
     inkscape:zoom="2.9556977"
     showgrid="true"
     id="namedview20"
     inkscape:window-height="1017"
     inkscape:window-width="1920"
     inkscape:pageshadow="2"
     inkscape:pageopacity="0"
     guidetolerance="10"
     gridtolerance="10"
     objecttolerance="10"
     borderopacity="1"
     bordercolor="#666666"
     pagecolor="#ffffff">
    <inkscape:grid
       id="grid849"
       type="xygrid" />
  </sodipodi:namedview>
  <g
     inkscape:label="Ebene 1"
     inkscape:groupmode="layer"
     id="layer1">
    <text
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:24px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.02012"
       x="19.693363"
       y="32.87323"
       id="textHeader"><tspan
         sodipodi:role="line"
         id="ksText"
         x="19.693363"
         y="32.87323"
         style="stroke-width:1">Kontrollspur X</tspan></text>
    <text
       transform="scale(1.0149042,0.98531463)"
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:21.2239px;line-height:1.25;font-family:sans-serif;fill:#00b300;fill-opacity:1;stroke:none;stroke-width:1.02036"
       x="25.463541"
       y="60.572983"
       id="textOpen"><tspan
         sodipodi:role="line"
         id="ksOpen"
         x="25.463541"
         y="60.572983"
         style="stroke-width:0.994873">status</tspan></text>
    <rect
       style="fill:none;stroke:#000000;stroke-width:1.0;stroke-opacity:1;opacity:1"
       id="rect126"
       width="98%"
       height="98%"
       x="1%"
       y="1%" />
    <text
       transform="scale(1.0087215,0.99135386)"
       xml:space="preserve"
       style="font-style:normal;font-weight:normal;font-size:13.0174px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.976308"
       x="13.344829"
       y="102.65318"
       id="text1305"><tspan
         sodipodi:role="line"
         id="paxKumTxt"
         x="13.344829"
         y="102.65318"
         style="font-size:15.6209px;stroke-width:0.976308">PAX kumuliert</tspan></text>
    <text
       y="153.73438"
       x="12.859375"
       xml:space="preserve"
       style="font-size:16px;line-height:1.25;font-family:sans-serif"
       id="text1309"><tspan
         sodipodi:role="line"
         id="paxKumVal"
         x="12.859375"
         y="153.73438"
         style="font-size:32px">0000</tspan></text>
    <text
       y="102.15625"
       x="139.5"
       xml:space="preserve"
       style="font-size:16px;line-height:1.25;font-family:sans-serif"
       id="text1330"><tspan
         sodipodi:role="line"
         id="tagesauslastung"
         x="139.5"
         y="102.15625"
         style="font-size:16px">Tagesverlauf</tspan></text>
    <rect
       y="115"
       x="140"
       height="55"
       width="125"
       id="chartBase"
       style="fill:#d7e3f9;fill-opacity:1" />
  </g>
</svg>

    `;
	
d3Script.onload = () => 

    customElements.define('com-sap-sample-tilechart', class TileChart extends HTMLElement {


		constructor() {
			super(); 
			
			if (!window._d3){
				window._d3 = d3;
			    }
			
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
			this._firstConnection = false;
			this._tagContainer;
			this._svgContainer;
			this._tagType = "h1";
			this._tileHeaderText = "Kontrollspur N";
			this._paxKumValElem = this._shadowRoot.querySelector('#paxKumVal');
			this._ksOpenElem = this._shadowRoot.querySelector('#ksOpen');
			this._tileHeaderElem = this._shadowRoot.querySelector('#ksText');
			this._chartElem = this._shadowRoot.querySelector('#chartBase');
			this._tileHeaderElem.innerHTML = this._tileHeaderText;
			this._paxKumVal = '0000';
			this._ksOpen = 'status';
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);});
			this._props = {};
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
	    const bcRect = this.getBoundingClientRect();
            this._widgetHeight = bcRect.height;
            this._widgetWidth = bcRect.width;
            this.render();
		console.log("connectedCallback");
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
	disconnectedCallback () {
            // your cleanup code goes here
            try{
                document.head.removeChild(d3Script);
            }
            catch{}
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(changedProperties) {
			console.log("onCustomWidgetAfterUpdate");
			console.log(changedProperties);
			 if ("tileHeaderText" in changedProperties) {
				this._tileHeaderText = changedProperties["tileHeaderText"];
				 console.log(this._tileHeaderText);
				 this._tileHeaderElem.innerHTML = this._tileHeaderText;
				 
			}
           		 if ("ksOpen" in changedProperties) {
				this._ksOpen = changedProperties["ksOpen"];
			}
			
			if ("paxKumVal" in changedProperties) {
				this._paxKumVal = changedProperties["paxKumVal"];
			}
			
			this.render();
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        
        onCustomWidgetResize(width, height){
	    const bcRect = this.getBoundingClientRect();
            this._widgetHeight = bcRect.height;
            this._widgetWidth = bcRect.width;
            this.render();
        }
        
		getBarValue(value){
			var maxVal = 7800;
			var percentage = value/maxVal*100;
			return Math.round(percentage*1.2);
		}
		
		getStatusColor(value){
			if (value == 1){
				return "#1EE61E";
			}
			else {
				return "#A2A2A2";
			}
		}
		
		setTileValues(newValue1, newValue2){
		}
	    
	    	get paxKumVal(){
			return this._paxKumVal;
		}
	    
	    	set paxKumVal(value){
			this._paxKumVal = value;
		}
	    
	        get ksOpen(){
			return this._ksOpen;
		}
	    
	    	set ksOpen(value){
			
			this._ksOpen = value;
		}
		
		get tileHeaderText(){
			return this._tileHeaderText;
		}
		
		set tileHeaderText(value){
			this._tileHeaderText = value;
		}
		
		
		setSquare(newValues){
			var square4 = this._shadowRoot.querySelector("#square1");
			var ks01 = this._shadowRoot.querySelector("#KS01");
			ks01.setAttribute("fill", newValues[0]);

		}

        redraw(){
		/**if (this._tagContainer){
                	this._tagContainer.parentNode.removeChild(this._tagContainer);
            	}
		var shadow = window.getSelection(this._shadowRoot);
		this._tagContainer = document.createElement(this._tagType);
		var theText = document.createTextNode(this._tileHeaderText);    
		this._tagContainer.appendChild(theText); 
		this._shadowRoot.appendChild(this._tagContainer);**/
		this._tileHeaderText = this._ksText;
		console.log("redraw()");
		
		//this._ksopen.innerHTML = 'open';
			
        }
			
	render(){
		if (this._widgetHeight < this._widgetWidth){
                	this._widgetWidth = this._widgetHeight;
		}

	    	if (!this._svgContainer){
		this._svgContainer = window._d3.select(this._chartElem)
		.append("svg:svg")
		.attr("id", "lineChart")
		.attr("width", this._widgetWidth)
		.attr("height", this._widgetHeight);
	    	} else{
		window._d3.select(this._chartElem).selectAll("*").remove();
		this._svgContainer = window._d3.select(this._chartElem)
		.append("svg:svg")
		.attr("id", "lineChart")
		.attr("width", this._widgetWidth)
		.attr("height", this._widgetHeight);
	    	}
		
		window._d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : window._d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = window._d3.scaleTime()
      .domain(window._d3.extent(data, function(d) { return d.date; }))
      .range([ 0, 50 ]);
    window._d3.select(this._chartElem).append("g")
      .attr("transform", "translate(0," + 15 + ")")
      .call(window._d3.axisBottom(x));

    // Add Y axis
    var y = window._d3.scaleLinear()
      .domain([0, window._d3.max(data, function(d) { return +d.value; })])
      .range([ 15, 0 ]);
    window._d3.select(this._chartElem).append("g")
      .call(window._d3.axisLeft(y));

    // Add the line
    window._d3.select(this._chartElem).append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", window._d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})
		
		this._ksOpenElem.innerHTML = this._ksOpen;
		this._paxKumValElem.innerHTML = this._paxKumVal;
		console.log("render()");
	}
    });
})();
