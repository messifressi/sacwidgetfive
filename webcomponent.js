(function()  {
	
	let d3Script = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
    d3Script.async = false;
    document.head.appendChild(d3Script);
	
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `


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
			//this._paxKumValElem = this._shadowRoot.querySelector('#paxKumVal');
			//this._ksOpenElem = this._shadowRoot.querySelector('#ksOpen');
			//this._tileHeaderElem = this._shadowRoot.querySelector('#ksText');
			//this._chartElem = this._shadowRoot.querySelector('#chartBase');
			//this._tileHeaderElem.innerHTML = this._tileHeaderText;
			this._paxKumVal = '0000';
			this._ksOpen = 'status';
			this._widgetWidth;
			this._widgetHeight;
            		this._widgetHeight = 480;
            		this._widgetWidth = 640;
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);});
			this._props = {};
		}

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
	    //const bcRect = this.getBoundingClientRect();
           // this._widgetHeight = bcRect.height;
            //this._widgetWidth = bcRect.width;
	    //console.log(this._widgetHeight);
	    //console.log(this._widgetWidth);
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
	    /*const bcRect = this.getBoundingClientRect();
            this._widgetHeight = bcRect.height;
            this._widgetWidth = bcRect.width;
            this.render();*/
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

	    	if (!this._svgContainer){
		this._svgContainer = window._d3.select(this._shadowRoot)
		.append("svg:svg")
		.attr("id", "lineChart")
		.attr("width", this._widgetWidth)
		.attr("height", this._widgetHeight);
	    	} else{
		window._d3.select(this._shadowRoot).selectAll("*").remove();
		this._svgContainer = window._d3.select(this._shadowRoot)
		.append("svg:svg")
		.attr("id", "lineChart")
		.attr("width", this._widgetWidth)
		.attr("height", this._widgetHeight);
	    	}
		console.log(this._widgetWidth);


		var data = [{"date": new Date("2021-03-24"), "value": parseFloat('65.35')},
			   {"date": new Date("2021-03-25"), "value": parseFloat('75.35')},
			   {"date": new Date("2021-03-26"), "value": parseFloat('85.35')},
			   {"date": new Date("2021-03-27"), "value": parseFloat('95.35')},
			   {"date": new Date("2021-03-28"), "value": parseFloat('115.35')}];
		
		console.log(data);
		
		//var parseTime = window._d3.timeParse("%Y-%m-%d");
		//console.log("parseTime: " + parseTime(new Date(2021, 3, 4)));
		
		var xScale = window._d3.scaleTime().range([0, this._widgetWidth]);
		var yScale = window._d3.scaleLinear().rangeRound([this._widgetHeight, 0]);
		
		/*var valueline = window._d3.line()
		    .x(function(d) { return xScale(d.date); })
		    .y(function(d) { return yScale(d.value); });*/
		
		var line = window._d3.line()

		  .x(function(d) { 
		    console.log("Basiswert Datum: " + d.date)
		    console.log("Skalierter Wert Datum: " + xScale(d.date))
		    return xScale(d.date)
		  })

		  .y(function(d) { 
		    console.log("Basiswert Wert: " + d.value)
		    console.log("Skalierter Wert Wert: " + yScale(d.value))
		    return yScale(d.value)
		  })

		  xScale.domain(data.map(function(d) { 
		    return d.date
		  }));

		  yScale.domain([0, window._d3.max(data, function(d) { 
		    return d.value 
		  })]);
		
		/*data.forEach(function(d) {
		      d.date = parseTime(d.date);
		      d.value = +d.value;
		  });*/
		
		//xScale.domain(window._d3.map(data, function(d) { return d.date; }));
  		//yScale.domain([0, window._d3.max(data, function(d) { return d.value; })]);
		
		// Add the valueline path.
		var appendLine = this._svgContainer.append("path")
		      .data([data])
		      .attr("class", "line")
		      .attr("d", line);

		  // Add the X Axis
		var appendXLine = this._svgContainer.append("g")
		      .attr("transform", "translate(0," + this._widgetHeight + ")")
		      .call(window._d3.axisBottom(xScale));

		  // Add the Y Axis
		var appensYLine = this._svgContainer.append("g")
		      .call(window._d3.axisLeft(yScale));
		
		this._ksOpenElem.innerHTML = this._ksOpen;
		this._paxKumValElem.innerHTML = this._paxKumVal;
		console.log("render()");
	}
    });
})();
