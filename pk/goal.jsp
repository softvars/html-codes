<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!-- SEO meta -->
        <title>${goal.title} | Hype</title>
        <meta name="description" content="Money is just a tool">
	    <!-- FB open graph meta  -->
	    <meta property="og:url"                content="${shareURL}" />
	    <meta property="og:type"               content="website" />
	    <meta property="og:title"              content="${goal.title}" />
	    <meta property="og:description"        content="${goal.description}" />
	    <meta property="og:image"              content="${imageURL}" />
		<meta property="fb:app_id" 			   content="1419375975058739" />
		
        <!--[if lt IE 9]>
            <script src="//netdna.bootstrapcdn.com/html5shiv/3.6.1/html5shiv.js"></script>
        <![endif]-->
        <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css">
        <link rel="stylesheet" href="<c:url value="/resources/css/style.css"/>" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='//fonts.googleapis.com/css?family=Lato:400,100,300,900|Droid+Serif' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

        <!-- favicons -->
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
    </head>
<body>
    <header class="c-box-with-border c-site-header">
        <div class="o-center-column">
	        <!-- <img class="c-site-header__logo" src="<c:url value="/resources/img/logo-hype.svg"/>"> -->
	        <svg class="c-site-header__logo" version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="389.144px" height="314.809px" viewBox="0 0 389.144 314.809" enable-background="new 0 0 389.144 314.809"
     xml:space="preserve">
<g>
    <path fill="#13283A" d="M252.999,120.385h-24.537v42.505h23.793c16.108,0,27.015-8.427,27.015-21.314v-0.248
        C279.269,127.572,268.611,120.385,252.999,120.385z"/>
    <path fill="#13283A" d="M317.195,201.18v-86.744h61.713v5.948h-55.27v34.078h49.693v5.949h-49.693v34.821h38.057
        c17.164-19.963,27.449-40.837,27.449-61.289c0-111.473-159.133-160.912-262.553-119.331C77.908,34.186,41.04,70.594,19.98,114.437
        h0.778v40.15h55.516v-40.15h6.443v86.744h-6.443v-40.646H20.758v40.646h-6.444v-73.825c-18.459,46.443-19.808,99.78,0.309,149.812
        c33.548,83.44,256.74,14.793,341.732-75.987H317.195z M155.591,166.731v34.45h-6.444v-34.326l-37.176-52.418h8.055l32.467,46.594
        l32.592-46.594h7.683L155.591,166.731z M285.712,141.204c0,18.216-15.738,27.634-33.829,27.634h-23.422v32.343h-6.444v-86.744
        h31.476c19.085,0,32.22,9.79,32.22,26.519V141.204z"/>
</g>
</svg>
	        <a class="c-button" href="${hypeHomePageURI}" target="_blank" title="Hype">Registrati a Hype, &#232; gratis!</a>
        </div>
    </header>
    <!-- Load Facebook SDK for JavaScript -->
    <!-- https://developers.facebook.com/docs/plugins/share-button#configurator -->
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v2.3";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

    <br><!-- TODO: rimuovere -->
        <section class="o-center-column">
		<article class="c-obv-web">
		    <header class="c-obv-web__header">
		        <div class="c-obv-web__userpic">
			        <c:choose>
	                  <c:when test="${goal.userImageURL ne null}">
	                    <img class="c-obv-web__userpic-img" src="data:image/jpeg;base64,${goal.userImageURL}" />
	                  </c:when>
	                  <c:otherwise>
		       	        <svg  style="width: 100%; margin-top: 15%;" width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
						    <!-- Generator: Sketch 3.1.1 (8761) - http://www.bohemiancoding.com/sketch -->
						    <title>user-full</title>
						    <desc>Created with Sketch.</desc>
						    <defs></defs>
						    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
						        <g id="user-full" sketch:type="MSArtboardGroup" fill="#696872">
						            <g id="Imported-Layers" sketch:type="MSLayerGroup" transform="translate(4.000000, 3.000000)">
						                <path d="M-0.376,24.44 C-0.376,18.148 4.918,13.047 11.448,13.047 C17.979,13.047 23.273,18.148 23.273,24.44" id="Fill-1" sketch:type="MSShapeGroup"></path>
						                <path d="M18.377,7.244 C18.377,11.001 15.275,14.047 11.448,14.047 C7.622,14.047 4.52,11.001 4.52,7.244 C4.52,3.486 7.622,0.44 11.448,0.44 C15.275,0.44 18.377,3.486 18.377,7.244" id="Fill-2" sketch:type="MSShapeGroup"></path>
						            </g>
						        </g>
						    </g>
						</svg>
					  </c:otherwise>
                    </c:choose>
				</div>
		        <div class="c-obv-web__username">${goal.userName}</div>
		        <div class="c-obv-web__date">
		            <time>${goal.startDate}</time>
		        </div>
		    </header>
		    <div class="c-obv-web__content">
		        <div class="c-obv-web__pretitle">${goal.description}</div>
		        <div class="c-obv-web__title">${goal.title}</div>
		        <div class="c-obv-web__image">
		        <c:choose>
                  <c:when test="${goal.imageURL ne null}">
		            <img class="c-obv-web__image-img" src="data:image/jpeg;base64,${goal.imageURL}" />
		            <!-- <img class="c-obv-web__image-img" src="${imageURL}" /> -->
                  </c:when>
                  <c:otherwise>
		            <svg class="c-obv-web__image-img" version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve">
						<g>
						    <polyline fill="#FFFFFF" stroke="#D8DEDF" stroke-width="3" stroke-miterlimit="10" points="65.5,187.1 35.2,76.5 195.4,32.9 
						        212.1,86.3  "/>
						    <g>
						        <rect x="66" y="87.8" fill="#FFFFFF" width="181.1" height="177.5"/>
						        <g>
						            <path fill="none" stroke="#D8DEDF" stroke-width="3" stroke-miterlimit="10" d="M248.7,86.1H64.3v180.9h184.5V86.1L248.7,86.1z"
						                />
						        </g>
						    </g>
						</g>
						<g>
						    <g>
						        <g>
						            <path fill="#D8DEDF" d="M176.2,163.7h-8.3V178h8c5.4,0,9.1-2.8,9.1-7.2v-0.1C185,166.1,181.4,163.7,176.2,163.7z"/>
						            <path fill="#D8DEDF" d="M197.8,190.9v-29.2h20.8v2h-18.6v11.5h16.7v2h-16.7v11.7h12.8c5.8-6.7,9.2-13.7,9.2-20.6
						                c0-37.5-53.5-54.1-88.3-40.2c-16.4,6.6-28.8,18.8-35.9,33.6H98v13.5h18.7v-13.5h2.2v29.2h-2.2v-13.7H98v13.7h-2.2V166
						                c-6.2,15.6-6.7,33.6,0.1,50.4c11.3,28.1,86.4,5,115-25.6H197.8z M143.4,179.3v11.6h-2.2v-11.6l-12.5-17.6h2.7l10.9,15.7l11-15.7
						                h2.6L143.4,179.3z M187.2,170.7c0,6.1-5.3,9.3-11.4,9.3h-7.9v10.9h-2.2v-29.2h10.6C182.7,161.7,187.2,165,187.2,170.7
						                L187.2,170.7z"/>
						        </g>
						    </g>
						</g>
					</svg>
                  </c:otherwise>
                </c:choose>
		        </div>
		        <div class="c-obv-web__status">
		        <c:choose>
		          <c:when test="${goal.completed}">
                    <p class="c-obv-web-status__text">
                        Dal <span class="c-obv-web-status__date">${goal.startDate}</span>
                        ho messo da parte 
                        &#8364; <span class="c-obv-web-status__total">${goal.totalAmount_prefix}<span class="c-obv-web-status__total-cents">,${goal.totalAmount_suffix}</span></span>
                    </p>
                    <p class="c-obv-web-status__message">
                    <!-- per ora senza font visto che serve solo questo -->
                    <svg id="obv-check" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve"><polygon points="281 65.5 150 196.5 19 65.5 0 84.5 131 215.5 150 234.5 300 84.5 "/></svg>
                    Obiettivo completato</p>
                   </c:when>
                   <c:otherwise>
		            <p class="c-obv-web-status__text">
		                Dal <span class="c-obv-web-status__date">${goal.startDate}</span>
		                ho messo da parte 
		                <span class="c-obv-web-status__current">&#8364; ${goal.currentAmount}</span>
		                di &#8364; <span class="c-obv-web-status__total">${goal.totalAmount}</span>
		            </p>
		            <div class="c-obv-web__progress-bar">
		                <div class="c-obv-web-progress-bar__color" style="width: ${goal.percentage}%"></div>
		                <div class="c-obv-web-progress-bar__palla"></div>
		            </div>
		           </c:otherwise>
		          </c:choose>
		        </div>
		    </div>
		    <footer class="c-obv-web__footer">
		        <!-- Your like button code -->
		        <div class="fb-like" 
		            width="320px"  
		            data-href="${shareURL}"  
		            data-layout="standard" 
		            data-action="like" 
		            data-show-faces="true">
		    </div>
		    </footer>
		</article>
    </section>
    <br><!-- TODO: rimuovere -->
</body>
</html>
