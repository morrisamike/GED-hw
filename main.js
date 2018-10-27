            /************* Global VARIABLES*****************/
            this.pageAddresses =[];
            this.pageLinks = [];
            // paths to all of your files
            var myFiles = [ "Internet1.json", "Internet2.json" ];
            var actual_JSON;
            /************* LOAD JSON *************/
            function loadJSON(callback, FP) {   
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.open('GET', FP, true);
                xobj.onreadystatechange = function () {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                        console.log("JSON Object: " + xobj.responseText);
                        callback(xobj.responseText);
                    }
                };
                xobj.send(null);  
            }

            function init() {
///////////////////////////Functions ///////////////////////////////////////////////////
                /************ Parse Page ***********/
                function parsePages(actual_JSON) {
                    //Scan pages
                    for (x in actual_JSON.pages){
                        console.log("Page index: " + x);
                        //grab the address
                        console.log("Page address pushed: " + actual_JSON.pages[x].address);
                    
                        this.pageAddresses.push(actual_JSON.pages[x].address);
                        //grab the links - check length
                        actual_JSON.pages[x].links.forEach(function(l){
                                this.pageLinks.push(l)
                        });
                        console.log("Page links pushed: " + this.pageLinks);
                    }
                }
                /***********Check Address Array***********/
                function checkAddresses() {
                console.log("Current Addresses: " + this.pageAddresses);
                }
                /***********Check Links Array***********/
                function checkLinks() {
                console.log("Current Links: " + this.pageLinks);
                }
                /*********** Print Success Array***********/
                function calcSuccess() {
                    successArray =[];
                     //list of page adresses skipped
                    for (x in actual_JSON.pages){
                        //grab the page
                        tmpPage = actual_JSON.pages[x].address;
                        for (i=0;i<=x;i++){
                            actual_JSON.pages[i].links.forEach(function(l){
                                successArray.push(tmpPage);
                        });
                        }
                    }
                    successArray = successArray.filter(function(item, index){
	                return successArray.indexOf(item) >= index;
                });
                document.write("Success: [ "+ successArray +" ]");
                }
                /*********** Print Skipped Array***********/
                function calcSkipped() {
                    var skippedArray = [];
                    //list of page adresses skipped
                    var tmpArr = [];//visited pages
                     //list of page adresses skipped
                     this.pageAddresses.forEach(function(item){
                        //grab the page
                        tmp =this.pageAddresses.indexOf(item) // 
                        tmpArr.push(item);//visited
                        //console.log("page " + tmp + " item " + item);
                        for (i=0;i<=tmp;i++){
                        actual_JSON.pages[tmp].links.forEach(function (a){
                            //check if visited
                            tmpArr.includes(a) ? skippedArray.push(a): console.log(""); 
                        })    
                        }
                        //console.log("Page crawled" + tmpPage);
                    })
                     skippedArray = skippedArray.filter(function(j, index){
	                    return skippedArray.indexOf(j) >= index;
                    });
                document.write("Skipped: [ "+ skippedArray + "]" );
                }
                
                /*********** Print Error Array***********/
                function calcError() {
                    var errorArray =[];
                     //list of page adresses skipped
                     var tmpArr = [];//visited pages
                     //list of page adresses skipped
                     this.pageAddresses.forEach(function(item){
                        //grab the page
                        tmp =this.pageAddresses.indexOf(item) // 
                        tmpArr.push(item);//visited
                        console.log("page " + tmp + " item " + item);
                        for (i=0;i<=tmp;i++){
                        actual_JSON.pages[tmp].links.forEach(function (a){
                            //check if exists
                            if (!this.pageAddresses.includes(a)){
                                errorArray.push(a)
                            }
                        })    
                        }
                        console.log("Page crawled" + tmpPage);
                    })

                     errorArray = errorArray.filter(function(j, index){
	                    return errorArray.indexOf(j) >= index;
                    });
                    document.write("Error: "+ errorArray);
                }

                /////////////////////////////////////////////////////
                
                var jsonData = [];
                myFiles.forEach(function (file, i) {
                    loadJSON(function(response) {
                        // Parse JSON string into object
                        jsonData[i] = JSON.parse(response);
                        actual_JSON = jsonData[i];
                        this.pageAddresses =[];
                        this.pageLinks = [];
                        document.write("<h1>" + file + "</h1>");
                        parsePages(jsonData[i]);
                        checkAddresses();
                        checkLinks();
                        calcSuccess();
                        document.write("<br>");
                        calcError();
                        document.write("<br>");
                        calcSkipped();
                        document.write("<br>");
                        checkAddresses();

                    },file)
                })

            console.log("Internet Crawled");
            }

            window.onload = init();