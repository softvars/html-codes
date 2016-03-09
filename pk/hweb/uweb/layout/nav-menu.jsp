<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="dimmer-drawer" class="toggle-drawer"></div>
<div class="navbar navbar-default navbar-fixed-top">
    <div class="browser-not-supported-container">
		<div id="browser-not-supported" class="browser-not-supported">
		    <div>
		        <span>La tua versione del browser non &#232; recente, per cui alcune sezioni potrebbero non funzionare correttamente. Aggiorna subito il tuo browser.</span>
		    </div>
		    <span class="close"></span>
		</div>
	</div>
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle toggle-drawer">
                <span class="icon-bar"></span> <span class="icon-bar"></span> <span
                    class="icon-bar"></span>
            </button>
            <a class="navbar-brand logo" href="<c:url value="/auth/dashboard?secrandid=${secrandid}"/>"></a>
        </div>
        <div id="nav-bar-menu" class="navbar-collapse hidden-xs">
            <ul class="nav sections navbar-nav">
                <li><a class="dashboard" title="Dashboard"
                    href='<c:url value="/auth/dashboard?secrandid=${secrandid}"/>'>dashboard</a></li>
                <li><a class="purchase-log" title="Cronologia acquisti"
                    href='<c:url value="/auth/transaction?secrandid=${secrandid}"/>'>cronologia acquisti</a></li>
                <li><a class="cards" title="Carte" href='<c:url value="/auth/profile?secrandid=${secrandid}#Carte"/>'>carte</a>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a class="logged-user" title="Profilo" href='<c:url value="/auth/profile?secrandid=${secrandid}#Profilo"/>'>${userInfo.displayName}</a></li>
                <li><a class="logout" title="Logout" href="/AuthenticationDelegatedServlet?delegated_service=217">logout</a>
                </li>
            </ul>
        </div>
    </div>
</div>
