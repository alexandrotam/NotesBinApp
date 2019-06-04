
  //--------------------------------------------------------------//
  // Full Window (stretched) Watermarked Background Image v2.0.1. //
  //--------------------------------------------------------------//
  //                                                              //
  //        Copyright (C) 2002-2004 QCS Systems Inc.              //
  //                                                              //
  //  This JavaScript can be used  with  permission as long as    //
  //  this message stays here in the header of the script. Any    //
  //  modifications and bug fixes are appreciated.                //
  //                                                              //
  //    Author : D.J.Oepkes                                       //
  //    Date   : 11/22/2002                                       //
  //    Email  : joepkes@qcssystems.com                           //
  //                                                              //
  //--------------------------------------------------------------//
  // Modifications                                                //
  //--------------------------------------------------------------//
  // 11/22/2004 D.J.Oepkes, Total rebuild as I finally found an   //
  //                        excellent way to do away with java-   //
  //                        script to position it. It's now all   //
  //                        done through CSS and an easy onload   //
  //                        function does all the layering work   //
  //--------------------------------------------------------------//
  // 01/12/2005 D.J.Oepkes, Removed one layer out the equation.   //
  //                        Also removed layer-position: fixed    //
  //                        to make flash work in firefox.        //
  //--------------------------------------------------------------//

  var backgroundset=false;   // do not change, for internal use only

  //--------------------------------------------------------------//
  // fixedBackground                                              //
  //--------------------------------------------------------------//
  // set the fixed background image. If Called for the first time //
  // it will set the necessary body styles, layers, and images to //
  // create the fixed background effect,  otherwise it will  just //
  // change the background image.                                 // 
  //                                                              //
  // Insert the following into the html to load the script        //
  //   <script src="fixedbackground.js"></script>                 //
  //                                                              //
  // 1) How to Use in body-tag (preferred):                       //
  //  <body onload="fixedBackground('background.jpg');">          //
  //                                                              //
  // 2) How to Use in link:                                       //
  //  <a href="javascript:fixedBackground('background.jpg');">    //
  //    Try this background...                                    //
  //  </a>                                                        //
  //                                                              //
  // 3) How to use in script:                                     //
  //  <script>                                                    //
  //    fixedBackground('background.jpg');                        //
  //  </script>                                                   //
  //--------------------------------------------------------------//

  function fixedBackground(url)
  {
    if(!backgroundset)
    {
      document.body.style.overflow = 'hidden';
      document.body.style.padding  = '0px';
      document.body.style.margin   = '0px';

      var overlay = document.createElement('DIV');
      overlay.style.position    = 'absolute';
      overlay.style.top         = '0px';
      overlay.style.left        = '0px';
      overlay.style.height      = '100%';
      overlay.style.width       = '100%';
      overlay.style.overflow    = 'auto';

      overlay.innerHTML         = document.body.innerHTML;
      document.body.innerHTML   = '<img id="background" height="100%"  width="60%" src="' + url + '" style="left: 0; bottom: 0; right: 0; top: 0; z-index: 0" />';

      document.body.appendChild(overlay);

      backgroundset=true;
    }
    else
      background.src=url;
  }

  //--------------------------------------------------------------//
  //---  Prelevato ed illustrato su http://www.web-link.it  -----//
