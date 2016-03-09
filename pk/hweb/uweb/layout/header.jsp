<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="drawer-menu">
    <ul>
        <li><a class="logged-user" title="Profilo" href='<c:url value="/auth/profile?secrandid=${secrandid}#Profilo"/>'>${userInfo.displayName}</a></li>
        <li class="wrap-divider">
            <div class="divider"></div>
        </li>
        <li><a class="dashboard" title="Dashboard" href='<c:url value="/auth/dashboard?secrandid=${secrandid}"/>'>dashboard</a>
        </li>
        <li><a class="purchase-log" title="Cronologia acquisti"
            href='<c:url value="/auth/transaction?secrandid=${secrandid}"/>'>cronologia acquisti</a></li>
        <li><a class="cards" title="Carte" href='<c:url value="/auth/profile?secrandid=${secrandid}#Carte"/>'>carte</a>
        </li>
        <li><a class="logout" title="Logout" href="/AuthenticationDelegatedServlet?delegated_service=217">logout</a>
        </li>
    </ul>
</div>